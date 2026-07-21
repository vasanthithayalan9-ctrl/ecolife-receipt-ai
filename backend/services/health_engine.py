"""Service for health impact analysis."""

from typing import Any, Dict


class HealthEngine:
    """Provide a simple health scoring mapping for products."""

    def __init__(self) -> None:
        self.name = "HealthEngine"
        self.map = {"low": 90, "medium": 60, "high": 30}

    def analyze_product(self, product: Dict[str, Any]) -> Dict[str, Any]:
        if isinstance(product, dict):
            risk = str(product.get("health_risk", "medium")).lower()
            name = product.get("name")
        else:
            risk = "medium"
            name = product

        score = int(self.map.get(risk, 60))
        return {"product": name, "health_risk": risk, "health_score": score}

    def calculate_health_score(self, product: Dict[str, Any]) -> Dict[str, Any]:
        return self.analyze_product(product)

