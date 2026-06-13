# config.py

from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
    TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

settings = Settings()

