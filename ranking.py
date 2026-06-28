from pydantic import BaseModel, Field
from router import llm 
from langchain_core.prompts import ChatPromptTemplate

# 1. Define the search result schema
class SearchResult(BaseModel):
    Title: str = Field(description="Title of the article")
    URL: str = Field(description="URL of the article")
    Content: str = Field(description="Snippet or content of the article")

class RankedResults(BaseModel):
    results: list[SearchResult] = Field(description="List of all ranked search results")

ranking_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert Research Source Ranking Agent. Rank all search results from most relevant to least relevant."),
    ("human", "Research Topic:\n{query}\n\nSearch Results:\n{results}")
])

# 2. Bind structured output
ranking_chain = ranking_prompt | llm.with_structured_output(RankedResults)

# 3. Simplify select_sources function
def select_sources(search_results: list[dict], query: str = "") -> list[dict]:
    try:
        ranked_output = ranking_chain.invoke({
            "query": query,
            "results": search_results
        })
        
        # Convert Pydantic objects back to a list of dicts for the scraper
        return [item.model_dump() for item in ranked_output.results]

    except Exception as e:
        print(f"❌ Ranking failed: {e}")
        return search_results