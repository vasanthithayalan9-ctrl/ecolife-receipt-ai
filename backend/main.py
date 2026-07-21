import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from api.scanner import router as scanner_router
from api.carbon import router as carbon_router
from api.recommendation import router as recommendation_router
from api.voice import router as voice_router
from api.report import router as report_router
from api.health import router as health_router

load_dotenv()

app = FastAPI(
    title="EcoLife Receipt AI Backend",
    version="0.1.0",
    description="Carbon intelligence engine for receipt-based environmental scoring.",
)

allowed_origins = []
for raw_origin in os.getenv("ALLOWED_ORIGINS", "").split(","):
    origin = raw_origin.strip()
    if origin:
        allowed_origins.append(origin)

client_url = os.getenv("CLIENT_URL", "").strip()
if client_url:
    allowed_origins.append(client_url)

allowed_origins = list(dict.fromkeys(allowed_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
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


@app.get("/api/health")
async def api_healthcheck() -> dict[str, bool]:
    return {"success": True}


@app.exception_handler(500)
async def internal_server_error_handler(_request: Request, _exc: Exception) -> JSONResponse:
    return JSONResponse(status_code=500, content={"success": False, "detail": "Internal server error"})
