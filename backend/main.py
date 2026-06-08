from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph.builder import build_graph
from schemas.request import DecisionRequest
from services.db_service import save_decision
from database.db import SessionLocal
from database.models import Decision


app = FastAPI(
    title="AI War Room"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


graph = build_graph()

@app.get("/decisions")
def get_decisions():

    db = SessionLocal()

    try:

        decisions = db.query(
            Decision
        ).all()

        return decisions

    finally:
        db.close()



@app.get("/decision/{decision_id}")
def get_decision(decision_id: int):

    db = SessionLocal()

    try:

        decision = (
            db.query(Decision)
            .filter(
                Decision.id == decision_id
            )
            .first()
        )

        return decision

    finally:
        db.close()


@app.get("/")
def root():

    return {
        "message": "AI War Room Running"
    }


# @app.post("/run-decision")
# def run_decision(
#     request: DecisionRequest
# ):

#     result = graph.invoke(
#         {
#             "query": request.query
#         }
#     )
#     decision = result["final_decision"]

#     save_decision(
#     query=request.query,
#     verdict=decision["Final Verdict"],
#     confidence=decision["Confidence Score"],
#     reasoning=decision["Reasoning"]
# )
@app.post("/run-decision")
def run_decision(request: DecisionRequest):

    result = graph.invoke(
        {
            "query": request.query
        }
    )

    decision = result["final_decision"]

    save_decision(
        query=request.query,
        verdict=decision["Final Verdict"],
        confidence=decision["Confidence Score"],
        reasoning=decision["Reasoning"]
    )

    # print(result["strategy_options"])
    # print(type(result["strategy_options"]))
    # print(result["strategy_options"].keys())
    # print(type(result["strategy_options"]))
    # print(result["strategy_options"])

    clean_response = {
        "query": request.query,

        "market_summary":
            result["market_data"]["analysis"],

        "risk_score":
            result["risk_data"]["risk_score"],

        "customer_sentiment":
            result["customer_data"]["sentiment_score"],

        "average_rating":
            result["customer_data"]["average_rating"],

        "strategies":
            # result["strategy_options"]["strategies"],
            # result["strategy_options"],
            result["strategy_options"]["strategy_options"],
            

        "final_decision":
            result["final_decision"]
    }

    return clean_response


    # return result
    