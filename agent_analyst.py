import requests
from bs4 import BeautifulSoup
import os
import json

# CONFIG
TARGET_SITE = "https://calcforlife.com/"
MY_HOME_JS = "home.js"

def get_competitor_tools():
    print(f"[*] Scraping {TARGET_SITE}...")
    try:
        response = requests.get(TARGET_SITE, timeout=10)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # This selector depends on the structure of calcforlife.com
        # Adjust based on how they list tools (links usually)
        links = soup.find_all('a', href=True)
        tools = []
        for l in links:
            if 'calculator' in l['href'] or 'calc' in l['href']:
                tools.append({
                    'title': l.get_text(strip=True),
                    'url': l['href']
                })
        return tools
    except Exception as e:
        print(f"[ERROR] Failed to scrape: {e}")
        return []

def get_my_tools():
    # Basic parsing of home.js to find existing slugs
    if not os.path.exists(MY_HOME_JS):
        return []
    
    with open(MY_HOME_JS, 'r', encoding='utf-8') as f:
        content = f.read()
        # This is a very rough way to find slugs in JS
        import re
        slugs = re.findall(r"slug:\s*'(.*?)'", content)
        return slugs

def analyze():
    comp_tools = get_competitor_tools()
    my_slugs = get_my_tools()
    
    new_ideas = []
    for tool in comp_tools:
        # Check if the title/slug is already in our list
        # Simple heuristic check
        is_new = True
        for my_slug in my_slugs:
            if my_slug in tool['url'].lower():
                is_new = False
                break
        
        if is_new:
            new_ideas.append(tool)
    
    print(f"[+] Found {len(new_ideas)} potential new tools!")
    
    # Save ideas for the next agent to pick up
    with open('new_ideas.json', 'w') as f:
        json.dump(new_ideas[:10], f, indent=4) # Take top 10

if __name__ == "__main__":
    analyze()
