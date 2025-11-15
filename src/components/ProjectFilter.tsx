import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Code, ExternalLink, Github, X } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  category: "security" | "other";
  demo?: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "THE MARAUDER'S MAP",
    description: "Network Reconnaissance and Anomaly Detector - Python-based security application for proactive defense and monitoring with packet sniffing using Scapy, SQLite storage, and Flask web interface.",
    tech: ["Python", "Scapy", "Flask", "SQLite"],
    category: "security",
    github: "https://github.com/siyapp",
  },
  {
    title: "LETSDEFEND.IO - SOC ANALYST SIMULATION",
    description: "Simulated core SOC Analyst workflows focusing on rapid incident response, detection, and analysis using SIEM, Threat Intelligence, and Incident Response Playbooks for complex cases including malware and RCE exploitations.",
    tech: ["SIEM", "Threat Intelligence", "Incident Response"],
    category: "security",
    demo: "https://letsdefend.io",
  },
  {
    title: "PHISHING SIMULATION CAMPAIGN",
    description: "Security awareness campaign using GoPhish deployed on Railway with Mailtrap integration. Ethical hacking to measure human risk, create custom phishing content, and track user interaction via live dashboard.",
    tech: ["GoPhish", "Railway", "Mailtrap", "Social Engineering"],
    category: "security",
    github: "https://github.com/siyapp",
  },
  {
    title: "FL-DP FRAMEWORK",
    description: "Secure Collaborative Machine Learning - Privacy and Security Research framework integrating Federated Learning (FL) and Differential Privacy (DP) to protect sensitive data across multi-client environments.",
    tech: ["Python", "TensorFlow", "Flower", "PySyft"],
    category: "security",
    github: "https://github.com/siyapp",
  },
  {
    title: "SUBWHISPER",
    description: "Automated reconnaissance utility for bug bounty hunting. Integrates popular asset discovery tools (Subfinder, Assetfinder) into a single efficient workflow, improving speed and comprehensiveness of initial target analysis.",
    tech: ["Python", "Subfinder", "Assetfinder", "Automation"],
    category: "security",
    github: "https://github.com/siyapp",
  },
  {
    title: "AGGROW",
    description: "AI-driven web application for agricultural insights using ResNet (CNN) model with OpenCV and Scikit-learn. Built on Python/Flask stack for crop disease detection and farming recommendations.",
    tech: ["Python", "Flask", "ResNet", "OpenCV", "Scikit-learn"],
    category: "other",
    github: "https://github.com/siyapp",
  },
  {
    title: "BIOSIGNALS",
    description: "Flask-based system using OpenCV to analyze animal behavior in real-time. Detects unusual patterns and triggers alerts for disaster prediction, demonstrating proficiency in Python, Flask, and computer vision.",
    tech: ["Python", "Flask", "OpenCV", "Computer Vision"],
    category: "other",
    github: "https://github.com/siyapp",
  },
  {
    title: "DEADLINE EXTRACTOR AI AGENT",
    description: "Intelligent agent for automating task management by processing email content. Uses NLP to extract deadline information and interfaces with calendar/alarm systems for automated reminders.",
    tech: ["Python", "NLP", "NLTK", "SpaCy", "Gmail API"],
    category: "other",
    github: "https://github.com/siyapp",
  },
];

