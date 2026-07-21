"""Service for generating alternative product recommendations based on alternatives DB."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, List


class RecommendationEngine:
    DB_PATH = Path(__file__).resolve().parents[1] / "database" / "alternatives.json"

    def __init__(self) -> None:
        self.name = "RecommendationEngine"
        self._alternatives = []
        self._load()

    def _load(self) -> None:
        try:
            raw = json.loads(self.DB_PATH.read_text(encoding="utf-8"))
            self._alternatives = raw.get("alternatives", [])
        except Exception:
            self._alternatives = []

    def get_alternative(self, product_name: str) -> dict[str, Any] | None:
        name = (product_name or "").lower()
        for a in self._alternatives:
            if a.get("original", "").lower() == name:
                return a
        # try substring match
        for a in self._alternatives:
            if a.get("original", "").lower() in name:
                return a
        return None

    def calculate_carbon_saved(self, current_product: dict[str, Any], alternative_product: dict[str, Any], quantity: float = 1.0) -> float:
        try:
            cur_cf = float(current_product.get("carbon_factor", 0.0))
            alt_cf = float(alternative_product.get("carbon_factor", cur_cf))
            saved = max(0.0, (cur_cf - alt_cf) * float(quantity))
            return round(saved, 3)
        except Exception:
            return 0.0

    def suggest_alternative(self, product: dict[str, Any]) -> dict[str, Any]:
        if not isinstance(product, dict):
            return {"current_product": product, "alternative_product": None, "reason": "No recommendation available"}

        name = product.get("name")
        alt_map = self.get_alternative(name)
        if not alt_map:
            return {"current_product": name, "alternative_product": None, "reason": "No recommendation available"}

        return {
            "current_product": name,
            "alternative_product": alt_map.get("replacement"),
            "reason": alt_map.get("reason", "Lower impact option available"),
            "cost_note": alt_map.get("cost_note", "May vary by store"),
        }

    def generate_recommendations(self, items: List[dict[str, Any]]) -> List[dict[str, Any]]:
        from services.carbon_engine import CarbonEngine
        from services.health_engine import HealthEngine
        from services.pollution_engine import PollutionEngine

        carbon = CarbonEngine()
        health = HealthEngine()
        pollution = PollutionEngine()

        recs: List[dict[str, Any]] = []
        for it in items:
            name = it.get("name")
            qty = float(it.get("quantity", 1))
            alt_map = self.get_alternative(name)
            if not alt_map:
                continue

            # find alternative product in carbon DB
            alt_name = alt_map.get("replacement")
            alt_product = carbon.find_product(alt_name) or {"name": alt_name, "carbon_factor": 1.0, "health_risk": "medium", "pollution_risk": "medium", "plastic_score": 5}
            cur_product = carbon.find_product(name) or {"name": name, "carbon_factor": 1.0, "health_risk": "medium", "pollution_risk": "medium", "plastic_score": 5}

            carbon_saved = self.calculate_carbon_saved(cur_product, alt_product, qty)
            health_before = health.calculate_health_score(cur_product)
            health_after = health.calculate_health_score(alt_product)
            pollution_before = pollution.calculate_pollution_score(cur_product)
            pollution_after = pollution.calculate_pollution_score(alt_product)

            recs.append({
                "current_product": cur_product.get("name"),
                "alternative_product": alt_product.get("name"),
                "reason": alt_map.get("reason", "Lower impact"),
                "carbon_saved": carbon_saved,
                "health_benefit": max(0, int(health_after.get("health_score", 0) - health_before.get("health_score", 0))),
                "pollution_benefit": max(0, int(pollution_before.get("pollution_score", 0) - pollution_after.get("pollution_score", 0))),
                "cost_note": alt_map.get("cost_note", "May vary by store"),
            })

        return recs

