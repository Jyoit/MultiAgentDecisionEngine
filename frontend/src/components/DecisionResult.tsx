// // import { DecisionResponse } from "../types/decision";
// import type { DecisionResponse } from "../types/decision";

// interface Props {
//   data: DecisionResponse;
// }

// export default function DecisionResult({
//   data,
// }: Props) {

//   return (
//     <div className="mt-6">

//       <h2>
//         Final Verdict
//       </h2>

//       <h3>
//         {
//           data.final_decision[
//             "Final Verdict"
//           ]
//         }
//       </h3>

//       <p>
//         Confidence:
//         {
//           data.final_decision[
//             "Confidence Score"
//           ]
//         }
//         %
//       </p>

//       <p>
//         {
//           data.final_decision
//             .Reasoning
//         }
//       </p>

//     </div>
//   );
// }

import type { DecisionResponse }
from "../types/decision";

interface Props {
  data: DecisionResponse;
}

export default function DecisionResult({
  data,
}: Props) {

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow">
{/* <details className="mt-6 bg-gray-50 rounded-xl p-4">
  <summary className="cursor-pointer font-semibold text-lg">
    View Multi-Agent Workflow
  </summary>

  <div className="mt-4 space-y-2">
    {data.workflow?.map((step, index) => (
      <div
        key={index}
        className="bg-white p-3 rounded border"
      >
        {step}
      </div>
    ))}
  </div>
</details> */}
      {/* <h2 className="text-2xl font-bold mb-4">
        Final Verdict
      </h2> */}

      <h2 className="text-xl font-semibold">
        {
          data.final_decision[
            "Final Verdict"
          ]
        }
      </h2>

      

      {/* <p className="mt-4">
        {
          data.final_decision.Reasoning
        }
      </p> */}

      <div className="mt-6">
  <h3 className="font-bold text-lg">
    🎯 Executive Summary
  </h3>

  <p className="mt-2">
    {data.final_decision["Executive Summary"]}
  </p>
</div>

<div className="mt-6">

  <h3 className="font-bold text-lg">
    📊 Business Impact
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">

    <div className="bg-green-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">
        Revenue Impact
      </p>

      <p className="font-semibold">
        {
          data.final_decision[
            "Business Impact"
          ]?.["Revenue Impact"]
        }
      </p>
    </div>

    <div className="bg-yellow-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">
        Risk Level
      </p>

      <p className="font-semibold">
        {
          data.final_decision[
            "Business Impact"
          ]?.["Risk Level"]
        }
      </p>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-sm text-gray-500">
        Customer Impact
      </p>

      <p className="font-semibold">
        {
          data.final_decision[
            "Business Impact"
          ]?.["Customer Impact"]
        }
      </p>
    </div>

  </div>

</div>

<div className="mt-6">

  <h3 className="font-bold text-lg">
    🎯 Why This Decision
  </h3>

  <ul className="list-disc ml-6 mt-2">

    {
      data.final_decision[
        "Why This Decision"
      ]?.map((item, index) => (

        <li key={index}>
          {item}
        </li>

      ))
    }

  </ul>

</div>

<div className="mt-6">

  <h3 className="font-bold text-lg">
    ⚠️ Key Risks
  </h3>

  <ul className="list-disc ml-6 mt-2">

    {
      data.final_decision[
        "Key Risks"
      ]?.map((risk, index) => (

        <li key={index}>
          {risk}
        </li>

      ))
    }

  </ul>

</div>

<div className="mt-6">

  <h3 className="font-bold text-lg">
    🔄 Alternative Strategies
  </h3>

  {
    data.final_decision[
      "Alternative Strategies"
    ]?.map((strategy, index) => (

      <div
        key={index}
        className="border rounded-lg p-3 mt-2"
      >

        <p className="font-medium">
          {strategy.title}
        </p>

        <p className="text-sm text-gray-600">
          Confidence: {strategy.confidence}%
        </p>

      </div>

    ))
  }

</div>

{/* <div className="mt-6">
  <h3 className="font-bold text-lg">
    📈 Market Insights
  </h3>

  <ul className="list-disc ml-6">
    {data.final_decision["Market Insights"]?.map(
      (item, index) => (
        <li key={index}>{item}</li>
      )
    )}
  </ul>
</div> */}

{/* <div className="mt-6">
  <h3 className="font-bold text-lg">
    👥 Customer Insights
  </h3>

  <ul className="list-disc ml-6">
    {data.final_decision["Customer Insights"]?.map(
      (item, index) => (
        <li key={index}>{item}</li>
      )
    )}
  </ul>
</div> */}

{/* <div className="mt-6">
  <h3 className="font-bold text-lg">
    🏆 Competitor Insights
  </h3>

  <ul className="list-disc ml-6">
    {data.final_decision["Competitor Insights"]?.map(
      (item, index) => (
        <li key={index}>{item}</li>
      )
    )}
  </ul>
</div> */}

<div className="mt-6">
  <h3 className="font-bold text-lg">
    🚀 Recommended Actions
  </h3>

  <ol className="list-decimal ml-6">
    {data.final_decision["Recommended Actions"]?.map(
      (item, index) => (
        <li key={index}>{item}</li>
      )
    )}
  </ol>
</div>

<div className="mt-6">
  <h3 className="font-bold text-lg">
    📊 Expected Outcome
  </h3>

  <p>
    {data.final_decision["Expected Outcome"]}
  </p>
</div>

      <p className="mt-2">
        Confidence:
        {" "}
        {
          data.final_decision[
            "Confidence Score"
          ]
        }
        %
      </p>

    </div>
  );
}