import { useEffect, useState } from "react";
import { getDecisionHistory } from "../api/warRoomApi";
import type { Decision } from "../types/decision";

export default function DecisionHistory() {

  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const data = await getDecisionHistory();

        setDecisions(data);

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
      <div className="text-center py-4">
        Loading history...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">

      <h2 className="text-xl font-bold mb-4">
        Decision History
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Query
              </th>

              <th className="text-left p-3">
                Verdict
              </th>

              <th className="text-left p-3">
                Confidence
              </th>

            </tr>

          </thead>

          <tbody>

            {decisions.map((decision) => (

              <tr
                key={decision.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">
                  {decision.query}
                </td>

                <td className="p-3">
                  {decision.verdict}
                </td>

                <td className="p-3">

                  <span
                    className="
                    bg-green-100
                    text-green-700
                    px-2
                    py-1
                    rounded"
                  >
                    {decision.confidence}%
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}