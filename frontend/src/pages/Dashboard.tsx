import { useState } from "react";
// import api from "../api/warRoomApi";
import DecisionHistory from "../components/DecisionHistory";
import DecisionForm
from "../components/DecisionForm";
// import type { DecisionResponse }
// from "../types/decision";

import DecisionResult
from "../components/DecisionResult";

import LoadingSpinner
from "../components/LoadingSpinner";

import KPICards from "../components/KPICards";
import StrategyCards from "../components/StrategyCards";
import MarketSummary from "../components/MarketSummary";

import AgentTrace from "../components/AgentTrace";
import type {
  AgentEvent,
  DecisionResponse,
} from "../types/decision";

import WorkflowGraph
from "../components/WorkflowGraph";

export default function Dashboard() {

  const [loading, setLoading] =
    useState(false);

  // const [result, setResult] =
  //   useState<any>(null);
  const [result, setResult] =
  useState<DecisionResponse | null>(null);


  const [agentEvents, setAgentEvents] =
  useState<AgentEvent[]>([]);

  const completedAgents =
  agentEvents
    .filter(
      (e) => e.status === "done"
    )
    .map(
      (e) => e.agent
    );

const currentAgent =
  [...agentEvents]
    .reverse()
    .find(
      (e) => e.status === "running"
    )?.agent;

  // const runDecision =
  //   async (query: string) => {

  //     setLoading(true);

  //     try {

  //       const response =
  //         await api.post(
  //           "/run-decision",
  //           {
  //             query,
  //           }
  //         );

  //       setResult(
  //         response.data
  //       );

  //     } catch (error) {

  //       console.error(error);

  //     } finally {

  //       setLoading(false);

  //     }
  //   };



  const runDecision = async (
  query: string
) => {

  setLoading(true);

  setResult(null);

  setAgentEvents([]);

  const source =
    new EventSource(
      `http://127.0.0.1:8000/run-decision-stream?query=${encodeURIComponent(query)}`
    );

  source.addEventListener(
    "workflow_started",
    (event: MessageEvent) => {

      const data =
        JSON.parse(event.data);

      setAgentEvents([
        {
          agent: "workflow",
          agent_name: "Workflow",
          status: "running",
          message: data.message,
        },
      ]);
    }
  );

  source.addEventListener(
    "agent_running",
    (event: MessageEvent) => {

      const data =
        JSON.parse(event.data);

      setAgentEvents((prev) => [
        ...prev,
        {
          agent: data.agent,
          agent_name:
            data.agent_name,
          status: "running",
          message:
            data.message,
        },
      ]);
    }
  );

  source.addEventListener(
    "agent_done",
    (event: MessageEvent) => {

      const data =
        JSON.parse(event.data);

      setAgentEvents((prev) => [
        ...prev,
        {
          agent: data.agent,
          agent_name:
            data.agent_name,
          status: "done",
          message:
            data.message,
          logs: data.logs,
          output: data.output,
        },
      ]);
    }
  );

  source.addEventListener(
    "workflow_done",
    (event: MessageEvent) => {

      const data =
        JSON.parse(event.data);

// console.log(
//       "FINAL RESULT",
//       data.result
//     );

      setResult(
        data.result
      );

      setLoading(false);

      source.close();
    }
  );

  source.onerror = () => {

    setLoading(false);

    source.close();
  };
};

  // return (
  //   <div className="max-w-4xl mx-auto p-8">

  //     <h1 className="text-4xl mb-6">
  //       AI War Room
  //     </h1>

  //     <DecisionForm
  //       onSubmit={runDecision}
  //     />

  //     {/* <div className="mt-6">
  // <AgentTrace
  //   events={agentEvents}
  //   />
  // </div> */}
  // <WorkflowGraph
  //   currentAgent={currentAgent}
  //   completedAgents={completedAgents}
  // />

  // <div className="mt-6">
  //   <AgentTrace
  //     events={agentEvents}
  //   />
  // </div>

  //       {loading &&
  //         <LoadingSpinner />
  //       }

  //       {result &&
  //         <DecisionResult
  //           data={result}
  //         />
  //       }

  //       {result && (
  //   <>
  //     {/* <KPICards
  //       riskScore={result.risk_score}
  //       sentiment={result.customer_sentiment}
  //       rating={result.average_rating}
  //       strategyCount={result.strategies.length}
  //     />
  //     */}
  //     <KPICards
  //   riskScore={result.risk_score}
  //   sentiment={result.customer_sentiment}
  //   rating={result.average_rating}
  //   strategyCount={
  //     // result.strategies?.strategies?.length || 0
  //     result.strategies?.length || 0
  //     // result.strategy_options?.strategies?.length || 0
      
  //   }
  // />

  //     {/* <StrategyCards
  //       strategies={result.strategies}
  //     /> */}
  //     <StrategyCards
  //   strategies={
  //     // result.strategies?.strategies || []
  //     result.strategies || []
  //   }
  // />
      


  //     <MarketSummary
  //       summary={result.market_summary}
  //     />

  // <div className="mt-6 p-4 border rounded">
  //       <h3 className="text-xl font-bold mb-2">
  //         Agent Performance
  //       </h3>

  //       <p>Market Agent: {result.agent_times.market_agent}s</p>
  //       <p>Risk Agent: {result.agent_times.risk_agent}s</p>
  //       <p>Customer Agent: {result.agent_times.customer_agent}s</p>
  //       <p>Strategy Agent: {result.agent_times.strategy_agent}s</p>
  //       <p>Decision Agent: {result.agent_times.decision_agent}s</p>
  //     </div>


      

  //   </>
  // )}

  //       <DecisionHistory />

  //     </div>
  //   );



  return (
  <div className="min-h-screen bg-gray-100">

    {/* HEADER */}
    <div className="bg-white shadow px-8 py-4">
      <h1 className="text-3xl font-bold">
        AI War Room
      </h1>
    </div>

    {/* MAIN LAYOUT */}
    <div className="grid grid-cols-12 gap-6 p-6">

      {/* ===================================== */}
      {/* LEFT PANEL */}
      {/* ===================================== */}
      <div className="col-span-2 space-y-4">

        <WorkflowGraph
          currentAgent={currentAgent}
          completedAgents={completedAgents}
        />

        {result && (
          <KPICards
            riskScore={result.risk_score}
            sentiment={result.customer_sentiment}
            rating={result.average_rating}
            strategyCount={
              result.strategies?.length || 0
            }
          />
        )}

      </div>

      {/* ===================================== */}
      {/* CENTER PANEL */}
      {/* ===================================== */}
      <div className="col-span-7">

        <DecisionForm
          onSubmit={runDecision}
        />

        {loading && (
          <LoadingSpinner />
        )}

        {result && (
          <DecisionResult
            data={result}
          />
        )}

        {result && (
          <>
            <StrategyCards
              strategies={
                result.strategies || []
              }
            />

            <MarketSummary
              summary={
                result.market_summary
              }
            />

            <div className="mt-6 bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-3">
                Agent Performance
              </h3>

              <div className="space-y-2">

                <p>
                  Market Agent:
                  {" "}
                  {result.agent_times.market_agent}s
                </p>

                <p>
                  Risk Agent:
                  {" "}
                  {result.agent_times.risk_agent}s
                </p>

                <p>
                  Customer Agent:
                  {" "}
                  {result.agent_times.customer_agent}s
                </p>

                <p>
                  Strategy Agent:
                  {" "}
                  {result.agent_times.strategy_agent}s
                </p>

                <p>
                  Decision Agent:
                  {" "}
                  {result.agent_times.decision_agent}s
                </p>

              </div>
            </div>
          </>
        )}

      </div>

      {/* ===================================== */}
      {/* RIGHT PANEL */}
      {/* ===================================== */}
      <div className="col-span-3 space-y-4">

        <div className="bg-white rounded-xl shadow p-4">

          <h2 className="font-bold text-lg mb-4">
            Live Agent Workflow
          </h2>

          <AgentTrace
            events={agentEvents}
          />

        </div>

        <DecisionHistory />

      </div>

    </div>

  </div>
);
  }