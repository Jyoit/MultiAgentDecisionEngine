import sys, os
sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "agents"))

from langgraph.graph import StateGraph, END
from state import AgentState
import agents.market_analyst as market_analyst
import agents.risk_analyst as risk_analyst
import agents.customer_agent as customer_agent
import agents.strategy_agent as strategy_agent
import agents.decision_maker as decision_maker
from tools import print_loop_badge, print_agent


def should_loop(state: AgentState) -> str:
    risk_score = state.get("risk_data", {}).get("overall_risk_score", 0)
    loop_count = state.get("risk_loop_count", 0)

    if risk_score > 75 and loop_count < 1:
        state["risk_loop_count"] = loop_count + 1
        print_loop_badge()
        state["log"].append(f"[Graph] Risk loop triggered — risk score {risk_score}/100 > 75, re-running Market Analyst")
        return "loop"
    return "continue"


def wrap_market(state: AgentState) -> AgentState:
    return market_analyst.run(state)

def wrap_risk(state: AgentState) -> AgentState:
    return risk_analyst.run(state)

def wrap_customer(state: AgentState) -> AgentState:
    return customer_agent.run(state)

def wrap_strategy(state: AgentState) -> AgentState:
    return strategy_agent.run(state)

def wrap_decision(state: AgentState) -> AgentState:
    return decision_maker.run(state)


def build_graph() -> StateGraph:
    g = StateGraph(AgentState)

    g.add_node("market_analyst", wrap_market)
    g.add_node("risk_analyst", wrap_risk)
    g.add_node("customer_agent", wrap_customer)
    g.add_node("strategy_agent", wrap_strategy)
    g.add_node("decision_maker", wrap_decision)

    g.set_entry_point("market_analyst")
    g.add_edge("market_analyst", "risk_analyst")

    g.add_conditional_edges(
        "risk_analyst",
        should_loop,
        {
            "loop": "market_analyst",
            "continue": "customer_agent",
        }
    )

    g.add_edge("customer_agent", "strategy_agent")
    g.add_edge("strategy_agent", "decision_maker")
    g.add_edge("decision_maker", END)

    return g.compile()