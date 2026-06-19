// import type { AgentEvent } from "../types/decision";

// interface Props {
//   events: AgentEvent[];
// }

// export default function AgentTrace({ events }: Props) {
// const agents = [
//   "market",
//   "risk",
//   "customer",
//   "strategy",
//   "decision",
// ];

// const labels: Record<string, string> = {
//   market: "Market Analyst",
//   risk: "Risk Analyst",
//   customer: "Customer Agent",
//   strategy: "Strategy Agent",
//   decision: "Decision Maker",
// };

// const latestByAgent = agents.map((agent) => {
//   const event = [...events]
//     .reverse()
//     .find((item) => item.agent === agent);

//   return {
//     agent,
//     agent_name: labels[agent],
//     status: event?.status || "idle",
//     message: event?.message || "Waiting",
//     logs: event?.logs || [],
//   };
// });


//   return (
//     <div className="border rounded p-4">
//       <h2 className="font-bold text-lg mb-4">
//         Live Agent Workflow
//       </h2>

//       {/* {events.map((event, index) => ( */}
//       {latestByAgent.map((event) => (
//         <div
//         //   key={index}
//         key={event.agent}
//           className="mb-2 border-b pb-2"
//         >
//           <div>
//             <strong>
//               {event.agent_name}
//             </strong>
//           </div>

//           <div>
//             Status: {event.status}
//           </div>

//           <div>
//             {event.message}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }





// import type { AgentEvent } from "../types/decision";

// interface Props {
//   events: AgentEvent[];
// }

// export default function AgentTrace({ events }: Props) {
//   if (events.length === 0) {
//     return null;
//   }

//   return (
//     <div className="border rounded-xl p-5 bg-white shadow-sm">
//       <h2 className="font-bold text-xl mb-4">
//         Live Agent Workflow
//       </h2>

//       <div className="space-y-3">
//         {events.map((event, index) => (
//           <div
//             key={`${event.agent}-${index}`}
//             className={`border rounded-lg p-4 transition-all ${
//               event.status === "running"
//                 ? "border-blue-400 bg-blue-50"
//                 : event.status === "done"
//                 ? "border-green-400 bg-green-50"
//                 : "border-gray-200 bg-gray-50"
//             }`}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="font-semibold">
//                   {event.agent_name}
//                 </h3>

//                 <p className="text-sm text-gray-600">
//                   {event.message}
//                 </p>
//               </div>

//               <div>
//                 {event.status === "running" && (
//                   <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm">
//                     🔄 Running
//                   </span>
//                 )}

//                 {event.status === "done" && (
//                   <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm">
//                     ✅ Done
//                   </span>
//                 )}

//                 {event.status === "idle" && (
//                   <span className="px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm">
//                     ⏳ Waiting
//                   </span>
//                 )}
//               </div>
//             </div>

// {/* MARKET SUMMARY */}
// {event.agent === "market" &&
//  event.output?.market_data?.analysis && (
//   <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
//     <strong>Market Summary:</strong>

//     <div>
//       {/* {event.output.market_data.analysis.slice(0, 200)}... */}
//       {event.output.market_data.analysis
//   .replace(/[#*]/g, "")
// .split("\n")
// .filter(Boolean)
// .slice(0, 3)
// .join(" ")
//   .slice(0, 250)}
// ...
//     </div>
//   </div>
// )}

// {/* RISK SUMMARY */}
// {event.agent === "risk" &&
//  event.output?.risk_data && (
//   <div className="mt-2 p-2 bg-red-50 rounded text-sm">
//     <strong>Risk Score:</strong>

//     {event.output.risk_data.risk_score}
//   </div>
// )}

// {/* CUSTOMER SUMMARY */}
// {event.agent === "customer" &&
//  event.output?.customer_data && (
//   <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
//     <div>
//       Sentiment:
//       {" "}
//       {event.output.customer_data.sentiment_score}
//     </div>

//     <div>
//       Rating:
//       {" "}
//       {event.output.customer_data.average_rating}
//     </div>
//   </div>
// )}



// {/* STRATEGY SUMMARY */}
// {event.agent === "strategy" &&
//  event.output?.strategy_options?.strategies && (
//   <div className="mt-2 p-2 bg-green-50 rounded text-sm">
//     <strong>
//       Generated Strategies:
//     </strong>

//     {event.output.strategy_options.strategies
//       .slice(0, 3)
//       .map((s: any) => (
//         // <div key={s.title}>
//         //   • {s.title}
//         // </div>
//         <div key={s.title}>
//   • {s.title}
//   <span className="text-green-700 ml-2">
//     ({s.confidence_score}%)
//   </span>
// </div>
//       ))}
//   </div>
// )}



// {/* DECISION SUMMARY */}
// {event.agent === "decision" &&
//  event.output?.final_decision && (
//   <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
//     <strong>
//       Selected:
//     </strong>

//     {/* <div>
//       {
//         event.output.final_decision[
//           "Final Verdict"
//         ]
//       }
//     </div> */}

//     <div>
//   {
//     event.output.final_decision[
//       "Final Verdict"
//     ]
//   }
// </div>

