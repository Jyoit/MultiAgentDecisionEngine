def format_decision(decision):

    verdict = decision.get("Final Verdict", "Not Available")
    confidence = decision.get("Confidence Score", "N/A")
    reasoning = decision.get("Reasoning", "Not Available")

    risks = decision.get("Key Risks", [])
    actions = decision.get("Recommended Actions", [])

    risk_text = "\n".join(
        [f"• {risk}" for risk in risks]
    ) if risks else "• No major risks identified"

    action_text = "\n".join(
        [f"• {action}" for action in actions]
    ) if actions else "• No actions provided"

    return f"""
EXECUTIVE RECOMMENDATION

Recommended Strategy
{verdict}

Confidence Level
{confidence}%

Business Justification
{reasoning}

Key Risks
{risk_text}

Recommended Actions
{action_text}
"""