import { useState } from "react";

interface Props {
  onSubmit: (query: string) => void;
}

export default function DecisionForm({
  onSubmit,
}: Props) {

  const [query, setQuery] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSubmit(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Ask a business question..."
        className="border p-3 w-full"
      />

      <button
        type="submit"
        className="border px-5 py-2"
      >
        Run Analysis
      </button>
    </form>
  );
}