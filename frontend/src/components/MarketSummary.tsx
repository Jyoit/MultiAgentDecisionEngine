interface Props {
  summary: string;
}

export default function MarketSummary({
  summary,
}: Props) {

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Market Intelligence
      </h2>

      <pre className="whitespace-pre-wrap">
        {summary}
      </pre>

    </div>
  );
}