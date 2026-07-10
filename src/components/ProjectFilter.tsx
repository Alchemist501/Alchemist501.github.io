import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Shield, Code, ExternalLink, Github, X, Brain, CheckCircle2, ChevronDown, ChevronUp, Play } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { SPECIALIZATIONS } from "@/lib/config";
import { Slider } from "@/components/ui/slider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: "systems" | "security" | "ai";
  demo?: string;
  github?: string;
  link?: string;
  image?: string;
  metrics: string[];
  impact?: string;
}

const projects: Project[] = [
  // 1. Systems Engineering Projects
  {
    title: "Low-Latency Exchange Matching Engine",
    description: "A high-performance financial market infrastructure engine built from scratch in C++, demonstrating systems-level design, real-time data pipelines, and rigorous software engineering.",
    tech: ["C++", "REST API", "WebSockets", "GoogleTest", "CMake"],
    category: "systems",
    github: "https://github.com/Alchemist501/Exchange-Matching-Engine",
    image: "/assets/Projects/MatchingEngine.jpg",
    metrics: [
      "Designed and implemented a modular limit order book engine supporting order matching, trade execution, and real-time market data dissemination",
      "Built REST API and WebSocket communication layers enabling concurrent client integration and live data streaming",
      "Engineered optimized data structures for low-latency, high-throughput transaction handling under heavy load",
      "Achieved full test coverage with GoogleTest: unit tests covering matching logic, edge cases, and system reliability",
      "Maintained structured technical documentation throughout — architecture diagrams, API specs, and test plans"
    ],
    impact: "End-to-end market infrastructure system handling real-time order flow with sub-millisecond processing design, validated through automated test suites"
  },
  {
    title: "Configurable Cache Performance Simulator",
    description: "A systems-level simulation tool for analyzing memory hierarchy behavior across varying cache configurations — bridging computer architecture theory with practical performance engineering.",
    tech: ["C++", "CMake", "Python", "Computer Architecture"],
    category: "systems",
    github: "https://github.com/Alchemist501/Cache-Simulator",
    image: "/assets/Projects/CacheSimulator.jpg",
    metrics: [
      "Built a configurable cache simulator supporting multiple mapping strategies (direct, set-associative, fully associative), replacement policies (LRU, FIFO, Random), and write policies",
      "Designed modular software components to simulate cache behavior, collect hit/miss metrics, and generate comparative analytical reports across workloads",
      "Implemented robust input validation, debugging workflows, and automated performance analysis pipelines",
      "Used Python for data processing and visualization of cache performance metrics across configurations"
    ],
    impact: "Demonstrated deep understanding of memory hierarchy trade-offs with a tool capable of benchmarking real workload patterns against configurable hardware parameters"
  },

  {
    title: "Biosignals — Distributed Disaster Early Warning System",
    description: "A web-based ML system that ingests animal behavioral data from distributed sources and flags anomalies predictive of natural disasters — a full-stack distributed data pipeline.",
    tech: ["Python", "Flask", "JavaScript", "HTML/CSS", "ML Models"],
    category: "systems",
    github: "https://github.com/Alchemist501/Biosignals-DisasterPrediction",
    image: "/assets/Projects/BioSignals.gif",
    demo: "/assets/Projects/BioSignals.mp4",
    metrics: [
      "Built a full-stack web application processing animal behavior data streams through ML models to generate disaster probability predictions",
      "Designed the backend data pipeline: ingestion → preprocessing → model inference → prediction output, deployable as a web service",
      "Collaborated in a 4-member cross-functional team, contributing to both ML model integration and Flask backend",
      "Structured codebase into modular components: data, models, web app, and documentation layers for maintainability"
    ],
    impact: "Team project demonstrating real-world application of distributed data pipelines and ML inference in a public-safety context"
  },

  // 2. Cybersecurity Projects
  {
    title: "AWS IAM Policy Security Analyzer",
    description: "A production-grade static analysis engine for AWS IAM policies — detecting privilege escalation paths, misconfigurations, and compliance gaps with zero cloud dependency.",
    tech: ["Python", "AWS IAM", "Jinja2", "pytest", "Bash", "JSON"],
    category: "security",
    github: "https://github.com/Alchemist501/IAM-Policy-Security-Analyser",
    demo: "/assets/Projects/IAMAnalyser.gif",
    image: "/assets/Projects/IAMAnalyser.gif",
    metrics: [
      "Built an automated engine detecting 15+ privilege escalation vectors including iam:PassRole, iam:CreateAccessKey, wildcard resource/action abuse, MFA gaps, and cross-account trust anomalies",
      "Engineered dual output modes: color-coded CLI terminal with severity-ranked findings, and interactive HTML dashboard with 0–100 security score",
      "Mapped all findings to CIS AWS Foundations Benchmark and NIST CSF controls — producing audit-ready structured JSON exports",
      "Integrated pytest test suite and argparse CLI (--dir, --policy, --format, --output) for CI/CD pipeline compatibility",
      "Fully offline, stateless — scans 500+ policies in under 2 seconds with no cloud API calls"
    ],
    impact: "Automated detection of privilege escalation and misconfiguration patterns across 500+ policies in <2s; CIS + NIST mapped output ready for security audits"
  },
  {
    title: "SubWhisper — Subdomain Recon Automation Tool",
    description: "A Bash-based offensive recon tool chaining industry-standard enumeration tools into a single automated pipeline with structured reporting.",
    tech: ["Bash", "Assetfinder", "Subfinder", "Amass", "HTTPX", "Linux"],
    category: "security",
    github: "https://github.com/Alchemist501/SubWhisper",
    image: "/assets/Projects/SubWhisper.jpg",
    metrics: [
      "Automated subdomain enumeration by chaining Assetfinder, Subfinder, and Amass — aggregating and deduplicating results across tools",
      "Integrated HTTPX for live host detection, filtering discovered subdomains by HTTP status code",
      "Generated structured HTML and text reports for human-readable and machine-parseable recon output",
      "Designed for Linux environments as part of an offensive security recon workflow"
    ],
    impact: "Reduced manual recon time significantly by automating a multi-tool pipeline into a single executable script with structured output"
  },
  {
    title: "Phishing Simulation Campaign",
    description: "An end-to-end phishing awareness simulation replicating real attacker infrastructure to measure and improve organizational security posture.",
    tech: ["Gophish", "MailTrap", "SMTP", "Social Engineering"],
    category: "security",
    link: "https://www.linkedin.com/posts/alchemist501_mailhog-gophish-cybersecurity-activity-7361269385069490176-VV4f?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
    image: "/assets/Projects/GoPhish2.jpg",
    metrics: [
      "Designed and executed a phishing simulation campaign using Gophish, configuring landing pages, email templates, and tracking pixels",
      "Set up SMTP mail delivery pipeline via MailTrap for controlled, sandboxed email delivery",
      "Tracked campaign metrics: open rates, click-through rates, credential submission rates across simulated targets",
      "Produced awareness findings and recommendations based on simulation outcomes"
    ],
    impact: "Demonstrated hands-on red team capability — full attack simulation from infrastructure setup to metrics collection and security awareness reporting"
  },
  {
    title: "SOC Analyst Simulation — LetsDefend.io",
    description: "Hands-on Blue Team training through real-world SIEM alert triage, threat intelligence correlation, and multi-vector incident response.",
    tech: ["SIEM", "Threat Intelligence", "Incident Response", "Malware Analysis"],
    category: "security",
    link: "https://app.letsdefend.io/user/holocrypt404",
    image: "/assets/Projects/SOCSimulation.png",
    metrics: [
      "Triaged SIEM alerts across malware infection, phishing, and RCE incident scenarios in a simulated SOC environment",
      "Correlated threat intelligence feeds with alert indicators (IOCs) to validate and escalate true positives",
      "Conducted end-to-end incident response: detection → analysis → containment → documentation",
      "Investigated malware samples and phishing artifacts, producing structured incident reports for each case"
    ],
    impact: "Completed realistic SOC analyst workflows across multiple attack categories — malware, phishing, and RCE — building practical defensive security muscle memory"
  },

  {
    title: "Cascade-Guard — Propagation-Based Fake News Detection",
    description: "A Graph Attention Network classifier that detects fake news by analyzing how it spreads — not what it says — catching coordinated bot-driven disinformation campaigns that bypass NLP-only detectors.",
    tech: ["Python", "PyTorch Geometric", "BERT", "NetworkX", "matplotlib"],
    category: "security",
    github: "https://github.com/Alchemist501/Cascade-Guard",
    image: "/assets/Projects/CascadeGuard.jpg",
    metrics: [
      "Modeled news propagation as graph structures where nodes are users (encoded with 768-dim BERT behavioral embeddings) and edges represent retweet chains",
      "Implemented Graph Attention Network (GAT) architecture that learns to weight suspicious spreader behavior — identifying bot-driven bursty cascades vs. organic diffusion",
      "Trained and evaluated on UPFD dataset (PolitiFact + GossipCop, 1.2GB) achieving ~89.5% test accuracy",
      "Built visualization suite generating propagation tree comparisons (real vs. fake) and training metric plots for interpretability"
    ],
    impact: "~89.5% classification accuracy on UPFD benchmark; graph-based approach catches coordinated inauthentic behavior invisible to content-only classifiers"
  },

  // 3. AI/ML Engineering Projects
  {
    title: "Cascade-Guard — Graph Neural Network for Disinformation Detection",
    description: "A state-of-the-art fake news classifier using Graph Attention Networks and BERT embeddings to analyze social media propagation behavior — going beyond text to model coordinated inauthentic activity.",
    tech: ["Python", "PyTorch Geometric", "BERT", "GAT", "NetworkX", "matplotlib"],
    category: "ai",
    github: "https://github.com/Alchemist501/Cascade-Guard",
    image: "/assets/Projects/CascadeGuard.jpg",
    metrics: [
      "Designed a graph-based ML pipeline where each news propagation tree is modeled as a graph: user nodes encoded with 768-dimensional BERT embeddings of historical tweet behavior, edges representing retweet relationships",
      "Implemented Graph Attention Network (GAT) with learned attention weights to identify which spreader profiles most strongly indicate synthetic amplification",
      "Fine-tuned model on UPFD benchmark dataset (PolitiFact + GossipCop) — achieving ~89.5% test accuracy",
      "Built end-to-end pipeline: graph construction → BERT embedding generation → GAT training → binary classification (real/fake)",
      "Produced visualization suite: propagation tree NetworkX plots (real vs. fake shape comparison) + training/validation loss and accuracy curves"
    ],
    impact: "~89.5% test accuracy; demonstrates graph-based behavioral modeling as a superior alternative to purely content-based fake news classifiers"
  },
  {
    title: "Aggrow — AI-Powered Agricultural Decision System",
    description: "A full-stack AI assistant helping farmers make data-driven decisions on crop selection, fertilization, and disease management — with multilingual support for real-world accessibility.",
    tech: ["Python", "Flask", "React.js", "scikit-learn", "PyTorch", "Node.js"],
    category: "ai",
    github: "https://github.com/Alchemist501/AGGROW",
    image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXJnemNpYjc0ZmM0dmk5NTJxMGlqYnZ6azdkNGg1ajhzcmc2cWoyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kDMUEiovRiZb1E4wku/giphy.gif",
    metrics: [
      "Built crop recommendation engine using ML models trained on soil composition and environmental parameters to suggest optimal crops per land profile",
      "Integrated computer vision pipeline for plant disease detection — users upload images and receive instant health diagnoses with treatment recommendations",
      "Developed fertilizer recommendation module providing soil-specific fertilization guidance based on crop type and deficiency patterns",
      "Implemented geolocation API integration for location-aware recommendations tailored to regional climate and soil data",
      "Added multilingual support (Hindi, Malayalam) to maximize accessibility for non-English-speaking farming communities",
      "Contributed to full-stack development across Flask REST API backend and React.js frontend"
    ],
    impact: "End-to-end AI agricultural assistant combining CV disease detection, ML crop recommendation, and geolocation — deployed with multilingual support for real farmer accessibility"
  },

  {
    title: "Biosignals — ML-Driven Disaster Prediction from Animal Behavior",
    description: "A web-based early warning system applying anomaly detection to animal behavioral data to predict natural disasters — translating bioacoustic and behavioral signals into actionable alerts.",
    tech: ["Python", "Flask", "scikit-learn", "JavaScript", "HTML/CSS"],
    category: "ai",
    github: "https://github.com/Alchemist501/Biosignals-DisasterPrediction",
    image: "/assets/Projects/BioSignals.gif",
    demo: "/assets/Projects/BioSignals.mp4",
    metrics: [
      "Built ML pipeline to detect anomalies in animal behavioral datasets predictive of seismic and environmental disaster precursors",
      "Designed full-stack web application: Flask backend serving model inference via REST endpoints, JavaScript frontend for data input and prediction display",
      "Contributed to a 4-member cross-functional team — handling ML model integration and backend API development",
      "Structured codebase into clean modular layers: data pipeline, model training scripts, web app, and documentation"
    ],
    impact: "Team research project translating animal behavioral signals into disaster probability predictions via a deployable web interface"
  },
  {
    title: "Deadline Extractor Agent — LLM-Powered Workflow Automation",
    description: "An end-to-end AI agent that reads emails, understands deadlines using Google Gemini, and autonomously creates calendar events — zero human intervention required.",
    tech: ["n8n", "Google Gemini API", "JavaScript", "Gmail API", "Google Calendar API"],
    category: "ai",
    link: "https://www.linkedin.com/posts/alchemist501_n8n-googlegemini-ai-activity-7382131709493796865-dmqv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
    image: "/assets/Projects/Deadline.jpg",
    metrics: [
      "Designed a three-stage autonomous pipeline: Gmail inbox monitoring → Gemini LLM deadline extraction → Google Calendar event creation with automatic email tagging",
      "Engineered prompt engineering layer with custom JavaScript validation to reliably extract and normalize date/time information from unstructured email text",
      "Built modular, platform-agnostic architecture — core extraction logic decoupled from Gmail/Calendar connectors for easy adaptation to other email/calendar platforms",
      "Eliminated manual deadline tracking for placement-related emails — fully automated from trigger to calendar entry"
    ],
    impact: "Zero missed placement deadlines; fully autonomous email-to-calendar pipeline using LLM reasoning on unstructured text — extensible to any inbox/calendar platform"
  }
];
const roleStyles: Record<string, {
  accentText: string;
  accentBg: string;
  accentBorder: string;
  btnBg: string;
  btnText: string;
  checkBg: string;
  glow: string;
  titleGlow: string;
}> = {
  systems: {
    accentText: "text-cyan-400",
    accentBg: "bg-cyan-950/30",
    accentBorder: "border-cyan-800/40",
    btnBg: "bg-cyan-950/40 hover:bg-cyan-500 hover:text-slate-950 border-cyan-800/60",
    btnText: "text-cyan-400",
    checkBg: "bg-cyan-950/30 text-cyan-400",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.12)] hover:shadow-[0_0_35px_rgba(34,211,238,0.22)] border-cyan-500/30 hover:border-cyan-500/50",
    titleGlow: "text-cyan-400"
  },
  cybersecurity: {
    accentText: "text-rose-500",
    accentBg: "bg-rose-950/30",
    accentBorder: "border-rose-800/40",
    btnBg: "bg-rose-950/40 hover:bg-rose-500 hover:text-slate-950 border-rose-800/60",
    btnText: "text-rose-500",
    checkBg: "bg-rose-950/30 text-rose-500",
    glow: "shadow-[0_0_30px_rgba(244,63,94,0.12)] hover:shadow-[0_0_35px_rgba(244,63,94,0.22)] border-rose-500/30 hover:border-rose-500/50",
    titleGlow: "text-rose-500"
  },
  ai: {
    accentText: "text-violet-400",
    accentBg: "bg-violet-950/30",
    accentBorder: "border-violet-800/40",
    btnBg: "bg-violet-950/40 hover:bg-violet-500 hover:text-slate-950 border-violet-800/60",
    btnText: "text-violet-400",
    checkBg: "bg-violet-950/30 text-violet-400",
    glow: "shadow-[0_0_30px_rgba(139,92,246,0.12)] hover:shadow-[0_0_35px_rgba(139,92,246,0.22)] border-violet-500/30 hover:border-violet-500/50",
    titleGlow: "text-violet-400"
  }
};

