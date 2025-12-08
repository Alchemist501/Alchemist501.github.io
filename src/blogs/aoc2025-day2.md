---
title: "Advent of Cyber 2025 - Day 2: Social Engineering & Phishing"
date: "2025-12-02"
excerpt: "Day 2 of Advent of Cyber 2025 focuses on Social Engineering. We explore phishing techniques, the S.T.O.P. mnemonic, and use the Social-Engineer Toolkit (SET) to simulate a phishing attack."
coverImage: "/assets/blog/Aoc2025/day2/coverImage.jpg"
headerImage: "/assets/blog/Aoc2025/day2/image1.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "Social Engineering", "Phishing"]
series: "Advent of Cyber 2025"
---

# Social Engineering & Phishing

**Social engineering** is the art of manipulating people into making mistakes—like sharing passwords, opening malicious files, or approving payments. Unlike traditional hacking that targets systems, social engineering targets **humans**, relying on psychological triggers like urgency, curiosity, and authority.

**Phishing**, a common subset of social engineering, uses deceptive messages (email, SMS, social media) to trick users.

![Social Engineering]
## The S.T.O.P. Strategy

To defend against phishing, remember the **S.T.O.P.** mnemonics:

**1. Ask Yourself:**
*   **S**uspicious?
*   **T**elling me to click something?
*   **O**ffering me an amazing deal?
*   **P**ushing me to do something now?

**2. Follow Instructions:**
*   **S**low down. (Don't let adrenaline take over).
*   **T**ype the address yourself. (Avoid clicking links).
*   **O**pen nothing unexpected.
*   **P**rove the sender. (Verify the actual address, not just the display name).

---

# The Mission: Harvesting Credentials

Our goal is to acquire a target user's login credentials using a fake login page and a phishing email.

## Step 1: Setting up the Trap

First, we start a python server to host our fake login page.

```bash
root@attackbox:~# cd ~/Rooms/AoC2025/Day02
root@attackbox:~/Rooms/AoC2025/Day02# ./server.py
Starting server on http://0.0.0.0:8000
```

![Server Start](/assets/blog/Aoc2025/day2/image2.jpg)

Verifying the fake portal on `http://localhost:8000`:

![Fake Portal](/assets/blog/Aoc2025/day2/image3.jpg)

## Step 2: Delivery via Social-Engineer Toolkit (SET)

We use **SET** to orchestrate the attack.

![SET Menu](/assets/blog/Aoc2025/day2/image4.jpg)

1.  Select **1** for Social-Engineering Attacks.
2.  Select **5** for **Mass Mailer Attack**.
3.  Select **1** for **E-Mail Attack Single Email Address**.

### Configuration Details

*   **Target:** `factory@wareville.thm`
*   **Delivery Method:** Use your own server or open relay.
*   **From Address:** `updates@flyingdeer.thm` (Spoofing a known shipping partner).
*   **From Name:** `Flying Deer`
*   **SMTP Server:** `10.48.135.11` (TBFC mail server).
*   **Port:** `25`
*   **High Priority:** No.
*   **Attach File:** No.
*   **Inline File:** No.

### Crafting the Email

*   **Subject:** `Shipping Schedule Changes`
*   **Format:** Plaintext.
*   **Body:** We write a convincing message urging the user to check the schedule at our malicious link: `http://<MACHINE-IP>:8000`.

![Email Body](/assets/blog/Aoc2025/day2/image5.jpg)

![Email Sent](/assets/blog/Aoc2025/day2/image6.jpg)

---

# Results

Once the target clicks the link and logs in, our python server captures the credentials.

**1. What is the password used to access the TBFC portal?**

Checking the server output reveals the harvested credentials:

![Credentials Captured](/assets/blog/Aoc2025/day2/result.jpg)

**2. What is the total number of toys expected for delivery?**

Using the stolen credentials, we log into the actual portal at `http://<MACHINE-IP>` (accessing the mailbox of the factory user) to find the answer.

![Mailbox](/assets/blog/Aoc2025/day2/image7.jpg)

![Final Flag](/assets/blog/Aoc2025/day2/final.jpg)

**Mission Accomplished!**

![Done](/assets/blog/Aoc2025/day2/done.jpg)
