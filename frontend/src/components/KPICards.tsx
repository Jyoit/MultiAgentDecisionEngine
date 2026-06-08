interface Props {
  riskScore: number;
  sentiment: number;
  rating: number;
  strategyCount: number;
}

export default function KPICards({
  riskScore,
  sentiment,
  rating,
  strategyCount,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Risk Score</p>
        <h2>{riskScore}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Sentiment</p>
        <h2>{sentiment}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Rating</p>
        <h2>{rating}</h2>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Strategies</p>
        <h2>{strategyCount}</h2>
      </div>

    </div>
  );
}