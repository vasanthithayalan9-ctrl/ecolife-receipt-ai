"""Utility helpers for the EcoLife Receipt AI backend."""

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_DIR = BASE_DIR / "database"
UPLOAD_DIR = BASE_DIR / "uploads"


def ensure_upload_dir() -> Path:
    """Create the uploads directory if it does not exist."""
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    return UPLOAD_DIR
