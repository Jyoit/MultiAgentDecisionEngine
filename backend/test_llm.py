# test_llm.py

from services.llm_service import invoke_llm

response = invoke_llm(
    "What is Artificial Intelligence?"
)

print(response)
