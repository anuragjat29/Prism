from agent import summarizer_chain

def summarizer(scraped_content: list[dict]) -> list[dict]:

    print("\n" + "=" * 80)
    print("📝 SUMMARIZER")
    print("=" * 80)

    summarized = []

    for idx, item in enumerate(scraped_content, start=1):

        url = item["url"]
        content = item["content"]

        print(f"\n[{idx}/{len(scraped_content)}]")
        print(f"🌐 {url}")
        print(f"📄 Input Length : {len(content)} chars")

        try:

            response = summarizer_chain.invoke({
                "content": content
            })

            summary = response.content.strip()

            if len(summary) < 50:
                print("⚠ Summary too short. Skipping.")
                continue

            summarized.append({
                "url": url,
                "content": summary
            })

            print(f"✅ Summary Length : {len(summary)} chars")

        except Exception as e:

            print(f"❌ Failed to summarize")
            print(e)

    print("\n" + "=" * 80)
    print("📊 SUMMARY COMPLETE")
    print("=" * 80)

    print(f"Successful Summaries : {len(summarized)}")

    return summarized