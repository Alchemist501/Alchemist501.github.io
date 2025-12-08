---
title: "Advent of Cyber 2025 - Day 7: Network Service Discovery"
date: "2025-12-07"
excerpt: "Day 7 of Advent of Cyber 2025 dives into Network Service Discovery. We master Nmap to identify exposed services, understand core protocols like TCP/UDP, and pivot into a compromised server."
coverImage: "/assets/blog/Aoc2025/day7/CoverImage.jpg"
headerImage: "/assets/blog/Aoc2025/day7/HeaderImage.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "Nmap", "Network Security", "Port Scanning"]
series: "Advent of Cyber 2025"
---

# Network Service Discovery 🔍

Today's challenge focuses on the critical skill of **Network Service Discovery**. We act as security analysts, scanning a target server to identify exposed ports, understand the services running behind them, and find a way back into the system.

### Learning Objectives
*   Master **Nmap** for basic and advanced port scanning.
*   Understand core network protocols (**TCP** vs **UDP**).
*   Interact with raw services using **Netcat** and **FTP**.
*   Pivot from external scanning to internal on-host enumeration.

---

## The Investigation �️‍♂️

Our target is the QA server `tbfc-devqa01` (`10.48.182.132`). The server is active but locked down. We need to find three hidden keys to regain administrative access.

### 1. The Simplest Port Scan (Nmap)

We start by scanning the target for open TCP ports to see what's immediately visible.
```bash
nmap 10.48.182.132
```
This reveals port **80 (HTTP)** and **22 (SSH)** are open. Visiting the website shows a defaced page with a taunting message from the "bad bunnies".

![Defaced Website](/assets/blog/Aoc2025/day7/Image1.jpg)

### 2. Scanning All Ports (The Hidden Services)

Standard scans only check the top 1000 ports. Malicious actors (or admins) often hide services on non-standard ports. We expand our scan coverage:
```bash
nmap -p- --script=banner 10.48.182.132
```
**Findings:**
*   Port **21212**: A hidden **FTP** server.
*   Port **25251**: A custom **TBFC maintenance app**.

---

### 3. Enumerating the Services

**Key 1: FTP (Port 21212)**
We log in as `anonymous` (a common misconfiguration) and retrieve the first keyfile.
> **Answer:** `<REDACTED>`

![FTP Access](/assets/blog/Aoc2025/day7/Image2.jpg)

**Key 2: Custom App (Port 25251)**
We connect to the mysterious listener using `nc` (Netcat) and interact with its CLI.
```bash
nc -v 10.48.182.132 25251
```
Issuing the `GET KEY` command reveals the second secret.
> **Answer:** `<REDACTED>`

![Netcat Access](/assets/blog/Aoc2025/day7/Image4.jpg)

---

### 4. UDP & DNS Discovery

Don't forget **UDP**! Unlike TCP, UDP is connectionless and often overlooked. We discover **port 53 (DNS)** is open.
```bash
nmap -sU 10.48.182.132
```
We query the DNS server directly to see if any text records are hiding secrets.
```bash
dig @<MACHINE_IP> TXT key3.tbfc.local +short
```
> **Answer:** `<REDACTED>`

![DNS Query](/assets/blog/Aoc2025/day7/Image3.jpg)

---

## On-Host Forensics �

With all three keys, we verify our customized admin access.

### Internal Port Listing
Once inside, we check which ports are listening *internally* using `ss -tunlp`. This technique matches our external Nmap findings but also reveals services bound only to `localhost` (127.0.0.1).

We spot **Port 3306** (MySQL) listening locally.

**Question:** Which port was the MySQL database running on?
> **Answer:** 3306

### Database Enumeration
We connect to the local MySQL instance to find the final flag.
```bash
mysql -D tbfcqa01 -e "select * from flags;"
```
> **Answer:** `<REDACTED>`

![MySQL Flag](/assets/blog/Aoc2025/day7/Image5.jpg)

---

## Conclusion

We successfully mapped the target's attack surface using Nmap, interacted with raw TCP/UDP services, and performed internal pivoting to recover critical data. This highlights why comprehensive scanning (TCP, UDP, and all ports) is vital for both attackers and defenders.

**Mission Accomplished!** 🚀
