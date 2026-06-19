interface Props {
  currentAgent?: string;
  completedAgents: string[];
}

const agents = [
  {
    id: "market",
    label: "Market Agent",
  },
  {
    id: "risk",
    label: "Risk Agent",
  },
  {
    id: "customer",
    label: "Customer Agent",
  },
  {
    id: "strategy",
    label: "Strategy Agent",
  },
  {
    id: "decision",
    label: "Decision Agent",
  },
];

export default function WorkflowGraph({
  currentAgent,
  completedAgents,
}: Props) {
  // return (
  //   <div className="bg-white p-6 rounded-xl shadow mt-6">

  //     <h2 className="text-xl font-bold mb-6">
  //       Workflow Execution
  //     </h2>

  //     <div className="flex items-center justify-between">

  //       {agents.map((agent, index) => {

  //         const isCompleted =
  //           completedAgents.includes(agent.id);

  //         const isRunning =
  //           currentAgent === agent.id;

  //         return (
  //           <div
  //             key={agent.id}
  //             className="flex items-center"
  //           >
  //             <div
  //               className={`
  //                 w-24 h-24 rounded-full
  //                 flex items-center justify-center
  //                 text-center text-sm font-semibold
  //                 border-4 transition-all
  //                 ${
  //                   isCompleted
  //                     ? "bg-green-100 border-green-500"
  //                     : isRunning
  //                     ? "bg-blue-100 border-blue-500 animate-pulse"
  //                     : "bg-gray-100 border-gray-300"
  //                 }
  //               `}
  //             >
  //               {agent.label}
  //             </div>

  //             {index < agents.length - 1 && (
  //               <div
  //                 className={`
  //                   w-20 h-1 mx-2
  //                   ${
  //                     isCompleted
  //                       ? "bg-green-500"
  //                       : "bg-gray-300"
  //                   }
  //                 `}
  //               />
  //             )}
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="text-lg font-bold mb-4">
        Workflow
      </h2>

      <div className="flex flex-col items-center">

        {agents.map((agent, index) => {

          const isCompleted =
            completedAgents.includes(agent.id);

          const isRunning =
            currentAgent === agent.id;

          return (
            <div
              key={agent.id}
              className="flex flex-col items-center"
            >

              <div
                className={`
                  w-24
                  h-24
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-center
                  text-xs
                  font-semibold
                  border-4
                  transition-all

                  ${
                    isCompleted
                      ? "bg-green-100 border-green-500 text-green-700"
                      : isRunning
                      ? "bg-blue-100 border-blue-500 text-blue-700 animate-pulse"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                  }
                `}
              >
                {agent.label}
              </div>

              {index < agents.length - 1 && (
                <div
                  className={`
                    w-1
                    h-10
                    my-2
                    ${
                      isCompleted
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }
                  `}
                />
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}