# from services.groq_service import llm
from services.llm_service import invoke_llm

from prompts.decision_prompt import DECISION_PROMPT
from utils.json_parser import parse_llm_json
import time


def decision_maker(state):

    start = time.time()

    prompt = f"""
    {DECISION_PROMPT}

    STRATEGY OPTIONS:

    {state['strategy_options']}
    """

    # response = llm.invoke(prompt)
    response = invoke_llm(prompt)

    decision_json = parse_llm_json(response)

    elapsed = round(time.time() - start, 2)


    print("========== DECISION ==========")
    print(decision_json)
    print(type(decision_json))
    print("===============================")

    return {
        # "final_decision": response.content
        # "final_decision": response
        # "final_decision": decision_json
        "final_decision": decision_json,
        "decision_execution_time": elapsed,

    "stream_log": state.get("stream_log", []) + [
        "Decision Agent started",
        "Final recommendation generated",
        "Decision Agent finished"
    ]

    }