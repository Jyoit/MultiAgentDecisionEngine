# from services.groq_service import llm
from services.llm_service import invoke_llm
from prompts.strategy_prompt import STRATEGY_PROMPT
from utils.json_parser import parse_llm_json

def strategy_agent(state):

    prompt = f"""
    {STRATEGY_PROMPT}

    MARKET DATA:

    {state['market_data']}

    RISK DATA:

    {state['risk_data']}

    CUSTOMER DATA:

    {state['customer_data']}
    """

    # response = llm.invoke(prompt)
    response = invoke_llm(prompt)
    strategy_json = parse_llm_json(response)


    return {
        # "strategy_options": response.content
        # "strategy_options": response
        "strategy_options": strategy_json
    }