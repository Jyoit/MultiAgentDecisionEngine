from pydantic import BaseModel
from typing import List


class MarketData(BaseModel):

    trends: List[str]

    competitors: List[str]

    pricing_signals: List[str]