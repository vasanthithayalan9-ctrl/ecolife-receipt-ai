"""Service for pollution-related analysis."""

from typing import Any


class PollutionEngine:
    """Calculate a pollution score using product fields."""

    def __init__(self) -> None:
        self.name = "PollutionEngine"

    def calculate_pollution_score(self, product: dict[str, Any]) -> dict[str, Any]:
        # Expect `pollution_risk` (low/medium/high) and `plastic_score` (0-10)
        risk = str(product.get("pollution_risk", "medium")).lower()
        plastic = float(product.get("plastic_score", 5))

        risk_map = {"low": 10.0, "medium": 50.0, "high": 85.0}
        base = float(risk_map.get(risk, 50.0))

        # Combine plastic contribution (scaled 0-100)
        plastic_component = min(100.0, (plastic / 10.0) * 50.0)

        pollution_score = round(min(100.0, base + plastic_component), 2)

        return {"product": product.get("name"), "pollution_risk": risk, "plastic_score": plastic, "pollution_score": pollution_score}

