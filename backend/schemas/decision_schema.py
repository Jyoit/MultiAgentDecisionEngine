from pydantic import BaseModel


class DecisionData(BaseModel):

    verdict: str

    confidence: int

    reasoning: str