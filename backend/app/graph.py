from langgraph.graph import StateGraph
from langgraph.constants import END
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from langchain_tavily import TavilySearch
import os
from dotenv import load_dotenv

load_dotenv()

# Load API keys
openai_api_key = os.getenv("OPENAI_API_KEY")
groq_api_key = os.getenv("GROQ_API_KEY")
tavily_api_key = os.getenv("TAVILY_API_KEY")

# LLMs
openai_llm = ChatOpenAI(
    api_key=openai_api_key,
    model="gpt-4o-mini"
)

groq_llm = ChatGroq(
    api_key=groq_api_key,
    model="llama-3.1-8b-instant"
)

# Tavily tool
tavily = TavilySearch(api_key=tavily_api_key)


# -----------------------------
# Node
# -----------------------------
def agent_node(state, config):
    user_input = state["input"]
    # make sure the LLM invocation matches the lib's API; adjust if needed
    resp = groq_llm.invoke(user_input)

    # guard in case the response object shape differs
    content = getattr(resp, "content", None) or getattr(resp, "text", None) or str(resp)

    return {
        "input": user_input,
        "response": content,
    }


# -----------------------------
# Build Graph
# -----------------------------
# Use a tuple (hashable) instead of a dict to avoid "unhashable type: 'dict'"
graph = StateGraph(
    state_schema=(
        ("input", str),
        ("response", str),
    )
)

graph.add_node("agent", agent_node)

graph.set_entry_point("agent")
graph.set_finish_point("agent")

graph_executor = graph.compile()
