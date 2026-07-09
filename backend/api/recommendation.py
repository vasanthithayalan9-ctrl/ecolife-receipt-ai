from fastapi import APIRouter

from services.recommendation_engine import RecommendationEngine

router = APIRouter()
recommendation_engine = RecommendationEngine()


@router.post("/alternatives")
async def get_alternatives(product: dict) -> dict:
    """Suggest a better alternative for a product."""
    return recommendation_engine.suggest_alternative(product)
