export interface SkillGroup {
  id: string;
  category: string;
  skills: string[];
}

export const SKILLS_DATA: Record<string, SkillGroup[]> = {
  systems: [
    {
      id: "core",
      category: "Core Systems",
      skills: ["Memory Management", "Concurrency", "Lock-free Programming", "Kernel Space", "Low-Latency Data Structures"]
    },
    {
      id: "languages",
      category: "Languages",
      skills: ["C++", "Rust", "Go", "C", "Bash"]
    },
    {
      id: "platforms",
      category: "Platforms & Tools",
      skills: ["Linux", "UNIX/POSIX", "Git", "Docker", "eBPF"]
    },
    {
      id: "other",
      category: "Interests & Infra",
      skills: ["Network Programming", "Performance Auditing", "Distributed Systems"]
    }
  ],
  cybersecurity: [
    {
      id: "core",
      category: "Security Operations",
      skills: ["SIEM (Splunk)", "Threat Detection", "Incident Response", "Vulnerability Analysis"]
    },
    {
      id: "testing",
      category: "Offensive Security",
      skills: ["Penetration Testing", "OWASP Top 10", "Burp Suite", "Nmap", "Metasploit"]
    },
    {
      id: "tools",
      category: "Tools & Scripting",
      skills: ["Scapy", "GoPhish", "YARA", "AWS IAM Security", "Python"]
    },
    {
      id: "infra",
      category: "Network Defense",
      skills: ["Wireshark", "IDS/IPS Auditing", "eBPF Syscall Auditing", "Linux Security"]
    }
  ],
  ai: [
    {
      id: "core",
      category: "Deep Learning",
      skills: ["TensorFlow", "PyTorch", "Transformers", "Model Optimization", "CUDA"]
    },
    {
      id: "distributed",
      category: "Distributed ML",
      skills: ["Federated Learning (Flower)", "Differential Privacy", "Secure Aggregation", "PySyft"]
    },
    {
      id: "vision",
      category: "Computer Vision",
      skills: ["OpenCV", "ResNet (CNN)", "Image Processing", "Feature Extraction"]
    },
    {
      id: "dev",
      category: "Backend & Systems",
      skills: ["Python", "Flask", "C++ Engine Integrations", "Linux Execution", "REST APIs"]
    }
  ]
};

export interface InterestPriority {
  name: string;
  rolePriority: Record<string, number>;
}

export const ALL_INTERESTS: InterestPriority[] = [
  { name: "Low-Latency Systems", rolePriority: { systems: 1, cybersecurity: 5, ai: 4 } },
  { name: "Distributed Infrastructure", rolePriority: { systems: 2, cybersecurity: 6, ai: 3 } },
  { name: "Backend Engineering", rolePriority: { systems: 3, cybersecurity: 7, ai: 5 } },
  { name: "Computer Architecture", rolePriority: { systems: 4, cybersecurity: 8, ai: 6 } },
  { name: "Cybersecurity", rolePriority: { systems: 7, cybersecurity: 1, ai: 8 } },
  { name: "Penetration Testing", rolePriority: { systems: 8, cybersecurity: 2, ai: 9 } },
  { name: "Threat Detection", rolePriority: { systems: 6, cybersecurity: 3, ai: 7 } },
  { name: "Security Automation", rolePriority: { systems: 5, cybersecurity: 4, ai: 10 } },
  { name: "Distributed Learning", rolePriority: { systems: 9, cybersecurity: 10, ai: 1 } },
  { name: "AI in Security", rolePriority: { systems: 10, cybersecurity: 9, ai: 2 } }
];
