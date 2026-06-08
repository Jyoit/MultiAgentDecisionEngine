interface Strategy {
  title: string;
  pros: string[];
  cons: string[];
  confidence_score: number;
}

interface Props {
  strategies: Strategy[];
}

export default function StrategyCards({
  strategies,
}: Props) {

  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Strategy Options
      </h2>

      <div className="grid gap-4">

        {strategies.map((strategy, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h3 className="font-bold text-lg">
              {strategy.title}
            </h3>

            <p>
              Confidence:
              {" "}
              {strategy.confidence_score}%
            </p>

            <div className="mt-3">

              <h4 className="font-semibold">
                Pros
              </h4>

              <ul className="list-disc ml-6">
                {strategy.pros.map((pro, i) => (
                  <li key={i}>{pro}</li>
                ))}
              </ul>

            </div>

            <div className="mt-3">

              <h4 className="font-semibold">
                Cons
              </h4>

              <ul className="list-disc ml-6">
                {strategy.cons.map((con, i) => (
                  <li key={i}>{con}</li>
                ))}
              </ul>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}