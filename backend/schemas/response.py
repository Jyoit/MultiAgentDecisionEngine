from pydantic import BaseModel
from typing import Dict, Any


class DecisionResponse(BaseModel):
    result: Dict[str, Any]