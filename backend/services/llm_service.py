# from mistralai import Mistral

# from config import settings

# client = Mistral(
#     api_key=settings.MISTRAL_API_KEY
# )


# def invoke_llm(prompt: str):

#     response = client.chat.complete(
#         model="mistral-small-latest",
#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
#     )

#     return response.choices[0].message.content





from langchain_mistralai import ChatMistralAI

from config import settings


llm = ChatMistralAI(
    model="mistral-small-latest",
    api_key=settings.MISTRAL_API_KEY,
    temperature=0
)


def invoke_llm(prompt: str):
    response = llm.invoke(prompt)
    return response.content