---
title: "Advent of Cyber 2025: Warm-Up Challenges 1-10"
date: "2025-11-22"
excerpt: "A comprehensive walkthrough of the first 10 warm-up challenges from TryHackMe's Advent of Cyber 2025, covering password security, malware analysis, Linux/Windows forensics, and more."
coverImage: "/assets/AoD25.jpg"
headerImage: "/assets/AoCHeader.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "Walkthrough"]
---


The holiday season is upon us, and so is **TryHackMe's Advent of Cyber 2025**! To kick things off, I've tackled the first 10 warm-up challenges. These tasks are designed to refresh essential skills ranging from basic command-line navigation to log analysis and breach detection.

Here is my write-up for challenges 1 through 10.

---


# 1. Password Pandemonium 🔐

> **Scenario:** McSkidy is trying to secure his accounts before the holiday rush, but the system is rejecting his weak password attempts. To proceed with his preparations at TBFC, he must create a strong password.

**Objective:** Help McSkidy craft a secure password that the system will accept.

### 📝 Walkthrough
We reviewed the password policy:
- At least **12 characters**
- Contains **uppercase**, **lowercase**, **numbers**, and **symbols**
- Must not appear in **breach lists**

After constructing a sufficiently strong password that met all criteria, we submitted it successfully.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Complexity Matters:** Strong passwords are the first line of defense.
*   **Unpredictability:** Avoid reused or predictable patterns.

---

## 2. The Suspicious Chocolate.exe 🍫

> **Scenario:** TBFC received a mysterious file named `Chocolate.exe`. McSkidy suspects something is off — the file arrived unexpectedly and could be malicious.

**Objective:** Investigate the suspicious Windows executable.

### 📝 Walkthrough
1.  Downloaded the file.
2.  Inspected its **metadata**.
3.  Checked its **hash** against threat databases.

The behavior looked suspicious, and after analyzing it fully, we confirmed its malicious nature.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Hash It:** Hashing and comparing files helps quickly detect known malware.
*   **Triage First:** Initial triage is essential before deeper analysis.

---

## 3. Welcome to the AttackBox 🖥️

> **Scenario:** McSkidy is onboarding new analysts, but one of the welcome notes is missing from the AttackBox environment. Someone hid it inside the filesystem.

**Objective:** Find the hidden welcome message.

### 📝 Walkthrough
We navigated into the challenges directory and listed the available files:

```bash
cd challenges
ls -la
cat .welcome_msg
```

After viewing the hidden message using standard Linux commands, we found the flag.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Navigation:** Basic Linux navigation is vital in cybersecurity work.
*   **Hidden Files:** Hidden or misplaced files often contain hints (`.` prefix in Linux).

---

## 4. The CMD Conundrum 💻

> **Scenario:** A Windows system at TBFC has an unusual directory with hidden contents. McSkidy thinks someone left a clue inside.

**Objective:** Reveal and read hidden files using Windows CMD.

### 📝 Walkthrough
Using the command prompt, we displayed hidden files in the directory:

```cmd
dir /a
type secret.txt
```

We located the concealed text file and displayed its contents to reveal the message.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Power of CMD:** CMD is extremely useful for quick investigations on Windows.
*   **Hidden Attributes:** Hidden files are often used to store configuration or clues.

---

## 5. Linux Lore 🐧

> **Scenario:** TBFC’s delivery drones are malfunctioning, dropping eggs instead of gifts. McSkidy suspects something strange in his own Linux account might explain the glitch.

**Objective:** Search McSkidy’s home folder for any suspicious messages.

### 📝 Walkthrough
We entered his home directory and used `ls -la` to reveal hidden files:

```bash
cd ~
ls -la
cat .secret_message
```

We found `.secret_message` and read its contents.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Dotfiles:** Hidden files in Linux often contain configuration or important notes.
*   **CLI Skills:** Simple command-line skills can uncover critical information.

---

## 6. The Leak in the List 💧

> **Scenario:** Rumors are spreading that TBFC staff emails were leaked online. McSkidy fears his email might be part of a breach.

**Objective:** Check if McSkidy’s email was compromised.

### 📝 Walkthrough
We entered `mcskidy@tbfc.com` into a breach-checking tool and reviewed the compromised domain indicators. Once the correct breach entry was identified, we confirmed the leak.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Breach Detection:** Tools like *Have I Been Pwned* help limit attacker reach.
*   **Proactive Security:** Early awareness prevents credential-stuffing attacks.

---

## 7. WiFi Woes in Wareville 📶

> **Scenario:** Someone logged into TBFC’s company router using default credentials. As a result, drones began looping endlessly over Wareville Square.

**Objective:** Log into the router and secure it with a strong password.

### 📝 Walkthrough
We accessed the router using the classic default credentials:

- **Username:** `admin`
- **Password:** `admin`

We navigated to the security settings and updated the password to a strong one.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Change Defaults:** Default passwords are extremely dangerous and easy to guess.
*   **Device Hardening:** Network devices MUST be properly secured immediately upon installation.

---

## 8. The App Trap 📱

> **Scenario:** McSkidy noticed strange posts coming from his social account. He suspects a malicious third‑party app was linked without authorization.

**Objective:** Identify and remove the rogue connected app.

### 📝 Walkthrough
We reviewed all connected apps:
- Weather Elf
- Gift Tracker
- **Eastmas Scheduler** (Suspicious!)

*Eastmas Scheduler* had suspicious permissions, including **password vault access**. After revoking it, the account was secured.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Audit Apps:** Always review permissions granted to third‑party apps.
*   **Least Privilege:** Even legitimate‑looking apps can act maliciously if given too much power.

---

## 9. The Chatbot Confession 🤖

> **Scenario:** TBFC’s AI helper, **FestiveBot**, is behaving strangely — leaking internal URLs, credentials, and tokens inside normal conversations.

**Objective:** Identify the sensitive data FestiveBot is revealing.

### 📝 Walkthrough
We chatted with the bot and analyzed its responses. We found it leaking:
1.  An internal **admin URL**
2.  Email **login credentials**
3.  A **service token**

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **AI Risks:** AI systems can accidentally leak sensitive training data or context.
*   **Validation:** Always validate and sanitize chatbot outputs in production environments.

---

## 10. The Bunny’s Browser Trail 🐇

> **Scenario:** The SOCMAS web server logs show heavy traffic, but one strange user-agent stands out — something called *BunnyOS*.

**Objective:** Find the suspicious user-agent in the logs.

### 📝 Walkthrough
We reviewed the web server logs line by line and spotted an abnormal user agent:

`BunnyOS/1.0 (HopSecBot)` accessing `/admin/panel`

Upon identifying this rogue request among the normal traffic, we confirmed the intrusion attempt.

**🚩 Flag Captured!**

### 🔑 Key Takeaways
*   **Log Analysis:** Monitoring user agents helps detect automated bots and scanners.
*   **SOC Basics:** Log analysis is foundational for any Security Operations Center (SOC) work.

---

## Conclusion

These warm-up challenges introduced a range of essential cybersecurity skills, from Linux navigation and Windows command-line usage to breach detection, network security, log analysis, and app permission auditing.

Documenting them as a single blog demonstrates both practical ability and clear technical communication — something that employers look for. **Happy Hacking!** 🎄

