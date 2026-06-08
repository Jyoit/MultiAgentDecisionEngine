from langgraph.graph import StateGraph
from langgraph.graph import END

from state import AgentState

from agents.market_analyst import market_analyst
from agents.risk_analyst import risk_analyst
from agents.customer_agent import customer_agent
from agents.strategy_agent import strategy_agent
from agents.decision_maker import decision_maker


def build_graph():

    workflow = StateGraph(AgentState)

    workflow.add_node(
        "market",
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

    workflow.add_edge(
        "risk",
        "customer"
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

    return workflow.compile()