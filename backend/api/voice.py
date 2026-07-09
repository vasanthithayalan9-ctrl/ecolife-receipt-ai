from fastapi import APIRouter

router = APIRouter()


@router.post("/summary")
async def generate_voice_summary() -> dict[str, str]:
    """Placeholder endpoint for voice-friendly environmental summaries."""
    return {"message": "Voice summary endpoint ready", "status": "pending_implementation"}
