"""Core service for carbon footprint calculation using the JSON product DB."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, List, Optional, Dict


class CarbonEngine:
    """Load products and provide carbon estimation utilities."""

    DB_PATH = Path(__file__).resolve().parents[1] / "database" / "products.json"

    def __init__(self) -> None:
        self.name = "CarbonEngine"
        self._products: List[Dict[str, Any]] = []
        self._by_name: Dict[str, Dict[str, Any]] = {}
        self._by_id: Dict[Any, Dict[str, Any]] = {}
        self.load_products()

    def load_products(self) -> None:
        try:
            raw = json.loads(self.DB_PATH.read_text(encoding="utf-8"))
            self._products = raw.get("products", [])
            for p in self._products:
                name = str(p.get("name", "")).lower()
                self._by_name[name] = p
                self._by_id[p.get("id")] = p
        except Exception:
            self._products = []
            self._by_name = {}
            self._by_id = {}

    def find_product(self, product_name: str) -> Optional[Dict[str, Any]]:
        if not product_name:
            return None
        name = product_name.lower().strip()
        # exact match
        if name in self._by_name:
            return self._by_name[name]
        # substring match
        for k, v in self._by_name.items():
            if k in name or name in k:
                return v
        return None

    def calculate_item_carbon(self, product_name: str, quantity: float = 1.0) -> dict[str, Any]:
        qty = max(0.0, float(quantity or 0))
        product = self.find_product(product_name)
        if product:
            factor = float(product.get("carbon_factor", 1.0))
            carbon = round(qty * factor, 3)
            return {"product": product.get("name"), "carbon": carbon, "factor": factor, "confidence": "high"}

        # fallback estimate: simple heuristics
        lname = (product_name or "").lower()
        if any(w in lname for w in ("beef", "mutton", "lamb")):
            factor = 20.0
        elif any(w in lname for w in ("chicken", "pork", "meat", "fish")):
            factor = 6.0
        elif any(w in lname for w in ("milk", "cheese", "dairy")):
            factor = 2.0
        elif any(w in lname for w in ("rice", "grain", "bread", "noodle")):
            factor = 2.0
        elif any(w in lname for w in ("fruit", "apple", "banana", "vegetable", "juice")):
            factor = 0.7
        elif any(w in lname for w in ("plastic", "bottle", "bag", "pack")):
            factor = 0.5
        else:
            factor = 1.0

        carbon = round(qty * factor, 3)
        return {"product": product_name, "carbon": carbon, "factor": factor, "confidence": "low"}

    def analyze_product(self, product: Dict[str, Any]) -> Dict[str, Any]:
        name = product.get("name") if isinstance(product, dict) else product
        quantity = float(product.get("quantity", 1)) if isinstance(product, dict) else 1.0
        result = self.calculate_item_carbon(name, quantity)
        return {
            "product": result.get("product"),
            "carbon": result.get("carbon"),
            "factor": result.get("factor"),
            "confidence": result.get("confidence"),
        }

    def calculate_total_carbon(self, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        total = 0.0
        details: List[dict[str, Any]] = []
        for it in items:
            name = it.get("name")
            qty = float(it.get("quantity", 1))
            res = self.calculate_item_carbon(name, qty)
            details.append({"name": res.get("product"), "quantity": qty, "carbon": res.get("carbon"), "factor": res.get("factor"), "confidence": res.get("confidence")})
            total += float(res.get("carbon", 0.0))

        return {"total_carbon": round(total, 3), "details": details}

