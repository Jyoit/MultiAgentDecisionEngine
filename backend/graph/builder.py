from langgraph.graph import StateGraph
from langgraph.graph import END

from state import AgentState

from agents.market_analyst import market_analyst
from agents.risk_analyst import risk_analyst
from agents.customer_agent import customer_agent
from agents.strategy_agent import strategy_agent
from agents.decision_maker import decision_maker


# def route_after_risk(state):
#     risk_score = 0

#     if state.get("risk_data"):
#         risk_score = state["risk_data"].get("risk_score", 0)

#     retry_count = state.get("retry_count", 0)

#     if risk_score > 75 and retry_count < 1:
#         return "market_retry"

#     return "customer"


def route_after_risk(state):

    risk_score = 0

    # SAFE extraction from nested structure
    if state.get("risk_data"):
        risk_score = state["risk_data"].get("risk_score", 0)

    retry_count = state.get("retry_count", 0)

    print("RISK SCORE DEBUG:", risk_score)
    print("RETRY COUNT:", retry_count)

    if risk_score > 75 and retry_count < 1:
        return "market_retry"

    return "customer"

def build_graph():

    workflow = StateGraph(AgentState)

    workflow.add_node(
        "market",
        market_analyst
    )

    workflow.add_node(
    "market_retry",
    market_analyst
    )

    workflow.add_node(
        "risk",
        risk_analyst
    )

    workflow.add_node(
        "customer",
        customer_agent
    )

    workflow.add_node(
        "strategy",
        strategy_agent
    )

    workflow.add_node(
        "decision",
        decision_maker
    )

    workflow.set_entry_point("market")

    workflow.add_edge(
        "market",
        "risk"
    )

    # workflow.add_edge(
    #     "risk",
    #     "customer"
    # )

    workflow.add_conditional_edges(
    "risk",
    route_after_risk
    )

    workflow.add_edge(
        "customer",
        "strategy"
    )

    workflow.add_edge(
        "strategy",
        "decision"
    )

    workflow.add_edge(
        "decision",
        END
    )

    workflow.add_edge(
    "market_retry",
    "risk"
    )

    return workflow.compile()