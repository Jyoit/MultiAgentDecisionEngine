from agents.market_analyst import market_analyst
from agents.risk_analyst import risk_analyst
from agents.customer_agent import customer_agent
from agents.strategy_agent import strategy_agent
from agents.decision_maker import decision_maker

state = {
    "query": "Should we run a flash sale this weekend?"
}

market = market_analyst(state)
print("\nMARKET")
print(market)

state.update(market)

risk = risk_analyst(state)
print("\nRISK")
print(risk)

state.update(risk)

customer = customer_agent(state)
print("\nCUSTOMER")
print(customer)

state.update(customer)

strategy = strategy_agent(state)
print("\nSTRATEGY")
print(strategy)

state.update(strategy)

decision = decision_maker(state)
print("\nDECISION")
print(decision)