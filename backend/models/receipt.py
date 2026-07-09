from pydantic import BaseModel

from models.product import Product


class Receipt(BaseModel):
    """Represents a receipt analysis payload."""

    id: str | None = None
    source: str | None = None
    products: list[Product] = []
    eco_score: float | None = None
