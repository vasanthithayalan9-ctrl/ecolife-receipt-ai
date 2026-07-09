"""OCR-style text extraction service for receipt intake."""

from pathlib import Path
from typing import Any


class OcrEngine:
    """Placeholder OCR engine that returns structured mock product data."""

    def __init__(self) -> None:
        self.name = "OcrEngine"

    def extract_text(self, file_path: str | Path) -> str:
        """Return a placeholder text blob for a receipt image."""
        return f"mock OCR text for {Path(file_path).name}"

    def extract_products(self, raw_text: str) -> list[dict[str, Any]]:
        """Return a deterministic list of products from OCR text."""
        return [
            {"name": "Soda", "quantity": 1, "price": 2.5},
            {"name": "Organic Apples", "quantity": 2, "price": 4.0},
            {"name": "Plastic Bottle", "quantity": 1, "price": 1.2},
        ]
