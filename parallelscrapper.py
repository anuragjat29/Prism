from concurrent.futures import ThreadPoolExecutor, as_completed
from tools import url_scraper

def is_valid_url(url: str) -> bool:
    bad_patterns = [".pdf", ".doc", ".zip", ".ppt", "youtube.com", "youtu.be"]
    return not any(p in url.lower() for p in bad_patterns)

def parallel_scraper(selected_sources:list[dict], max_worker : int = 5 ,required_success:int = 3): 
    
    print("\n" + "=" * 80)
    print("🚀 PARALLEL SCRAPER")
    print("=" * 80)

    urls = []
    for i in selected_sources:
        url = i.get("URL")

        if url and is_valid_url(url):
            urls.append(url)

    print(f"📄 Total Ranked Sources : {len(selected_sources)}")
    print(f"✅ Valid URLs           : {len(urls)}")
    print(f"🎯 Required Successes   : {required_success}")
    print(f"👷 Max Workers          : {max_worker}")

    print("\nURLs to Scrape:\n")

    def scrap_one(url):
        print(f"🔄 Starting : {url}")
        try:
            content = url_scraper.invoke({'url':url})
            if not content or len(content) < 100:
                print(f"❌ Empty Content : {url}")
                return None
            return {
                "url":url,
                "content":content
            }

        except Exception as e:
            print(f"❌ Exception : {url}")
            print(e)
            return None
    # parallel execution
    results = []
    with ThreadPoolExecutor(max_workers=max_worker) as executor:
        futures = [executor.submit(scrap_one, url) for url in urls]
        for future in as_completed(futures, timeout=30):
            try:
                result = future.result()
                if result is not None:
                    results.append(result)
                    print(f"✅ Success ({len(results)}/{required_success}) : {result['url']}")
                    print(f"🌐 {result['url']}")
                    if len(results) >= required_success:

                        print("\n🎯 Enough sources collected.\n")

                        # cancel unfinished jobs
                        for f in futures:
                            f.cancel()

                        return results
            except Exception:
                continue

    return results
