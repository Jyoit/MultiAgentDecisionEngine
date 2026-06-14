# from typing import TypedDict
# from typing import Optional
# from typing import List


# class AgentState(TypedDict):

#     # Input

#     query: str

#     scenario_id: str

#     # Agent outputs

#     market_data: Optional[dict]

#     risk_data: Optional[dict]

#     customer_data: Optional[dict]

#     strategy_options: Optional[list]

#     final_decision: Optional[dict]

#     # Control

#     risk_loop_count: int

#     stream_log: List[str]

#     error: Optional[str]



from typing import TypedDict
from typing import Optional
from typing import List


class AgentState(TypedDict):

    # Input
    query: str

    scenario_id: str

    # Agent outputs
    market_data: Optional[dict]

    risk_data: Optional[dict]

    customer_data: Optional[dict]

    strategy_options: Optional[dict]

    final_decision: Optional[dict]

    # execution times
    strategy_execution_time: float

    decision_execution_time: float

    # Control
    risk_loop_count: int

    retry_count: int

    stream_log: List[str]

    error: Optional[str]