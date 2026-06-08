import os, sys, time
from typing import List, Dict, Any

COLORS = {
    "reset":   "\033[0m",
    "bold":    "\033[1m",
    "dim":     "\033[2m",
    "green":   "\033[38;5;71m",
    "amber":   "\033[38;5;178m",
    "red":     "\033[38;5;167m",
    "blue":    "\033[38;5;68m",
    "white":   "\033[38;5;252m",
    "muted":   "\033[38;5;240m",
    "label":   "\033[38;5;243m",
    "border":  "\033[38;5;236m",
}

AGENT_COLORS = {
    "Market Analyst":  "\033[38;5;68m",
    "Risk Analyst":    "\033[38;5;167m",
    "Customer Agent":  "\033[38;5;178m",
    "Strategy Agent":  "\033[38;5;140m",
    "Decision Maker":  "\033[38;5;71m",
}

def c(color: str, text: str) -> str:
    return f"{COLORS.get(color, '')}{text}{COLORS['reset']}"

def ac(agent: str, text: str) -> str:
    col = AGENT_COLORS.get(agent, COLORS["white"])
    return f"{col}{text}{COLORS['reset']}"

def print_agent(agent: str, message: str):
    tag = f"  {ac(agent, f'[{agent}]')}"
    print(f"{tag:<42}{c('white', message)}")

def print_divider(char="─", width=72):
    print(c("border", char * width))

def print_header(title: str):
    print()
    print_divider("═")
    print(f"  {c('bold', c('white', title))}")
    print_divider("═")

def print_section(title: str):
    print()
    print(f"  {c('label', title.upper())}")
    print_divider("─")

def print_kv(key: str, value: str, indent: int = 4):
    pad = " " * indent
    print(f"{pad}{c('muted', key + ':')}  {c('white', str(value))}")

def print_loop_badge():
    print(f"\n  {c('amber', '⟳  RISK LOOP TRIGGERED')} {c('muted', '— Market Analyst re-running with focused query…')}\n")


def tavily_search(query: str, num_results: int = 5) -> List[Dict]:
    api_key = os.getenv("TAVILY_API_KEY", "")
    if not api_key:
        return _mock_search_results(query)
    try:
        from tavily import TavilyClient
        client = TavilyClient(api_key=api_key)
        response = client.search(query=query, max_results=num_results)
        return response.get("results", [])
    except Exception as e:
        return _mock_search_results(query)


def _mock_search_results(query: str) -> List[Dict]:
    return [
        {
            "title": "Flipkart Big Sale Weekend — Up to 40% off on Electronics",
            "content": "Flipkart is running a major flash sale this weekend with discounts on electronics, apparel and home products. Competitors offering significant price cuts on smartphones and earbuds.",
            "url": "https://example.com/flipkart-sale"
        },
        {
            "title": "Myntra End of Season Sale — Discount trends India 2024",
            "content": "Retail discount trends show increased price sensitivity among Indian consumers. Flash sales generate 3x normal traffic. Competitors running 25-35% discounts on apparel.",
            "url": "https://example.com/myntra-sale"
        },
        {
            "title": "Amazon India Great Indian Festival — pricing signals",
            "content": "Amazon India launched weekend sale with deals across categories. Pricing signals indicate strong demand for electronics with 30% discount offers driving conversions.",
            "url": "https://example.com/amazon-sale"
        },
        {
            "title": "Indian ecommerce sale trends Q3 2024",
            "content": "Ecommerce growth in India shows consumers actively waiting for sale events. 78% of surveyed customers said they delay purchases for discount offers.",
            "url": "https://example.com/trends"
        },
        {
            "title": "Meesho Flash Sale — weekend discount strategy",
            "content": "Meesho running targeted flash sale on apparel category. Deal prices 20-30% below MRP. High conversion rates reported during weekend flash events.",
            "url": "https://example.com/meesho"
        },
    ]


def get_llm_client():
    api_key = os.getenv("GROQ_API_KEY", "")
    if not api_key:
        return None
    try:
        from groq import Groq
        return Groq(api_key=api_key)
    except Exception:
        return None