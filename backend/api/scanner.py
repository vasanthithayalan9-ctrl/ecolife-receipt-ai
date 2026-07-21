from fastapi import APIRouter, File, UploadFile

from services.ocr_engine import OcrEngine
from services.carbon_engine import CarbonEngine
from services.health_engine import HealthEngine
from services.pollution_engine import PollutionEngine
from services.recommendation_engine import RecommendationEngine
from services.scoring_engine import ScoringEngine
from utils.helpers import ensure_upload_dir

router = APIRouter()
ocr_engine = OcrEngine()
carbon_engine = CarbonEngine()
health_engine = HealthEngine()
pollution_engine = PollutionEngine()
recommendation_engine = RecommendationEngine()
scoring_engine = ScoringEngine()


@router.post("/upload")
async def upload_receipt(file: UploadFile = File(...)) -> dict:
    """Save uploaded receipt and run OCR-based extraction."""
    upload_dir = ensure_upload_dir()
    saved_path = upload_dir / (file.filename or "receipt.jpg")
    contents = await file.read()
    saved_path.write_bytes(contents)

    products = ocr_engine.extract_products(saved_path)
    ocr_confidence = (
        round(sum(item.get('confidence', 0.0) for item in products) / len(products), 2)
        if products else 0.0
    )

    return {
        "message": "Receipt uploaded and processed",
        "filename": file.filename or "receipt.jpg",
        "saved_path": str(saved_path),
        "products": products,
        "ocr_confidence": ocr_confidence,
        "status": "ocr_ready",
    }


@router.post("/extract")
async def extract_receipt_data() -> dict:
    """Run the full modular product pipeline for demo data."""
    products = ocr_engine.extract_products("demo receipt text")

    analyzed_products = []
    for product in products:
        carbon_result = carbon_engine.analyze_product(product)
        health_result = health_engine.analyze_product(product)
        pollution_result = pollution_engine.analyze_product(product)
        recommendation_result = recommendation_engine.suggest_alternative(product)
        score = scoring_engine.calculate_score(
            carbon_result=carbon_result,
            health_result=health_result,
            pollution_result=pollution_result,
            recommendation_result=recommendation_result,
        )

        analyzed_products.append(
            {
                "product": product,
                "carbon": carbon_result,
                "health": health_result,
                "pollution": pollution_result,
                "recommendation": recommendation_result,
                "score": score,
            }
        )

    return {
        "message": "Receipt extraction pipeline ready",
        "products": analyzed_products,
        "status": "pipeline_ready",
    }
