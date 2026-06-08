# test_tavily.py

from services.tavily_service import search_market

result = search_market(
    "Flash sale trends in ecommerce"
)

print(result)
