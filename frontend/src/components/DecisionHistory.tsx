// import { useEffect, useState } from "react";
// import { getDecisionHistory } from "../api/warRoomApi";
// import type { Decision } from "../types/decision";

// export default function DecisionHistory() {

//   const [decisions, setDecisions] = useState<Decision[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const loadHistory = async () => {

//       try {

//         const data = await getDecisionHistory();

//         setDecisions(data);

//       } catch (error) {

//         console.error(error);

//       } finally {

//         setLoading(false);
//       }
//     };

//     loadHistory();

//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-4">
//         Loading history...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow p-6 mt-8">

//       <h2 className="text-xl font-bold mb-4">
//         Decision History
//       </h2>

//       <div className="overflow-x-auto">

//         <table className="w-full border-collapse">

//           <thead>

//             <tr className="border-b">

//               <th className="text-left p-3">
//                 Query
//               </th>

//               <th className="text-left p-3">
//                 Verdict
//               </th>

//               <th className="text-left p-3">
//                 Confidence
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {decisions.map((decision) => (

//               <tr
//                 key={decision.id}
//                 className="border-b hover:bg-gray-50"
//               >

//                 <td className="p-3">
//                   {decision.query}
//                 </td>

//                 <td className="p-3">
//                   {decision.verdict}
//                 </td>

//                 <td className="p-3">

//                   <span
//                     className="
//                     bg-green-100
//                     text-green-700
//                     px-2
//                     py-1
//                     rounded"
//                   >
//                     {decision.confidence}%
//                   </span>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { getDecisionHistory } from "../api/warRoomApi";
import type { Decision } from "../types/decision";

export default function DecisionHistory() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getDecisionHistory();

        const sorted = [...data].sort(
          (a, b) => b.id - a.id
        );

        setDecisions(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        Loading history...
      </div>
    );
  }

  const displayedDecisions = showAll
    ? decisions
    : decisions.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-bold text-lg mb-4">
        Recent Decisions
      </h2>

      <div className="space-y-3">
        {displayedDecisions.map((decision) => (
          <div
            key={decision.id}
            className="border rounded-lg p-3 hover:bg-gray-50"
          >
            <p className="font-medium text-sm">
              {decision.query}
            </p>

            <p className="text-xs text-gray-600 mt-1">
              {decision.verdict}
            </p>

            <span className="inline-block mt-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
              {decision.confidence}%
            </span>
          </div>
        ))}
      </div>

      {decisions.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-blue-600 text-sm"
        >
          {showAll
            ? "Show Less"
            : `View All (${decisions.length})`}
        </button>
      )}
    </div>
  );
}