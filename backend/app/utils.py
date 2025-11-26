import os
from tavily import TavilyClient

def tavily_search(query: str):
    client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    result = client.search(query=query)
    return result["results"][0]["content"]
