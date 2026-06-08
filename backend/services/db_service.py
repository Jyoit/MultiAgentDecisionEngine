from database.db import SessionLocal
from database.models import Decision


def save_decision(
    query,
    verdict,
    confidence,
    reasoning
):
    db = SessionLocal()

    try:

        decision = Decision(
            query=query,
            verdict=verdict,
            confidence=confidence,
            reasoning=reasoning
        )

        db.add(decision)
        db.commit()
        db.refresh(decision)

        return decision

    finally:
        db.close()