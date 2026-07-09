from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.scanner import router as scanner_router
from api.carbon import router as carbon_router
from api.recommendation import router as recommendation_router
from api.voice import router as voice_router
from api.report import router as report_router
from api.health import router as health_router

app = FastAPI(
    title="EcoLife Receipt AI Backend",
    version="0.1.0",
    description="Carbon intelligence engine for receipt-based environmental scoring.",
)

# Enable CORS for common frontend dev hosts (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scanner_router, prefix="/api/scanner", tags=["scanner"])
app.include_router(carbon_router, prefix="/api/carbon", tags=["carbon"])
app.include_router(recommendation_router, prefix="/api/recommendation", tags=["recommendation"])
app.include_router(voice_router, prefix="/api/voice", tags=["voice"])
app.include_router(report_router, prefix="/api/report", tags=["report"])
app.include_router(health_router, prefix="/api/health", tags=["health"])


@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok", "service": "ecolife-receipt-ai"}
