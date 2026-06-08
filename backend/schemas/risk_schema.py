from pydantic import BaseModel
from typing import List


class RiskData(BaseModel):

    risk_score: int

    risk_factors: List[str]

    mitigation_steps: List[str]