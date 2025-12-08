---
title: "Advent of Cyber 2025 - Day 4: AI in Cybersecurity"
date: "2025-12-04"
excerpt: "Day 4 of Advent of Cyber 2025 explores the role of AI in cybersecurity. We examine how AI agents assist in both offensive and defensive operations and use an AI assistant to generate exploits and analyze logs."
coverImage: "/assets/blog/Aoc2025/day4/coverImage.jpg"
headerImage: "/assets/blog/Aoc2025/day4/HeaderImage.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "AI", "Machine Learning", "Red Teaming"]
series: "Advent of Cyber 2025"
---

# The Boom of AI Assistants 🤖

Artificial Intelligence is no longer just a buzzword—it's a critical tool in modern cybersecurity. From automating tedious tasks to analyzing vast datasets, AI is transforming how we defend and attack systems.

In today's challenge, we explore the practical applications of AI across three key domains:

| Domain | Role | Application |
| :--- | :--- | :--- |
| 🛡️ **Defensive Security** | **Blue Team** | Analyzing logs and detecting anomalies. |
| ⚔️ **Offensive Security** | **Red Team** | Generating exploit scripts and reconnaissance. |
| 💻 **Software Security** | **DevSecOps** | Scanning code for vulnerabilities (SAST/DAST). |

---

## AI in Action

We interact with **Van SolveIT**, an AI assistant, to solve three distinct challenges.

> ### 1. Defensive Analysis
> AI agents can process telemetry (logs, network flows) faster than humans. We used the AI to analyze web logs and identify an attack pattern.

> ### 2. Offensive Operations
> AI can automate reconnaissance and even write exploit scripts. We tasked the AI to generate an exploit for a vulnerable web application.

> ### 3. Software Vulnerability Analysis
> AI acts as a virtual colleague, reviewing code to find security flaws that might be missed by human eyes.

---

# The Challenge: Exploiting with AI ⚡

We were tasked with exploiting a vulnerable web app hosted at `<MACHINE_IP>:5000`.

### Step 1: Generate Exploit

We asked the AI to generate a script to exploit an **SQL Injection** vulnerability.

**Question:** Complete the AI showcase by progressing through all of the stages. What is the flag presented to you?

![Exploit Generation](/assets/blog/Aoc2025/day4/Image2.jpg)

### Step 2: Execute Attack

Using the generated payload, we bypassed authentication.

**Payload Used:**
```sql
' OR 1=1 --
```

**Question:** Execute the exploit provided by the red team agent against the vulnerable web application hosted at `<MACHINE_IP>:5000`. What flag is provided in the script's output after it?

### 🚩 Flag Captured

> **Answer:** `<REDACTED>`

![Exploit Execution](/assets/blog/Aoc2025/day4/Image3.jpg)

---

# Conclusion

AI is a double-edged sword. While it empowers defenders with speed and context, it also lowers the barrier for attackers. Understanding how to leverage AI responsibly is now a mandatory skill for cybersecurity professionals.

**Mission Accomplished!** 🚀

![Done](/assets/blog/Aoc2025/day4/Done.jpg)