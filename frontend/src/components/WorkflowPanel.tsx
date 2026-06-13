import { useState } from "react";

interface Props {
  logs: string[];
}

export default function WorkflowPanel({ logs }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow">

      <button
        onClick={() => setOpen(!open)}
        className="font-semibold"
      >
        {open
          ? "▼ Hide Agent Workflow"
          : "▶ View Agent Workflow"}
      </button>

      {open && (
        <div className="mt-4 space-y-2">
          {logs.map((log, index) => (
            <div
              key={index}
              className="border-l-4 pl-3"
            >
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}