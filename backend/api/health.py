from fastapi import APIRouter

from services.health_engine import HealthEngine

router = APIRouter()
health_engine = HealthEngine()


@router.post("/analyze")
async def analyze_health(product: dict) -> dict:
    """Analyze a product's health impact and risk."""
    return health_engine.analyze_product(product)
