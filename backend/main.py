from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from graph.builder import build_graph
from schemas.request import DecisionRequest
from services.db_service import save_decision
from database.db import SessionLocal
from database.models import Decision
import json
from fastapi.responses import StreamingResponse


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

AGENT_NAMES = {
    "market": "Market Analyst",
    "risk": "Risk Analyst",
    "customer": "Customer Agent",
    "strategy": "Strategy Agent",
    "decision": "Decision Maker",
}


def sse_event(event_type: str, payload: dict):
    return (
        f"event: {event_type}\n"
        f"data: {json.dumps(payload)}\n\n"
    )

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
    # print("========== FULL RESULT ==========")
    # print(result)
    # print("=================================")
    print(
    f"Decision Generated | Confidence: {decision['Confidence Score']}%")
    print("STRATEGY OPTIONS:")
    print(result["strategy_options"])

    if "stream_log" not in result:
        result["stream_log"] = []



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
            # result["strategy_options"]["strategy_options"],
            result["strategy_options"].get("strategies", []),
            # result["strategy_options"].get("strategy_options", []),            
            

        "sources":
            result["market_data"]["research"]["results"],

        "agent_times": {
            "market_agent": result["market_data"]["execution_time"],
            "risk_agent": result["risk_data"]["execution_time"],
            "customer_agent": result["customer_data"]["execution_time"],
            # "strategy_agent": result["strategy_execution_time"],
            "strategy_agent": result.get("strategy_execution_time", 0),
            # "decision_agent": result["decision_execution_time"]
            "decision_agent": result.get("decision_execution_time", 0)
        },

        "workflow":
            result["stream_log"],
            

        "final_decision":
            result["final_decision"]
    }

    print(result)

    return clean_response


    # return result

@app.get("/run-decision-stream")
def run_decision_stream(query: str):

    def event_generator():

        final_state = {
            "query": query,
            "stream_log": [],
            "risk_loop_count": 0,
        }

        yield sse_event("workflow_started", {
            "message": "Workflow started",
            "query": query
        })

        # for update in graph.stream(final_state):

        #     for node_name, node_output in update.items():

        #         agent_name = AGENT_NAMES.get(node_name, node_name)

        #         # 1. START EVENT
        #         yield sse_event("agent_running", {
        #             "agent": node_name,
        #             "agent_name": agent_name,
        #             "message": f"{agent_name} is running..."
        #         })

        #         final_state.update(node_output)

        #         logs = node_output.get("stream_log", [])

        #         # 2. DONE EVENT
        #         yield sse_event("agent_done", {
        #             "agent": node_name,
        #             "agent_name": agent_name,
        #             "message": f"{agent_name} completed",
        #             "logs": logs,
        #             "output": node_output
        #         })


        for update in graph.stream(final_state):

            for node_name, node_output in update.items():

                agent_name = AGENT_NAMES.get(node_name, node_name)

                print("FINAL STRATEGIES")
                print(final_state.get("strategy_options"))

                yield sse_event(
                    "agent_running",
                    {
                        "agent": node_name,
                        "agent_name": agent_name,
                        "message": f"{agent_name} is running..."
                    }
                )

                if isinstance(node_output, dict):
                    final_state.update(node_output)
                    logs = node_output.get("stream_log", [])
                else:
                    logs = []

                yield sse_event(
                    "agent_done",
                    {
                        "agent": node_name,
                        "agent_name": agent_name,
                        "message": f"{agent_name} completed",
                        "logs": logs,
                        "output": node_output
                    }
                )

        decision = final_state["final_decision"]

        save_decision(
            query=query,
            verdict=decision["Final Verdict"],
            confidence=decision["Confidence Score"],
            reasoning=decision["Reasoning"],
        )

        print("========== FINAL STATE ==========")
        print(final_state.keys())

        print("========== STRATEGY OPTIONS ==========")
        print(final_state.get("strategy_options"))

        print("TYPE:")
        print(type(final_state.get("strategy_options")))
        print("=====================================")
        print("FINAL STRATEGIES SENT TO FRONTEND")
        print(
            final_state["strategy_options"].get(
                "strategy_options",
                []
            )
        )
        print("SENDING TO FRONTEND")
        print(final_state["strategy_options"])

        yield sse_event("workflow_done", {
            "message": "Final decision ready",
            "result": {
                "query": query,
                "market_summary": final_state["market_data"]["analysis"],
                "risk_score": final_state["risk_data"]["risk_score"],
                "customer_sentiment": final_state["customer_data"]["sentiment_score"],
                "average_rating": final_state["customer_data"]["average_rating"],
                # "strategies": final_state["strategy_options"].get("strategies", []),
                "strategies": final_state["strategy_options"].get("strategy_options", []),
                # "strategies":final_state["strategy_options"]["strategies"],
                # "strategies": final_state["strategy_options"]["strategy_options"],
                "agent_times": {
                    "market_agent": final_state["market_data"]["execution_time"],
                    "risk_agent": final_state["risk_data"]["execution_time"],
                    "customer_agent": final_state["customer_data"]["execution_time"],
                    "strategy_agent": final_state.get("strategy_execution_time", 0),
                    "decision_agent": final_state.get("decision_execution_time", 0)
                },
                "final_decision": decision
            }
        })

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        }
    )
    