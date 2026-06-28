from agent import  writer_chain,critic_chain
from router import router_chain,llm
from ranking import select_sources
from tools import web_search
from summarizer import summarizer
from rich import print
from parallelscrapper import parallel_scraper


import sys
# Force UTF-8 encoding on Windows to prevent Unicode/emoji print crashes
if sys.platform.startswith("win"):
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

def research_agent(topic : str) ->list[dict]:
    state = {} 
    state["topic"] = topic;

    print()
    print("Topic : " ,topic )
    print()

    state["search_results"] = web_search.invoke({"query":topic})
    

    selected_sources = select_sources(state["search_results"], topic)
    
    scraped_content = parallel_scraper(selected_sources)
    print("Scapped Content")
    print(scraped_content)

    summarized = summarizer(scraped_content)
    # state["scraped_content"] = summarized
    result_combined = ""
    for item in summarized:
        result_combined += f"\n\nSource: {item['url']}\n{item['content']}"

    state["scraped_content"] = result_combined
    
  


    thresold = 9.5
    max_iterration = 3
    best_report = None
    best_critic = None
    best_score = -1
    for i in range(max_iterration):
        print("Iteration : ", i+1)

        report = writer_chain.invoke({
            "topic":topic,
            "research": result_combined
        })

        critic = critic_chain.invoke({"report":report})
        score = critic.score

        print("Score:", score)
        print("Strengths:", critic.strengths)
        print("Weaknesses:", critic.weaknesses)

        
        if score > best_score:
            best_score = score
            best_report = report
            best_critic = critic
        
        if thresold <= score:
            break;
    else:
        print("\n⚠️ Max iterations reached, using best available report")
    
    return best_report

        




def run(query:str):
    print("Weclome to Reach Agent" + "="*50)
    intent = router_chain.invoke({"query":query}).strip() #strip removes extra space
    if intent == "CHAT":
        return llm.invoke(query).content
    else:
        return research_agent(query)

if __name__ == "__main__":
    print(run(query="Impact of NVIDIA Blackwell and next gen GPUs on the future of agentic AI systems"))

