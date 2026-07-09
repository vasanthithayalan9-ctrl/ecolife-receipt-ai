from fastapi import APIRouter, HTTPException
from typing import Any

from services.carbon_engine import CarbonEngine
from services.health_engine import HealthEngine
from services.pollution_engine import PollutionEngine
from services.recommendation_engine import RecommendationEngine
from services.scoring_engine import ScoringEngine

router = APIRouter()


@router.post("/analyze-receipt")
async def analyze_receipt(payload: dict[str, Any]) -> dict[str, Any]:
    """Analyze a receipt (list of items) and return carbon, score and recommendations."""
    try:
        items = payload.get("items", [])
        if not isinstance(items, list) or len(items) == 0:
            raise HTTPException(status_code=400, detail="`items` must be a non-empty list")

        carbon = CarbonEngine()
        health = HealthEngine()
        pollution = PollutionEngine()
        recommend = RecommendationEngine()
        scoring = ScoringEngine()

        # compute per-item details
        product_entries = []
        health_scores = []
        pollution_scores = []
        plastic_scores = []

        for it in items:
            name = it.get("name")
            qty = float(it.get("quantity", 1))

            carbon_res = carbon.calculate_item_carbon(name, qty)
            prod = carbon.find_product(name) or {"name": name}
            health_res = health.calculate_health_score(prod)
            pollution_res = pollution.calculate_pollution_score(prod)

            product_entries.append({
                "name": prod.get("name", name),
                "quantity": qty,
                "carbon": carbon_res.get("carbon", 0.0),
                "carbon_factor": carbon_res.get("factor"),
                "confidence": carbon_res.get("confidence"),
                "health_score": health_res.get("health_score"),
                "health_risk": health_res.get("health_risk"),
                "pollution_score": pollution_res.get("pollution_score"),
                "plastic_score": pollution_res.get("plastic_score"),
            })

            health_scores.append(health_res.get("health_score", 0))
            pollution_scores.append(pollution_res.get("pollution_score", 0))
            plastic_scores.append(pollution_res.get("plastic_score", 0))

        total = carbon.calculate_total_carbon(items)

        recommendations = recommend.generate_recommendations(items)

        ecolife_score = scoring.calculate_ecolife_score(
            total.get("total_carbon", 0.0), health_scores, pollution_scores, plastic_scores
        )

        summary = {
            "total_items": len(items),
            "total_carbon": total.get("total_carbon", 0.0),
            "ecolife_score": ecolife_score,
        }

        return {
            "total_carbon": total.get("total_carbon", 0.0),
            "ecolife_score": ecolife_score,
            "products": product_entries,
            "recommendations": recommendations,
            "summary": summary,
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

