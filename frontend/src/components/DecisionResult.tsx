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

      <h2 className="text-2xl font-bold mb-4">
        Final Verdict
      </h2>

      <h3 className="text-xl font-semibold">
        {
          data.final_decision[
            "Final Verdict"
          ]
        }
      </h3>

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

      <p className="mt-4">
        {
          data.final_decision
            .Reasoning
        }
      </p>

    </div>
  );
}