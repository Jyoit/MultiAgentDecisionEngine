from graph.builder import build_graph

graph = build_graph()

result = graph.invoke(
    {
        "query":
        "Should we run a flash sale this weekend?"
    }
)

print(result)