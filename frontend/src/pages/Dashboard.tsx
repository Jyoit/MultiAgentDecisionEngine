import { useState } from "react";
import api from "../api/warRoomApi";
import DecisionHistory from "../components/DecisionHistory";
import DecisionForm
from "../components/DecisionForm";
import type { DecisionResponse }
from "../types/decision";

import DecisionResult
from "../components/DecisionResult";

import LoadingSpinner
from "../components/LoadingSpinner";

import KPICards from "../components/KPICards";
import StrategyCards from "../components/StrategyCards";
import MarketSummary from "../components/MarketSummary";

export default function Dashboard() {

  const [loading, setLoading] =
    useState(false);

  // const [result, setResult] =
  //   useState<any>(null);
  const [result, setResult] =
  useState<DecisionResponse | null>(null);

  const runDecision =
    async (query: string) => {

      setLoading(true);

      try {

        const response =
          await api.post(
            "/run-decision",
            {
              query,
            }
          );

        setResult(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-4xl mb-6">
        AI War Room
      </h1>

      <DecisionForm
        onSubmit={runDecision}
      />

      {loading &&
        <LoadingSpinner />
      }

      {result &&
        <DecisionResult
          data={result}
        />
      }

      {result && (
  <>
    {/* <KPICards
      riskScore={result.risk_score}
      sentiment={result.customer_sentiment}
      rating={result.average_rating}
      strategyCount={result.strategies.length}
    />
     */}
    <KPICards
  riskScore={result.risk_score}
  sentiment={result.customer_sentiment}
  rating={result.average_rating}
  strategyCount={
    result.strategies?.strategies?.length || 0
  }
/>

    {/* <StrategyCards
      strategies={result.strategies}
    /> */}
    <StrategyCards
  strategies={
    result.strategies?.strategies || []
  }
/>
    


    <MarketSummary
      summary={result.market_summary}
    />

 <div className="mt-6 p-4 border rounded">
      <h3 className="text-xl font-bold mb-2">
        Agent Performance
      </h3>

      <p>Market Agent: {result.agent_times.market_agent}s</p>
      <p>Risk Agent: {result.agent_times.risk_agent}s</p>
      <p>Customer Agent: {result.agent_times.customer_agent}s</p>
      <p>Strategy Agent: {result.agent_times.strategy_agent}s</p>
      <p>Decision Agent: {result.agent_times.decision_agent}s</p>
    </div>


    

  </>
)}

      <DecisionHistory />

    </div>
  );
}