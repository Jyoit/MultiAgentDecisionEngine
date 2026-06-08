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
    <KPICards
      riskScore={result.risk_score}
      sentiment={result.customer_sentiment}
      rating={result.average_rating}
      strategyCount={result.strategies.length}
    />

    <StrategyCards
      strategies={result.strategies}
    />

    <MarketSummary
      summary={result.market_summary}
    />
  </>
)}

      <DecisionHistory />

    </div>
  );
}