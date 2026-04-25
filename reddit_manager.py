import praw
import json
import time
import os

# CONFIGURATION
# You will need to get these from https://www.reddit.com/prefs/apps
REDDIT_CLIENT_ID = os.environ.get('REDDIT_CLIENT_ID', 'YOUR_ID')
REDDIT_CLIENT_SECRET = os.environ.get('REDDIT_CLIENT_SECRET', 'YOUR_SECRET')
REDDIT_USER_AGENT = 'CalcsForLife Bot v1.0 by /u/YOUR_USERNAME'
REDDIT_USERNAME = os.environ.get('REDDIT_USERNAME', 'YOUR_USERNAME')
REDDIT_PASSWORD = os.environ.get('REDDIT_PASSWORD', 'YOUR_PASSWORD')

# KEYWORDS to monitor
KEYWORDS = ['how to calculate', 'calculator for', 'is there a tool for', 'math help', 'dog food portions', 'concrete volume']
SUBREDDITS = ['dogs', 'cooking', 'personalfinance', 'DIY', 'homeimprovement', 'mathematics']

def monitor_reddit():
    reddit = praw.Reddit(
        client_id=REDDIT_CLIENT_ID,
        client_secret=REDDIT_CLIENT_SECRET,
        user_agent=REDDIT_USER_AGENT,
        username=REDDIT_USERNAME,
        password=REDDIT_PASSWORD
    )

    print(f"[*] Monitoring subreddits: {', '.join(SUBREDDITS)}")
    
    subreddit_stream = reddit.subreddit('+'.join(SUBREDDITS)).stream.comments(skip_existing=True)

    for comment in subreddit_stream:
        text = comment.body.lower()
        if any(kw in text for kw in KEYWORDS):
            # Log the potential opportunity
            log_opportunity(comment)

def log_opportunity(comment):
    print(f"[!] Found opportunity in r/{comment.subreddit.display_name}")
    print(f"    Author: {comment.author}")
    print(f"    Text: {comment.body[:100]}...")
    print(f"    Link: https://reddit.com{comment.permalink}")
    
    # Here you would typically send this text to an LLM (Gemini/GPT) 
    # to generate a helpful response, then use comment.reply(ai_response)
    # For safety, we start by logging it to a file.
    with open('opportunities.json', 'a') as f:
        json.dump({
            'id': comment.id,
            'url': f"https://reddit.com{comment.permalink}",
            'text': comment.body,
            'time': time.time()
        }, f)
        f.write('\n')

if __name__ == "__main__":
    try:
        monitor_reddit()
    except Exception as e:
        print(f"[ERROR] {e}")
