from pydantic import BaseModel


class DecisionRequest(BaseModel):
    query: str