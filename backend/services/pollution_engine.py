"""Service for pollution-related analysis."""

from typing import Any


class PollutionEngine:
    """Calculate a pollution score using product fields."""

    def __init__(self) -> None:
        self.name = "PollutionEngine"

    def analyze_product(self, product: dict[str, Any]) -> dict[str, Any]:
        if isinstance(product, dict):
            risk = str(product.get("pollution_risk", "medium")).lower()
            plastic = float(product.get("plastic_score", 5))
            name = product.get("name")
        else:
            risk = "medium"
            plastic = 5.0
            name = product

        risk_map = {"low": 10.0, "medium": 50.0, "high": 85.0}
        base = float(risk_map.get(risk, 50.0))
        plastic_component = min(100.0, (plastic / 10.0) * 50.0)
        pollution_score = round(min(100.0, base + plastic_component), 2)

        return {"product": name, "pollution_risk": risk, "plastic_score": plastic, "pollution_score": pollution_score}

    def calculate_pollution_score(self, product: dict[str, Any]) -> dict[str, Any]:
        return self.analyze_product(product)

