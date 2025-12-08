---
title: "Advent of Cyber 2025 - Day 6: Malware Analysis"
date: "2025-12-06"
excerpt: "Day 6 of Advent of Cyber 2025 explores Malware Analysis. We perform static analysis using PeStudio to find hidden strings and indicators, followed by dynamic analysis with Regshot and ProcMon to observe malicious behavior."
coverImage: "/assets/blog/Aoc2025/day6/coverImage.jpg"
headerImage: "/assets/blog/Aoc2025/day6/HeaderImage.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "Malware Analysis", "Reverse Engineering", "Blue Team"]
series: "Advent of Cyber 2025"
---

# Malware Analysis: Static & Dynamic 🦠

Malware analysis is the art of dissecting malicious software to understand its behavior, objectives, and impact. It is generally categorized into two methodologies:

| Method | Description | Tools Used |
| :--- | :--- | :--- |
| **Static Analysis** | Examining the file **without** running it. We look at metadata, hashes, strings, and headers. | `PeStudio`, `Strings` |
| **Dynamic Analysis** | Running the malware in a safe, controlled environment (sandbox) to observe its **behavior**. | `RegShot`, `ProcMon` |

---

## 🔍 Part 1: Static Analysis with PeStudio

We start by analyzing the malicious executable `HopHelper.exe` using **PeStudio**.

### 1. Indicators & Hash
First, we identify the file's unique fingerprint (SHA256 hash). This allows us to check threat intelligence databases like VirusTotal.

**Question:** What is the SHA256Sum of HopHelper.exe?
> **Answer:** `F29C270068F865EF4A747E2683BFA07667BF64E768B38FBB9A2750A3D879CA33`

![PeStudio Hash](/assets/blog/Aoc2025/day6/Image1.jpg)

### 2. Extracting Strings
Strings are readable sequences of characters inside the binary. They often reveal:
*   IP addresses / URLs (C2 servers)
*   Filenames
*   Error messages
*   Hardcoded passwords or flags

We navigated to the **strings** tab in PeStudio to hunt for clues.

**Question:** Within the strings of HopHelper.exe, a flag with the format THM{XXXXX} exists. What is that flag value?
> **Answer:** `<REDACTED>`

![PeStudio Strings](/assets/blog/Aoc2025/day6/Image2.jpg)

---

## 💥 Part 2: Dynamic Analysis behaviors

Now, we detonate the malware! We use tools to monitor the system state *before* and *after* execution.

### 1. Registry Forensics with RegShot
Malware often modifies the Windows Registry to achieve **persistence** (automatically starting when the computer turns on).
*   **Step 1:** Take "1st Shot" (Clean state).
*   **Step 2:** Run `HopHelper.exe`.
*   **Step 3:** Take "2nd Shot" (Infected state).
*   **Step 4:** Compare.

**Question:** What registry value has the HopHelper.exe modified for persistence?
> **Answer:** `HKU\S-1-5-21-...\Software\Microsoft\Windows\CurrentVersion\Run\HopHelper`

![RegShot Results](/assets/blog/Aoc2025/day6/Image3.jpg)

### 2. Process Monitoring with ProcMon
**Process Monitor (ProcMon)** captures real-time system activity. We use it to see exactly what the malware is doing—file creation, network connections, etc.

Since ProcMon captures *everything*, we must filter the noise.
*   **Filter:** `Process Name` is `HopHelper.exe`
*   **Filter:** `Operation` contains `TCP`

**Question:** Filter the output of ProcMon for "TCP" operations. What network protocol is HopHelper.exe using to communicate?
> **Answer:** `HTTP`

![ProcMon Network Activity](/assets/blog/Aoc2025/day6/Image4.jpg)

---

## Conclusion

We confirmed `HopHelper.exe` is malicious.
1.  **Static Analysis** revealed hidden flags and a unique hash.
2.  **Dynamic Analysis** showed it establishes **persistence** via the Registry and communicates over **HTTP**, likely to a Command & Control (C2) server.

**Mission Accomplished!** 🚀