// <div className="text-sm text-gray-600">
//   Confidence:
//   {
//     event.output.final_decision[
//       "Confidence Score"
//     ]
//   }%
// </div>
//   </div>
// )}


//             {/* {event.logs && event.logs.length > 0 && ( */}
//             {event.status === "running" &&
//  event.logs &&
//  event.logs.length > 0 && (
//               <div className="mt-3 border-l-4 border-gray-300 pl-3">
//                 {event.logs.map((log, idx) => (
//                   <p
//                     key={idx}
//                     className="text-sm text-gray-700"
//                   >
//                     • {log}
//                   </p>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



import type { AgentEvent } from "../types/decision";

interface Props {
  events: AgentEvent[];
}

export default function AgentTrace({ events }: Props) {
  if (events.length === 0) {
    return null;
  }

  // 🔥 STEP 1: define agent order (important for UI consistency)
  const agents = [
    "market",
    "risk",
    "customer",
    "strategy",
    "decision",
  ];

  const labels: Record<string, string> = {
    market: "Market Analyst",
    risk: "Risk Analyst",
    customer: "Customer Agent",
    strategy: "Strategy Agent",
    decision: "Decision Maker",
  };

  // 🔥 STEP 2: keep ONLY latest event per agent
  const latestByAgent = agents.map((agent) => {
    const event = [...events]
      .reverse()
      .find((item) => item.agent === agent);

    return {
      agent,
      agent_name: labels[agent],
      status: event?.status || "idle",
      message: event?.message || "Waiting",
      logs: event?.logs || [],
      output: event?.output || null,
    };
  });

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h2 className="font-bold text-xl mb-4">
        🟢 Live Agent Workflow
      </h2>

      <div className="space-y-3">

        {/* 🔥 STEP 3: render latest only */}
        {latestByAgent.map((event) => (
          <div
            key={event.agent}
            className={`border rounded-lg p-4 transition-all ${
              event.status === "running"
                ? "border-blue-400 bg-blue-50"
                : event.status === "done"
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">
                  {event.agent_name}
                </h3>

                <p className="text-sm text-gray-600">
                  {event.message}
                </p>
              </div>

              <div>
                {event.status === "running" && (
                  <span className="px-3 py-1 rounded bg-blue-100 text-blue-700 text-sm">
                    🔵 Running
                  </span>
                )}

                {event.status === "done" && (
                  <span className="px-3 py-1 rounded bg-green-100 text-green-700 text-sm">
                    🟢 Completed
                  </span>
                )}

                {event.status === "idle" && (
                  <span className="px-3 py-1 rounded bg-gray-100 text-gray-600 text-sm">
                    ⚪ Waiting
                  </span>
                )}
              </div>
            </div>

            {/* MARKET SUMMARY */}
            {event.agent === "market" &&
              event.output?.market_data?.analysis && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                  <strong>Market Summary:</strong>

                  <div>
                    {event.output.market_data.analysis
                      .replace(/[#*]/g, "")
                      .split("\n")
                      .filter(Boolean)
                      .slice(0, 3)
                      .join(" ")
                      .slice(0, 250)}
                    ...
                  </div>
                </div>
              )}

            {/* RISK SUMMARY */}
            {event.agent === "risk" &&
              event.output?.risk_data && (
                <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                  <strong>Risk Score:</strong>{" "}
                  {event.output.risk_data.risk_score}
                </div>
              )}

            {/* CUSTOMER SUMMARY */}
            {event.agent === "customer" &&
              event.output?.customer_data && (
                <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                  <div>
                    Sentiment:{" "}
                    {event.output.customer_data.sentiment_score}
                  </div>

                  <div>
                    Rating:{" "}
                    {event.output.customer_data.average_rating}
                  </div>
                </div>
              )}

            {/* STRATEGY SUMMARY */}
            {event.agent === "strategy" &&
              event.output?.strategy_options?.strategies && (
                <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                  <strong>Generated Strategies:</strong>

                  {event.output.strategy_options.strategies
                    .slice(0, 3)
                    .map((s: any) => (
                      <div key={s.title}>
                        • {s.title}
                        <span className="text-green-700 ml-2">
                          ({s.confidence_score}%)
                        </span>
                      </div>
                    ))}
                </div>
              )}

            {/* DECISION SUMMARY */}
            {event.agent === "decision" &&
              event.output?.final_decision && (
                <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                  <strong>Selected:</strong>

                  <div>
                    {
                      event.output.final_decision[
                        "Final Verdict"
                      ]
                    }
                  </div>

                  <div className="text-sm text-gray-600">
                    Confidence:{" "}
                    {
                      event.output.final_decision[
                        "Confidence Score"
                      ]
                    }%
                  </div>
                </div>
              )}

            {/* LOGS (ONLY WHEN RUNNING) */}
            {event.status === "running" &&
              event.logs &&
              event.logs.length > 0 && (
                <div className="mt-3 border-l-4 border-gray-300 pl-3">
                  {event.logs.map((log, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-700"
                    >
                      • {log}
                    </p>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}