export const ProjectFilter = ({ theme = "dark" }: { theme?: "dark" | "light" }) => {
  const [filter, setFilter] = useState<"all" | "security" | "other">("all");
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [focusedProject, setFocusedProject] = useState<number | null>(null);
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<Project | null>(null);

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  const isDark = theme === "dark";

  const handleProjectClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFocusedProject(index);
  };

  return (
    <div className="space-y-8" onClick={() => setFocusedProject(null)}>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter("all")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            filter === "all"
              ? isDark
                ? "bg-primary text-background border-2 border-primary"
                : "bg-gray-900 text-white"
              : isDark
              ? "bg-background border-2 border-primary text-primary hover:bg-primary/10"
              : "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
          }`}
        >
          All Projects
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter("security")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            filter === "security"
              ? isDark
                ? "bg-primary text-background border-2 border-primary"
                : "bg-gray-900 text-white"
              : isDark
              ? "bg-background border-2 border-primary text-primary hover:bg-primary/10"
              : "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Shield className="w-5 h-5" />
          Security Related
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilter("other")}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            filter === "other"
              ? isDark
                ? "bg-primary text-background border-2 border-primary"
                : "bg-gray-900 text-white"
              : isDark
              ? "bg-background border-2 border-primary text-primary hover:bg-primary/10"
              : "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Code className="w-5 h-5" />
          Others
        </motion.button>
      </div>

      {/* Projects Grid - Compact Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            onClick={(e) => {
              handleProjectClick(e, i);
              setSelectedProjectForDetails(project);
            }}
            className={`rounded-lg overflow-hidden cursor-pointer ${
              isDark
                ? "bg-card border border-primary/30 hover:border-primary"
                : "bg-white border-2 border-gray-200 hover:border-gray-400"
            } transition-all ${
              focusedProject === i ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
            }`}
          >
            {/* Project Header - Always Visible */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedProject(expandedProject === i ? null : i);
              }}
              className={`w-full px-6 py-4 flex items-center justify-between text-left transition-all ${
                isDark ? "hover:bg-primary/5" : "hover:bg-gray-50"
              }`}
            >
              <h3 className={`text-lg font-bold font-mono ${isDark ? "text-primary glow-green" : "text-gray-900"}`}>
                {project.title}
              </h3>
              <span className={`text-2xl font-mono ${isDark ? "text-primary" : "text-gray-900"}`}>
                {expandedProject === i ? "−" : "+"}
              </span>
            </button>

            {/* Project Details - Expandable */}
            {expandedProject === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`px-6 pb-6 ${isDark ? "border-t border-primary/20" : "border-t border-gray-200"}`}
              >
                <p className={`mb-4 mt-4 text-sm leading-relaxed ${isDark ? "text-muted-foreground" : "text-gray-600"}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs font-mono rounded ${
                        isDark
                          ? "bg-primary/10 border border-primary/30 text-primary"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                        isDark
                          ? "bg-primary text-primary-foreground hover:glow-green"
                          : "bg-gray-900 text-white hover:bg-gray-700"
                      }`}
                    >
                      View Demo →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded font-mono text-sm transition-all ${
                        isDark
                          ? "border border-primary text-primary hover:bg-primary/10"
                          : "border-2 border-gray-900 text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProjectForDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
            onClick={() => setSelectedProjectForDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative ${
                isDark 
                  ? "bg-card border-2 border-primary shadow-[0_0_50px_rgba(0,255,65,0.5)]"
                  : "bg-white border-2 border-gray-900 shadow-2xl"
              }`}
            >
              <button
                onClick={() => setSelectedProjectForDetails(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDark 
                    ? "hover:bg-primary/20 text-primary"
                    : "hover:bg-gray-100 text-gray-900"
                }`}
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className={`text-3xl font-bold mb-4 font-mono ${
                isDark ? "text-primary glow-green" : "text-gray-900"
              }`}>
                {selectedProjectForDetails.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProjectForDetails.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-mono ${
                      isDark
                        ? "bg-primary/20 text-primary border border-primary/50"
                        : "bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className={`mb-6 leading-relaxed ${
                isDark ? "text-muted-foreground" : "text-gray-600"
              }`}>
                {selectedProjectForDetails.description}
              </p>

              <div className="flex gap-4">
                {selectedProjectForDetails.github && (
                  <a
                    href={selectedProjectForDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors ${
                      isDark
                        ? "bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-background"
                        : "bg-gray-900 text-white hover:bg-gray-700"
                    }`}
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                )}
                {selectedProjectForDetails.demo && (
                  <a
                    href={selectedProjectForDetails.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors ${
                      isDark
                        ? "bg-accent/20 text-accent border border-accent/50 hover:bg-accent hover:text-background"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
