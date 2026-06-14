// export interface DecisionRequest {
//   query: string;
// }

// export interface DecisionResponse {
//   query: string;
//   final_decision: {
//     "Final Verdict": string;
//     "Confidence Score": number;
//     Reasoning: string;
//     "Key Risks": string[];
//     "Recommended Actions": string[];
//   };
// }

// export interface Decision {
//   id: number;
//   query: string;
//   verdict: string;
//   confidence: number;
//   reasoning: string;
// }

export interface DecisionRequest {
  query: string;
}

export interface Strategy {
  title: string;
  pros: string[];
  cons: string[];
  confidence_score: number;
}

export interface FinalDecision {
  "Final Verdict": string;
  "Confidence Score": number;
  Reasoning: string;
  "Key Risks": string[];
  "Recommended Actions": string[];
}

export interface DecisionResponse {
  query: string;

  market_summary: string;

  risk_score: number;

  customer_sentiment: number;

  average_rating: number;

  strategies: Strategy[];
//   strategies: {
//   strategies: Strategy[];
// };

agent_times: {
    market_agent: number;
    risk_agent: number;
    customer_agent: number;
    strategy_agent: number;
    decision_agent: number;
  };

  workflow: string[];

  // final_decision: FinalDecision;
  final_decision: {
    "Final Verdict": string;
    "Confidence Score": number;
    Reasoning: string;
    "Key Risks": string[];
    "Recommended Actions": string[];
  };
}

export interface Decision {
  id: number;
  query: string;
  verdict: string;
  confidence: number;
  reasoning: string;
}


export type AgentStatus =
  | "idle"
  | "running"
  | "done"
  | "error";

export interface AgentEvent {
  // agent: string;
  // agent_name: string;
  // status: AgentStatus;
  // message: string;
  // logs?: string[];

  agent: string;
  agent_name: string;
  status: string;
  message: string;
  logs?: string[];
  output?: any;
}