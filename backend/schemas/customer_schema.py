from pydantic import BaseModel
from typing import List


class CustomerData(BaseModel):

    sentiment_score: float

    pain_points: List[str]

    buying_behavior: List[str]