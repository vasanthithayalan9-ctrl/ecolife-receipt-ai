from pydantic import BaseModel


class User(BaseModel):
    """Represents a user profile for future personalization."""

    id: str | None = None
    name: str | None = None
    preferences: list[str] | None = None
