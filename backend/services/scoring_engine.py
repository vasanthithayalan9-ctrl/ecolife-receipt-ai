"""Service for generating the final EcoLife score."""

from typing import Any, Iterable


class ScoringEngine:
    """Compute an ecolife score between 0 and 100.

    Inputs expected:
      - total_carbon: float (kg CO2e)
      - health_scores: iterable of numeric health scores (0-100)
      - pollution_scores: iterable of numeric pollution scores (0-100) where lower is better
      - plastic_scores: iterable of plastic scores (0-10) where lower is better
    """

    def __init__(self) -> None:
        self.name = "ScoringEngine"

    def calculate_score(self, carbon_result: dict[str, Any], health_result: dict[str, Any], pollution_result: dict[str, Any], recommendation_result: dict[str, Any]) -> float:
        carbon_value = float(carbon_result.get("carbon", 0.0) or 0.0)
        health_value = float(health_result.get("health_score", 0.0) or 0.0)
        pollution_value = float(pollution_result.get("pollution_score", 0.0) or 0.0)
        recommendation_value = 100.0 if recommendation_result.get("alternative_product") else 0.0
        score = (100.0 - min(100.0, carbon_value * 2.0)) * 0.4 + health_value * 0.3 + (100.0 - pollution_value) * 0.2 + recommendation_value * 0.1
        return round(max(0.0, min(100.0, score)), 2)

    def calculate_ecolife_score(self, total_carbon: float, health_scores: Iterable[float], pollution_scores: Iterable[float], plastic_scores: Iterable[float]) -> float:
        # Normalize components to 0-100
        try:
            total_carbon = float(total_carbon or 0.0)
        except Exception:
            total_carbon = 0.0

        def avg(iterable: Iterable[float]) -> float:
            lst = [float(x) for x in iterable or []]
            return (sum(lst) / len(lst)) if lst else 0.0

        health_avg = avg(health_scores)
        pollution_avg = avg(pollution_scores)
        plastic_avg = avg(plastic_scores)

        # Carbon component: lower is better. Map using a soft cap.
        carbon_component = max(0.0, 100.0 - min(80.0, total_carbon * 2.0))

        # Pollution component: lower pollution_avg is better; invert into 0-100
        pollution_component = max(0.0, 100.0 - pollution_avg)

        # Plastic component: plastic_avg in 0-10 -> map to 0-100 inverted
        plastic_component = max(0.0, 100.0 - (plastic_avg * 10.0))

        # Weighted sum
        score = (
            carbon_component * 0.45 +
            health_avg * 0.30 +
            pollution_component * 0.15 +
            plastic_component * 0.10
        )

        # Clamp
        score = max(0.0, min(100.0, score))
        return round(score, 2)

