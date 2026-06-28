from langchain_mistralai import ChatMistralAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from tools import url_scraper, web_search
from dotenv import load_dotenv
load_dotenv()
from tools import tool
from langchain.agents import create_agent
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel , Field

# llm = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     temperature=0,
# )
llm = ChatMistralAI(model="mistral-small-latest",temperature=0)


summary_prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are a precise research assistant. Summarize content into key points only. Keep it short and factual."),
    ("human",
     """
Summarize the following content:

{content}

Return:
- key points
- facts only
- no fluff
""")
])

summarizer_chain = summary_prompt | llm    



#writer chain 

writer_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert research writer. Write clear, structured and insightful reports."),
    ("human", """Write a detailed research report on the topic below.

Topic: {topic}

Research Gathered:
{research}

Structure the report as:
- Introduction
- Key Findings (minimum 3 well-explained points)
- Conclusion
- Sources (list all URLs found in the research)

Be detailed, factual and professional."""),
])

writer_chain = writer_prompt | llm | StrOutputParser()



#critic_chain 
class CriticResponse(BaseModel):
    score: float = Field(description="The evaluation score from 0.0 to 10.0")
    strengths: list[str] = Field(description="Key strengths of the report")
    weaknesses: list[str] = Field(description="Weaknesses and areas for improvement")
    verdict: str = Field(description="Final summary verdict")

critic_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a strict research evaluator. Evaluate the provided report objectively and return structured feedback."),
    ("human", "Evaluate this report:\n\n{report}")
])

critic_chain = critic_prompt | llm.with_structured_output(CriticResponse)