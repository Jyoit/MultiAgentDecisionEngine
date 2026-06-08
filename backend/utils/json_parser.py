# utils/json_parser.py

import json
from json_repair import repair_json


def parse_llm_json(text):

    cleaned = text.replace("```json", "")
    cleaned = cleaned.replace("```", "")

    cleaned = repair_json(cleaned)

    return json.loads(cleaned)