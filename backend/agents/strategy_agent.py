# from services.groq_service import llm
from services.llm_service import invoke_llm
from prompts.strategy_prompt import STRATEGY_PROMPT
from utils.json_parser import parse_llm_json
import time


def strategy_agent(state):
    start = time.time()

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

    strategies = strategy_json.get(
        "strategies",
        strategy_json.get("strategy_options", [])
    )

    print("STRATEGY JSON KEYS:")
    print(strategy_json.keys())

    elapsed = round(time.time() - start, 2)



    print("========== STRATEGIES ==========")
    print(strategy_json)
    print(type(strategy_json))
    print("===============================")
    
    return {
        # "strategy_options": response.content
        # "strategy_options": response
        # "strategy_options": strategy_json
        "strategy_options": strategy_json,
        "strategy_execution_time": elapsed,

    "stream_log": state.get("stream_log", []) + [
        "Strategy Agent started",
        # f"Generated {len(strategy_json.get('strategy_options', []))} strategies",
        # f"Generated {len(strategy_json.get('strategies', []))} strategies",
        f"Generated {len(strategies)} strategies",
        "Strategy Agent finished"
        
    ]
    }