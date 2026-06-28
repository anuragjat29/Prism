from dotenv import load_dotenv
from tavily import TavilyClient
from readability import Document
load_dotenv()
from langchain.tools import tool
# from agent import summarizer_chain
from bs4 import BeautifulSoup
import os, requests
from rich import print

@tool
def web_search(query : str)->list[dict]:

    """
    Search the internet for recent and up-to-date information.

    Always use this tool when the user asks about:
    - recent news
    - latest updates
    - current events
    - research
    - information after the model's knowledge cutoff
    - reliable sources

    Returns search results with titles, URLs and summaries.
    """
    print("-"*50)
    print("Welcome to Webserach")
    api_key = os.getenv("TAVILY_API_KEY")
    tavily = TavilyClient(api_key=api_key)
    result = tavily.search(query=query,max_results = 5)

    res = []
    for r in result['results'] :
        res.append({
        "Title" : r['title'],
        "URL" : r['url'], 
        "Content" :r['content']
        })
        print(r)
        print()
    print("Webserach result len : ",len(res),type(res))
    return res

@tool
def url_scraper(url : str) -> str:
    """search the website and returns the content """
    print("---------------Welcone to web scraper         --------")
    try:
        response = requests.get(url, headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/137.0 Safari/537.36"
            )
            },timeout=20
        )
        doc = Document(response.text)
        main_html = doc.summary()
        soup = BeautifulSoup(main_html, "html.parser")

        for tag in soup(["script","style","nav","footer"]):
            tag.decompose()

        txt = soup.get_text(separator=" ", strip=True)
        print("Length of scraper txt ", len(txt))
        return txt[:12000]
    except Exception as e:
        return f"Could not scrap {str(e)}"
    
# def summarizer(scraped_content : list[dict])->list[dict]:
#     summarized = []
#     for item in scraped_content:
#         try: 
#             summ = summarizer_chain.invoke({
#                 'content':item['content']
#             })

#             summarized.append({
#                     "url":item['url'],
#                     "content":summ.content
#             })
#         except:
#             summarized.append({
#                     "url":item['url'],
#                     "content":""
#             })
#     return summarized

