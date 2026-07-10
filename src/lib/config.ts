export interface SpecializationConfig {
  title: string;
  roleName: string;
  subtitle: string;
  typewriterTexts: string[];
  description: string;
  skills: string[];
  interests: string[];
  featuredProjectTitle: string;
  majorProjectTitles: string[];
  aboutCards: { title: string; desc: string }[];
  contactTagline: string;
}

export const SPECIALIZATIONS: Record<string, SpecializationConfig> = {
  systems: {
    title: "Systems Engineering",
    roleName: "Systems Engineer",
    subtitle: "Low-Latency Infrastructure • Distributed Systems • Performance Engineering",
    typewriterTexts: [
      "Building low-latency infrastructure",
      "Cache-conscious programming",
      "Distributed systems"
    ],
    description: "CS graduate obsessed with how things work under the hood. I build high-performance systems in C++ — matching engines, cache simulators, distributed compute pipelines. If it runs on Linux and needs to be fast and reliable, I'm in.",
    skills: ["C++", "Rust", "Linux", "Networking", "Memory Management", "Concurrency", "Lock-free Programming", "Kernel Space"],
    interests: ["Low-Latency Systems", "Distributed Infrastructure", "Backend Engineering", "Computer Architecture", "Lock-Free Concurrency"],
    featuredProjectTitle: "Low-Latency Exchange Matching Engine",
    majorProjectTitles: [
      "Configurable Cache Performance Simulator",
      "Biosignals — Distributed Disaster Early Warning System"
    ],
    aboutCards: [
      {
        title: "Low-Latency Engineering",
        desc: "I build systems where microseconds matter. From order book matching engines to cache simulators, I design modular, testable C++ systems with real performance constraints."
      },
      {
        title: "Distributed Infrastructure",
        desc: "Coordinating 100 nodes across a Linux network with Ray and TailScale taught me that reliability at scale isn't accidental — it's engineered."
      },
      {
        title: "Backend & APIs",
        desc: "REST, WebSockets, CLI tooling — I build the plumbing that makes systems talk to each other cleanly and at speed."
      }
    ],
    contactTagline: "Interested in working together or discussing systems infrastructure? Reach out!"
  },
  cybersecurity: {
    title: "Security Engineering",
    roleName: "Security Engineer",
    subtitle: "Cloud Security • IAM Analysis • Offensive Security",
    typewriterTexts: [
      "Offensive security",
      "Cloud IAM",
      "Threat detection"
    ],
    description: "CS graduate who breaks things to make them stronger. From automated IAM analysis tools and recon pipelines to SOC simulations and CTF competitions — I operate across the full offensive/defensive stack. Currently hunting bugs and writing about it.",
    skills: ["OWASP", "Burp Suite", "Nmap", "SIEM", "YARA", "MITRE ATT&CK", "Splunk", "AWS IAM"],
    interests: ["Offensive Security", "Cloud Security", "SecOps & SIEM", "Vulnerability Analysis", "Automation"],
    featuredProjectTitle: "Automated AWS IAM Least-Privilege Auditor",
    majorProjectTitles: [
      "Phishing Simulation Campaign",
      "SOC Analyst Simulation — LetsDefend.io",
      "Cascade-Guard — Propagation-Based Fake News Detection"
    ],
    aboutCards: [
      {
        title: "Offensive Security",
        desc: "I don't just learn theory; I break things to make them stronger. From bug bounty submissions to recon automation and phishing simulations, I actively simulate threats to understand defenses."
      },
      {
        title: "Secure Systems & Research",
        desc: "I research privacy-preserving distributed frameworks that secure neural computations, defending distributed nodes from active parameter poisoning attacks while keeping training datasets private."
      },
      {
        title: "Security Operations",
        desc: "Defense is an art. Through SOC simulations and real-world labs, I've honed incident response, malware analysis, and threat hunting. Every SIEM alert is a puzzle waiting to be solved."
      }
    ],
    contactTagline: "Interested in working together or discussing cybersecurity? Reach out!"
  },
  ai: {
    title: "AI Research Engineering",
    roleName: "AI Research Engineer",
    subtitle: "Federated Learning • Differential Privacy • Computer Vision",
    typewriterTexts: [
      "Federated learning",
      "Computer vision",
      "Privacy-preserving AI"
    ],
    description: "CS graduate building intelligent systems that go beyond the obvious. Graph neural networks for disinformation detection, privacy-preserving federated learning, computer vision for agriculture, and LLM agents that actually do things autonomously.",
    skills: ["PyTorch", "TensorFlow", "Transformers", "Computer Vision", "Federated Learning", "CUDA"],
    interests: ["Distributed Learning", "AI in Security", "Computer Vision", "Privacy-Preserving AI", "Neural Networks"],
    featuredProjectTitle: "Cascade-Guard — Graph Neural Network for Disinformation Detection",
    majorProjectTitles: [
      "Aggrow — AI-Powered Agricultural Decision System",
      "Biosignals — ML-Driven Disaster Prediction from Animal Behavior",
      "Deadline Extractor Agent — LLM-Powered Workflow Automation"
    ],
    aboutCards: [
      {
        title: "Graph Intelligence",
        desc: "I built Cascade-Guard to detect fake news not by reading it, but by watching how it spreads — using Graph Attention Networks and 768-dim BERT behavioral embeddings."
      },
      {
        title: "Privacy-Preserving ML",
        desc: "I specialize in privacy-centric federated learning schemes, applying local differential privacy guarantees and cryptographic aggregation protocols to secure machine learning networks."
      },
      {
        title: "Applied AI",
        desc: "From crop disease detection with PyTorch to LLM agents that autonomously extract deadlines from emails, I build AI that solves real, specific problems."
      }
    ],
    contactTagline: "Interested in working together or discussing AI research? Reach out!"
  }
};
