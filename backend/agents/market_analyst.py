from services.tavily_service import search_market
# from services.groq_service import llm
from services.llm_service import invoke_llm
from prompts.market_prompt import MARKET_PROMPT
import time

def market_analyst(state):

    start = time.time()

    query = state["query"]

    # search_results = search_market(query)

    try:

        search_results = search_market(query)

    except Exception as e:

        print("MARKET SEARCH FAILED:", e)

        search_results = {
            "results": []
        }

    prompt = f"""
    {MARKET_PROMPT}

    Business Question:

    {query}

    Market Research:

    {search_results}
    """

    # response = llm.invoke(prompt)
    response = invoke_llm(prompt)

    elapsed = round(time.time() - start, 2)

    return {
        # "market_data": {
        #     "research": search_results,
        #     # "analysis": response.content
        #     "analysis": response
        # }
        "market_data": {
        "research": search_results,
        "analysis": response,
        "execution_time": elapsed
    },

    "stream_log": state.get("stream_log", []) + [
        "Market Analyst started",
        "Market research completed",
        "Market Analyst finished"
    ]
    }