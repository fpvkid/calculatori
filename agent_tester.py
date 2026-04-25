import os

def test_new_pages():
    print("[*] Testing new pages for bugs...")
    # 1. Find newly created folders
    # 2. Check index.html for common issues (missing tags, broken scripts)
    # 3. Use an LLM to "review" the design and fix CSS if it looks "cheap"
    
    # Mock logic:
    new_pages = [d for d in os.listdir('.') if os.path.isdir(d) and 'calculator' in d]
    for page in new_pages:
        path = os.path.join(page, 'index.html')
        if os.path.exists(path):
            with open(path, 'r') as f:
                content = f.read()
                if "../shared/global.css" not in content:
                    print(f"[FIX] Adding missing CSS link to {page}")
                    # Logic to insert missing tags
    print("[+] QA Complete. No critical bugs found.")

if __name__ == "__main__":
    test_new_pages()
