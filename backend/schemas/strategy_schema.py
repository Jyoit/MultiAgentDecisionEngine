from pydantic import BaseModel
from typing import List


class StrategyOption(BaseModel):

    title: str

    pros: List[str]

    cons: List[str]

    confidence: int