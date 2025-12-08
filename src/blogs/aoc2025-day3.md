---
title: "Advent of Cyber 2025 - Day 3: Log Analysis with Splunk"
date: "2025-12-03"
excerpt: "Day 3 of Advent of Cyber 2025 dives into SIEM with Splunk. We learn to ingest logs, use SPL (Search Processing Language), and trace an attack chain from reconnaissance to data exfiltration."
coverImage: "/assets/blog/Aoc2025/day3/coverImage.jpg"
headerImage: "/assets/blog/Aoc2025/day3/HeaderImage.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "Splunk", "SIEM", "Log Analysis"]
series: "Advent of Cyber 2025"
---

# Log Analysis with Splunk

In this task, we step into the shoes of a SOC analyst using **Splunk** to investigate a security incident. We will analyze web traffic and firewall logs to uncover an attack chain executed by King Malhare's minions.

## Learning Objectives

*   Ingest and interpret custom log data in Splunk.
*   Create and apply custom field extractions.
*   Use **SPL (Search Processing Language)** to filter and refine search results.
*   Conduct a full investigation to uncover key insights.

---

# The Investigation

## 1. Initial Triage & Visualization

We start by exploring the `web_traffic` logs.

**Search Query:**
```splunk
index=main sourcetype=web_traffic
```

![Initial Search](/assets/blog/Aoc2025/day3/Image3.jpg)

To identify the peak attack time, we visualize the event count by day.

**Search Query:**
```splunk
index=main sourcetype=web_traffic | timechart span=1d count | sort by count | reverse
```

**Which day was the peak traffic in the logs?**
> **Answer:** 2024-10-12
![Peak Traffic](/assets/blog/Aoc2025/day3/Image7.jpg)

## 2. Filtering & Anomaly Detection

Attackers often use automated tools. We can filter out standard browsers (Mozilla, Chrome, Safari, Firefox) to find suspicious User Agents.

**Search Query:**
```splunk
index=main sourcetype=web_traffic user_agent!=*Mozilla* user_agent!=*Chrome* user_agent!=*Safari* user_agent!=*Firefox* | stats count by client_ip | sort -count | head 5
```

**What is the attacker IP?**
> **Answer:** <REDACTED>

![Attacker IP](/assets/blog/Aoc2025/day3/Image6.jpg)

---

# Tracing the Attack Chain

Now that we have the Attacker IP, we can trace their activities step-by-step.

## Phase 1: Reconnaissance
The attacker probed for exposed configuration files.

**Search Query:**
```splunk
sourcetype=web_traffic client_ip="<ATTACKER_IP>" AND path IN ("/.env", "/*phpinfo*", "/.git*") | table _time, path, user_agent, status
```

## Phase 2: Enumeration (Vulnerability Testing)
They tested for path traversal and open redirects.

**Search Query:**
```splunk
sourcetype=web_traffic client_ip="<ATTACKER_IP>" AND path="*..\/..\/*" OR path="*redirect*" | stats count by path
```

**How many path traversal attempts were observed?**
> **Answer:** 658

![Path Traversal](/assets/blog/Aoc2025/day3/Image58.jpg)

## Phase 3: SQL Injection
The attacker used automated tools like **Havij** and **sqlmap**.

**Search Query:**
```splunk
index=main sourcetype=web_traffic user_agent="Havij/1.17 (Automated SQL Injection)" | stats count by user_agent
```

**What is the count of Havij user_agent events?**
> **Answer:** 993

![SQL Injection](/assets/blog/Aoc2025/day3/Image8.jpg)

## Phase 4: Exfiltration
They attempted to download sensitive files like backups and logs.

**Search Query:**
```splunk
index=main sourcetype=web_traffic client_ip="<ATTACKER_IP>" AND path IN ("*backup.zip*", "*logs.tar.gz*") | stats count by path
```

![Exfiltration](/assets/blog/Aoc2025/day3/Image9.jpg)

## Phase 5: C2 Communication
Finally, we correlate with `firewall_logs` to see data transferred to the Command & Control (C2) server.

**Search Query:**
```splunk
sourcetype=firewall_logs src_ip="10.10.1.5" AND dest_ip="<ATTACKER_IP>" AND action="ALLOWED" | stats sum(bytes_transferred) by src_ip
```

**How many bytes were transferred to the C2 server?**
> **Answer:** 126167

![C2 Bytes](/assets/blog/Aoc2025/day3/Image5.jpg)

---

# Conclusion

We successfully reconstructed the entire attack timeline using Splunk:
1.  **Reconnaissance:** Probing for config files.
2.  **Exploitation:** SQL Injection using Havij.
3.  **Payload Delivery:** Uploading `bunnylock.bin` and `shell.php`.
4.  **C2 & Exfiltration:** Data transfer confirmed via firewall logs.

**Mission Accomplished!**

![Done](/assets/blog/Aoc2025/day3/Done.jpg)
