from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from agent import llm

router_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an intent classifier.

Classify the user request into exactly one category:

CHAT
RESEARCH

Choose RESEARCH if the user asks for:
- recent information
- latest news
- deep research
- reports
- multiple sources
- comparisons
- analysis

Otherwise choose CHAT.

Return only one word.
"""
    ),
    ("human", "{query}")
])

router_chain = router_prompt | llm | StrOutputParser()