from pydantic import BaseModel


class Product(BaseModel):
    """Represents a product extracted from a receipt."""

    id: str | None = None
    name: str
    category: str | None = None
    carbon_impact: float | None = None
    health_score: float | None = None
    pollution_score: float | None = None