export const ProjectFilter = ({ theme = "dark", onInteraction, layout = "grid" }: { theme?: "dark" | "light", onInteraction?: () => void, layout?: "grid" | "carousel" }) => {
  const { role } = useRole();
  const styles = roleStyles[role] || roleStyles.systems;
  const [isCatalogExpanded, setIsCatalogExpanded] = useState(false);
  const [focusedProject, setFocusedProject] = useState<number | null>(null);
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<Project | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);
  const [activeDemoVideo, setActiveDemoVideo] = useState<string | null>(null);

  // Close catalog when specialization focus changes
  useEffect(() => {
    setIsCatalogExpanded(false);
  }, [role]);

  // Load identity configurations from config registry
  const config = SPECIALIZATIONS[role];

  // Scope project visibility to the active role track
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (role === "systems") return p.category === "systems";
      if (role === "cybersecurity") return p.category === "security";
      return p.category === "ai";
    });
  }, [role]);

  // Flagship Featured Project mapping
  const featuredProject = useMemo(() => {
    return filteredProjects.find(p => p.title === config.featuredProjectTitle) || filteredProjects[0];
  }, [role, config, filteredProjects]);

  // 5 Major Projects mapping
  const majorProjectsList = useMemo(() => {
    return filteredProjects.filter(p => config.majorProjectTitles.includes(p.title));
  }, [role, config, filteredProjects]);

  // Remaining Projects for the Collapsible view
  const remainingProjectsList = useMemo(() => {
    return filteredProjects.filter(p => p.title !== featuredProject.title && !majorProjectsList.some(m => m.title === p.title));
  }, [featuredProject, majorProjectsList, filteredProjects]);

  const handleSliderChange = (value: number[]) => {
    if (!api) return;
    const targetIndex = Math.round((value[0] / 100) * (majorProjectsList.length - 1));
    api.scrollTo(targetIndex);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    const onScroll = (api: CarouselApi) => {
      if (!api) return;
      try {
        const progress = Math.max(0, Math.min(1, api.scrollProgress()));
        setScrollProgress(progress * 100);
      } catch (error) {
        console.error('Carousel scroll error:', error);
      }
    };

    const checkScrollability = (api: CarouselApi) => {
      if (!api) return;
      try {
        setHasScroll(api.canScrollNext() || api.canScrollPrev());
      } catch (error) {
        console.error('Carousel scrollability check error:', error);
      }
    };

    api.on("scroll", onScroll);
    api.on("reInit", onScroll);
    api.on("reInit", checkScrollability);
    api.on("select", checkScrollability);

    // Initial check
    checkScrollability(api);

    return () => {
      try {
        api.off("scroll", onScroll);
        api.off("reInit", onScroll);
        api.off("reInit", checkScrollability);
        api.off("select", checkScrollability);
      } catch (error) {
        // Ignore cleanup errors during unmount
      }
    };
  }, [api]);

  const isDark = theme === "dark";

  const handleProjectClick = (e: React.MouseEvent, proj: Project) => {
    e.stopPropagation();
    setSelectedProjectForDetails(proj);
    onInteraction?.();
  };

  return (
    <div className="space-y-12">
      {/* 1. Flagship Featured Project Section */}
      <motion.div
        key={`featured-${featuredProject.title}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`rounded-2xl border-2 p-6 md:p-8 transition-all duration-300 group ${
          isDark
            ? `bg-slate-900/60 backdrop-blur-md ${styles.glow}`
            : "glass-card border-gray-300 shadow-md hover:shadow-lg"
        }`}
      >
        {/* Centered Flagship Title Header */}
        <div className="text-center mb-8 border-b border-slate-800/60 pb-6 w-full">
          <span className={`text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest block mb-2 ${isDark ? styles.accentText : "text-gray-500"}`}>
            ★ FLAGSHIP FEATURED PROJECT
          </span>
          <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            {featuredProject.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details */}
          <div className="md:col-span-6 flex flex-col justify-between h-full order-2 md:order-1">
            <div>
              <p className={`text-sm md:text-base leading-relaxed mb-6 ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                {featuredProject.description}
              </p>

              {/* Metrics */}
              <div className="mb-6 space-y-3">
                {featuredProject.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs md:text-sm">
                    <div className={`p-1 rounded-full shrink-0 ${isDark ? styles.checkBg : "bg-gray-150 text-gray-900"}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className={isDark ? "text-slate-200" : "text-gray-700 font-medium"}>{metric}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs font-mono rounded-full font-bold border transition-all duration-300 ${
                      isDark
                        ? `bg-slate-950/60 ${styles.accentBorder} ${styles.accentText}`
                        : "bg-gray-50 text-gray-700 border-gray-250 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-auto pt-4">
              {featuredProject.github && (
                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 hover:scale-[1.02] border ${
                    isDark
                      ? styles.btnBg
                      : "bg-gray-950 text-white hover:bg-gray-800"
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span>[View GitHub]</span>
                </a>
              )}
              {featuredProject.link && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 hover:scale-[1.02] border ${
                    isDark
                      ? styles.btnBg
                      : "bg-gray-950 text-white hover:bg-gray-800"
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>[Read Case Study]</span>
                </a>
              )}
              {featuredProject.demo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDemoVideo(featuredProject.demo || null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 hover:scale-[1.02] border ${
                    isDark
                      ? styles.btnBg
                      : "bg-gray-950 text-white hover:bg-gray-800"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>[Watch Demo]</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Image and Impact */}
          <div className="md:col-span-6 flex flex-col gap-6 order-1 md:order-2">
            {/* Project Cover Image */}
            <div className={`aspect-video w-full rounded-2xl overflow-hidden border transition-all duration-500 bg-slate-950/60 backdrop-blur-md flex items-center justify-center relative group-hover:scale-[1.02] ${
              isDark ? "border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.3)]" : "border-gray-200 shadow-md"
            }`}>
              {featuredProject.image ? (
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`text-6xl ${featuredProject.image ? 'hidden' : ''}`}>
                {featuredProject.category === "security" ? "🔒" : featuredProject.category === "systems" ? "⚡" : "🤖"}
              </div>
            </div>

            {/* Impact Under Photo Banner */}
            {featuredProject.impact && (
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? `bg-slate-950/40 ${styles.accentBorder}`
                  : "bg-gray-50 border-gray-250 text-gray-900"
              }`}>
                <strong className={`font-mono text-[10px] uppercase tracking-widest block mb-1 ${isDark ? styles.accentText : "text-gray-500"}`}>Impact:</strong>
                <p className="text-xs md:text-sm font-sans font-medium leading-relaxed text-slate-200">{featuredProject.impact}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. Major Projects Grid Header */}
      <div className={`border-t pt-10 ${isDark ? "border-slate-800" : "border-primary/20"}`}>
        <h3 className={`text-xl font-bold font-mono tracking-widest mb-6 ${isDark ? styles.accentText : "text-gray-500 uppercase"}`}>
          ⭐ MAJOR PROJECTS
        </h3>
      </div>

      {/* 3. Major Projects Display */}
      {layout === "carousel" ? (
        <div className="w-full group relative pb-6">
          <Carousel
            setApi={setApi}
            opts={{ loop: false, align: "center", dragFree: true, containScroll: "trimSnaps" }}
            className="w-full mx-auto cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="-ml-4">
              {majorProjectsList.map((project, i) => (
                <CarouselItem key={project.title} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={(e) => handleProjectClick(e, project)}
                    className={`border rounded-xl overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 ${
                      isDark 
                        ? `bg-slate-900/60 border-slate-800 hover:border-slate-700 ${styles.glow}` 
                        : "glass-card border-gray-250 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <div className={`aspect-video w-full flex items-center justify-center ${isDark ? "bg-slate-950/40" : "bg-gray-100"}`}>
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-4xl">
                          {project.category === "security" ? "🔒" : project.category === "systems" ? "⚡" : "🤖"}
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className={`text-base md:text-lg font-bold mb-1 ${isDark ? styles.accentText : "text-gray-900"}`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${isDark ? "text-slate-300" : "text-gray-600 font-sans"}`}>
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Interactive Scroll Bar */}
          {hasScroll && (
            <div className="absolute -bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full max-w-3xl px-4">
                <Slider
                  defaultValue={[0]}
                  value={[scrollProgress]}
                  max={100}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Grid Layout (Default/Dark Mode) */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {majorProjectsList.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => handleProjectClick(e, project)}
              className={`border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                isDark 
                  ? `bg-slate-900/60 backdrop-blur-md hover:bg-slate-900/80 border-slate-800 hover:border-slate-700 ${styles.glow}` 
                  : "glass-card border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`p-6 flex flex-col h-full ${isDark ? "hover:bg-slate-850/20" : "hover:bg-gray-50"}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-base font-bold font-mono line-clamp-1 ${isDark ? styles.accentText : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  <ExternalLink className={`w-4 h-4 ${isDark ? `${styles.accentText} opacity-85` : "text-gray-400"}`} />
                </div>

                <p className={`text-xs mb-4 line-clamp-3 flex-grow ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-colors ${
                        isDark
                          ? `bg-slate-950/60 ${styles.accentBorder} ${styles.accentText}`
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`px-1 py-0.5 text-[10px] font-mono rounded ${isDark ? `${styles.accentText} opacity-85` : "text-gray-500"}`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 4. Collapsible "View All Projects" Section */}
      {remainingProjectsList.length > 0 && (
        <div className="flex flex-col items-center pt-6 border-t border-dashed border-primary/10">
          <button
            onClick={() => setIsCatalogExpanded(!isCatalogExpanded)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-mono text-sm transition-all border ${
              isDark
                ? "bg-black hover:bg-primary/10 text-primary border-primary/45 shadow-[0_0_15px_rgba(0,255,65,0.05)]"
                : "bg-white hover:bg-gray-50 text-gray-800 border-gray-300 shadow-sm"
            }`}
          >
            <span>{isCatalogExpanded ? "COLLAPSE PROJECT CATALOG" : "VIEW ALL PROJECTS CATALOG"}</span>
            {isCatalogExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {isCatalogExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full overflow-hidden mt-8"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                  {remainingProjectsList.map((project, i) => (
                    <motion.div
                      key={`remaining-${project.title}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={(e) => handleProjectClick(e, project)}
                      className={`rounded-lg overflow-hidden cursor-pointer transition-all ${
                        isDark
                          ? `bg-slate-900/60 border-slate-800 hover:border-slate-700 ${styles.glow}`
                          : "bg-white border border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`p-5 flex flex-col h-full ${isDark ? "hover:bg-slate-850/20" : "hover:bg-gray-50"}`}>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className={`text-sm font-bold font-mono line-clamp-1 ${isDark ? styles.accentText : "text-gray-900"}`}>
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-mono opacity-60 uppercase">{project.category}</span>
                        </div>
                        <p className={`text-xs line-clamp-2 mb-3 ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className={`px-1.5 py-0.5 text-[9px] font-mono rounded border transition-colors ${
                                isDark ? `bg-slate-950/60 ${styles.accentBorder} ${styles.accentText}` : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProjectForDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
            onClick={() => setSelectedProjectForDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative border-2 ${
                isDark
                  ? `bg-slate-900 border-slate-700 shadow-2xl text-white`
                  : "bg-white border-2 border-gray-900 shadow-2xl text-gray-900"
              }`}
            >
              <button
                onClick={() => setSelectedProjectForDetails(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-gray-100 text-gray-900"
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Project Image/Video */}
              {selectedProjectForDetails.image && (
                <div className={`mb-6 rounded-lg overflow-hidden border ${isDark ? "border-slate-800" : "border-gray-200"}`}>
                  <img
                    src={selectedProjectForDetails.image}
                    alt={selectedProjectForDetails.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <h2 className={`text-2xl md:text-3xl font-bold mb-4 font-mono ${isDark ? styles.accentText : "text-gray-900"}`}>
                {selectedProjectForDetails.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProjectForDetails.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-mono border ${
                      isDark
                        ? `bg-slate-950/60 ${styles.accentBorder} ${styles.accentText}`
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Quantitative Metrics */}
              {selectedProjectForDetails.metrics && (
                <div className={`mb-6 p-4 rounded-lg border ${
                  isDark ? `bg-slate-950/40 border-slate-800 text-slate-200` : "bg-gray-50 border-gray-200"
                }`}>
                  <h4 className={`text-sm font-bold mb-3 uppercase tracking-wider ${isDark ? "text-slate-300" : "text-gray-700"}`}>
                    Project Key Performance Indicators
                  </h4>
                  <div className="space-y-2">
                    {selectedProjectForDetails.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs md:text-sm">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${isDark ? styles.accentText : "text-gray-700"}`} />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className={`mb-6 leading-relaxed ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                {selectedProjectForDetails.description}
              </p>

              {selectedProjectForDetails.impact && (
                <div className={`mb-6 p-4 rounded-xl border ${
                  isDark 
                    ? `bg-slate-950/40 ${styles.accentBorder}`
                    : "bg-gray-50 border-gray-250 text-gray-900"
                }`}>
                  <strong className={`font-mono text-[10px] uppercase tracking-widest block mb-1 ${isDark ? styles.accentText : "text-gray-500"}`}>Impact:</strong>
                  <p className="text-xs md:text-sm font-sans font-medium leading-relaxed text-slate-200">{selectedProjectForDetails.impact}</p>
                </div>
              )}

              <div className="flex gap-4">
                {selectedProjectForDetails.github && (
                  <a
                    href={selectedProjectForDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors border ${
                      isDark
                        ? styles.btnBg
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                )}
                {selectedProjectForDetails.link && (
                  <a
                    href={selectedProjectForDetails.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors border ${
                      isDark
                        ? styles.btnBg
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Case Study</span>
                  </a>
                )}
                {selectedProjectForDetails.demo && (
                  <button
                    onClick={() => {
                      setActiveDemoVideo(selectedProjectForDetails.demo || null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors border ${
                      isDark
                        ? styles.btnBg
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Video Demo Modal Overlay */}
      <AnimatePresence>
        {activeDemoVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[300] flex items-center justify-center p-4"
            onClick={() => setActiveDemoVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveDemoVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={activeDemoVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
