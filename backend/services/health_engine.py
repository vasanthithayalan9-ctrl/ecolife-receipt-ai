"""Service for health impact analysis."""

from typing import Any, Dict


class HealthEngine:
    """Provide a simple health scoring mapping for products."""

    def __init__(self) -> None:
        self.name = "HealthEngine"
        self.map = {"low": 90, "medium": 60, "high": 30}

    def calculate_health_score(self, product: Dict[str, Any]) -> Dict[str, Any]:
        # product expected to have `health_risk` field or name
        risk = str(product.get("health_risk", "medium")).lower()
        score = int(self.map.get(risk, 60))
        return {"product": product.get("name"), "health_risk": risk, "health_score": score}

