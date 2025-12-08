---
title: "Advent of Cyber 2025 - Day 5: IDOR & Privilege Escalation"
date: "2025-12-05"
excerpt: "Day 5 of Advent of Cyber 2025 dives into Insecure Direct Object References (IDOR). We scrutinize web traffic, exploit vulnerable parameters to access other users' accounts, and learn how to prevent these vulnerabilities."
coverImage: "/assets/blog/Aoc2025/day5/coverImage.jpg"
headerImage: "/assets/blog/Aoc2025/day5/HeaderImage.jpg"
tags: ["CTF", "Cybersecurity", "TryHackMe", "IDOR", "Web Security", "Burp Suite"]
series: "Advent of Cyber 2025"
---

# IDOR & Privilege Escalation 🛡️

**Insecure Direct Object Reference (IDOR)** is a common web vulnerability where an application exposes a reference to an internal implementation object, such as a file or database key, without access control checks.

In simpler terms: **The application uses an ID (like `user_id=10`) to retrieve data but fails to verify if the requesting user is actually allowed to see that data.**

### Learning Objectives

*   **Understanding Authentication vs. Authorization**: Authentication verifies *who* you are; Authorization verifies *what* you can do.
*   **Spotting IDOR**: Identifying parameters that directly reference objects (IDs, filenames, etc.).
*   **Exploitation**: Modifying these references to access unauthorized data (Horizontal Privilege Escalation).
*   **Prevention**: Implementing Secure Direct Object References (SDOR).

---

## The Investigation 🕵️‍♂️

We access the vulnerable web application to investigate a potential breach.

**Credentials:**
*   **Username:** `niels`
*   **Password:** `TryHackMe#2025`

### 1. Analyzing Web Traffic
After logging in, we inspect the network traffic using Browser Developer Tools. We notice a specific request used to fetch account information.

*   **Request:** `view_accountinfo`
*   **Parameter:** `user_id=10`

This tells us the application relies on the `user_id` stored in the browser (specifically in **Local Storage**) to determine whose profile to load.

### 2. Exploiting the IDOR
We can manipulate this behavior to access other users' accounts.

1.  Open Developer Tools -> **Storage** tab.
2.  Find the `auth_user` key in Local Storage.
3.  Change the `user_id` from `10` to `11`.
4.  Refresh the page.

**Result:** We act immediately logged in as a completely different user!

**Question:** Exploiting the IDOR found in the view_accounts parameter, what is the user_id of the parent that has 10 children?
> **Answer:** 15

To find this, we simply incremented the `user_id` (12, 13, 14, 15...) until we found the target profile.

![User ID Manipulation](/assets/blog/Aoc2025/day5/Image3.jpg)

---

## Advanced IDOR Techniques 🧩

Attackers (and defenders) know that simple integers are easy to guess. Developers often try to "hide" these IDs using encoding or hashing.

### Base64 Encoding
Sometimes, IDs are encoded. For example, `Mg==` is just the Base64 representation of `2`.
*   **Observation:** If we see parameters like `id=Mg==`, we can decode it, increment the number, re-encode it, and send the attack.

### Hashing (MD5/SHA1)
Sometimes IDs look like random strings (e.g., `c4ca4238a0b923820dcc509a6f75849b`).
*   **Analysis:** We can use tools like a **Hash Identifier** to recognize the algorithm.
*   **Exploitation:** If the hash is just `md5(id)`, we can compute `md5(2)`, `md5(3)`, etc., to enumerate users.

![Hash Identifier](/assets/blog/Aoc2025/day5/Image1.jpg)

### UUIDs
Universally Unique Identifiers (UUIDs) are meant to be unique and hard to guess. However, older standards like **UUID v1** are time-based.
*   **Risk:** If we know the exact time a UUID was generated, we can potentially brute-force it.

![UUID Decoder](/assets/blog/Aoc2025/day5/Image2.jpg)

---

## Bonus: Automating the Attack 🤖

**Challenge:** Find the `id_number` of the child born on 2019-04-17.

We can use **Burp Suite** to automate this:
1.  Intercept the request to the endpoint.
2.  Send it to **Intruder**.
3.  Set the payload position on the ID parameter.
4.  Configure the payload to iterate numbers (1 to 50), applying **Base64** or **MD5** encoding rules as needed.
5.  Start the attack and analyze the responses for the matching birth date.

**Question:** What is the ID number?
> **Answer:** 19

![Burp Suite Attack](/assets/blog/Aoc2025/day5/Image4.jpg)

---

## Conclusion: Improve Design, Obliterate Risk

The best defense involves **server-side access control checks**.

1.  **Never rely on obfuscation:** Encoding IDs (Base64/Hashing) is security through obscurity and fails easily.
2.  **Enforce Authorization:** Every time a request for data is made, the server MUST check: *"Does the currently logged-in user have permission to access THIS specific object?"*
3.  **Use unpredictable IDs:** Strong, random UUIDs (like v4) make enumeration significantly harder, though they don't replace access controls.

**Mission Accomplished!** 🚀