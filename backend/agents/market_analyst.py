from services.tavily_service import search_market
# from services.groq_service import llm
from services.llm_service import invoke_llm
from prompts.market_prompt import MARKET_PROMPT


def market_analyst(state):

    query = state["query"]

    search_results = search_market(query)

    prompt = f"""
    {MARKET_PROMPT}

    Business Question:

    {query}

    Market Research:

    {search_results}
    """

    # response = llm.invoke(prompt)
    response = invoke_llm(prompt)

    return {
        "market_data": {
            "research": search_results,
            # "analysis": response.content
            "analysis": response
        }
    }