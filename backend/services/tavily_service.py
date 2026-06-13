# from tavily import TavilyClient

# from config import settings


# client = TavilyClient(
#     api_key=settings.TAVILY_API_KEY
# )


# def search_market(query: str):

#     results = client.search(
#         query=query,
#         max_results=5
#     )

#     return results




from tavily import TavilyClient
from config import settings

# print("TAVILY KEY =", settings.TAVILY_API_KEY)

client = TavilyClient(
    api_key=settings.TAVILY_API_KEY
)

def search_market(query: str):

    try:

        results = client.search(
            query=query,
            max_results=5
        )

        return results

    except Exception as e:

        print("TAVILY ERROR:", e)

        return {
            "results": [],
            "error": str(e)
        }