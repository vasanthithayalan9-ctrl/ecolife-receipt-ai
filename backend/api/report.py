from fastapi import APIRouter

router = APIRouter()


@router.get("/summary")
async def get_report_summary() -> dict[str, str]:
    """Placeholder endpoint for report generation."""
    return {"message": "Report endpoint ready", "status": "pending_implementation"}
