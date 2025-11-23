import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Shield, Code, ExternalLink, Github, X } from "lucide-react";
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
  category: "security" | "other";
  demo?: string;
  github?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "THE MARAUDER'S MAP",
    description: "Network Reconnaissance and Anomaly Detector - Python-based security application for proactive defense and monitoring with packet sniffing using Scapy, SQLite storage, and Flask web interface.",
    tech: ["Python", "Scapy", "Flask", "SQLite"],
    category: "security",
    github: "https://github.com/siyapp",
    image: "/assets/MarauderMap.png",
  },
  {
    title: "LETSDEFEND.IO - SOC ANALYST SIMULATION",
    description: "Simulated core SOC Analyst workflows focusing on rapid incident response, detection, and analysis using SIEM, Threat Intelligence, and Incident Response Playbooks for complex cases including malware and RCE exploitations.",
    tech: ["SIEM", "Threat Intelligence", "Incident Response"],
    category: "security",
    demo: "https://letsdefend.io",
    image: "/assets/SOCSimulation.png",
  },
  {
    title: "PHISHING SIMULATION CAMPAIGN",
    description: "Security awareness campaign using GoPhish deployed on Railway with Mailtrap integration. Ethical hacking to measure human risk, create custom phishing content, and track user interaction via live dashboard.",
    tech: ["GoPhish", "Railway", "Mailtrap", "Social Engineering"],
    category: "security",
    github: "https://github.com/siyapp",
    image: "/assets/GoPhish2.jpg",
  },
  {
    title: "FL-DP FRAMEWORK",
    description: "Secure Collaborative Machine Learning - Privacy and Security Research framework integrating Federated Learning (FL) and Differential Privacy (DP) to protect sensitive data across multi-client environments.",
    tech: ["Python", "TensorFlow", "Flower", "PySyft"],
    category: "security",
    // github: "https://github.com/siyapp",
    image: "/assets/FL-DP.png"
  },
  {
    title: "SUBWHISPER",
    description: "Automated reconnaissance utility for bug bounty hunting. Integrates popular asset discovery tools (Subfinder, Assetfinder) into a single efficient workflow, improving speed and comprehensiveness of initial target analysis.",
    tech: ["Python", "Subfinder", "Assetfinder", "Automation"],
    category: "security",
    github: "https://github.com/siyapp",
    image: "/assets/SubWhisper.jpg"
  },
  {
    title: "AGGROW",
    description: "AI-driven web application for agricultural insights using ResNet (CNN) model with OpenCV and Scikit-learn. Built on Python/Flask stack for crop disease detection and farming recommendations.",
    tech: ["Python", "Flask", "ResNet", "OpenCV", "Scikit-learn"],
    category: "other",
    github: "https://github.com/siyapp",
    image: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXJnemNpYjc0ZmM0dmk5NTJxMGlqYnZ6azdkNGg1ajhzcmc2cWoyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kDMUEiovRiZb1E4wku/giphy.gif",
  },
  {
    title: "BIOSIGNALS",
    description: "Flask-based system using OpenCV to analyze animal behavior in real-time. Detects unusual patterns and triggers alerts for disaster prediction, demonstrating proficiency in Python, Flask, and computer vision.",
    tech: ["Python", "Flask", "OpenCV", "Computer Vision"],
    category: "other",
    github: "https://github.com/siyapp",
    image: "/assets/BioSignals.gif",
    demo: "/assets/BioSignals.mp4"
  },
  {
    title: "DEADLINE EXTRACTOR AI AGENT",
    description: "Intelligent agent for automating task management by processing email content. Uses NLP to extract deadline information and interfaces with calendar/alarm systems for automated reminders.",
    tech: ["Python", "NLP", "NLTK", "SpaCy", "Gmail API"],
    category: "other",
    github: "https://github.com/siyapp",
    image: "/assets/Deadline.jpg"
  },
];

export const ProjectFilter = ({ theme = "dark", onInteraction, layout = "grid" }: { theme?: "dark" | "light", onInteraction?: () => void, layout?: "grid" | "carousel" }) => {
  const [filter, setFilter] = useState<"all" | "security" | "other">("all");
  const [focusedProject, setFocusedProject] = useState<number | null>(null);
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<Project | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScroll, setHasScroll] = useState(false);

  const filteredProjects = useMemo(() => {
    return filter === "all"
      ? projects
      : projects.filter(p => p.category === filter);
  }, [filter]);

  const handleSliderChange = (value: number[]) => {
    if (!api) return;
    const targetIndex = Math.round((value[0] / 100) * (filteredProjects.length - 1));
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

  const handleProjectClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setFocusedProject(index);
    onInteraction?.();
  };

  return (
    <div className="space-y-8" onClick={() => setFocusedProject(null)}>
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-6">
        {layout === "carousel" ? (
          // Light Mode / Carousel Filter Style
          <>
            <button
              onClick={() => setFilter("all")}
              className="flex items-center gap-2 group transition-all"
            >
              <div className={`w-3 h-3 rounded-full transition-colors ${filter === "all" ? "bg-gray-900" : "bg-gray-300 group-hover:bg-gray-400"}`} />
              <span className={`text-base font-medium ${filter === "all" ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}>
                All
              </span>
            </button>
            <button
              onClick={() => setFilter("security")}
              className="flex items-center gap-2 group transition-all"
            >
              <div className={`w-3 h-3 rounded-full transition-colors ${filter === "security" ? "bg-gray-900" : "bg-gray-300 group-hover:bg-gray-400"}`} />
              <span className={`text-base font-medium ${filter === "security" ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}>
                Security
              </span>
            </button>
            <button
              onClick={() => setFilter("other")}
              className="flex items-center gap-2 group transition-all"
            >
              <div className={`w-3 h-3 rounded-full transition-colors ${filter === "other" ? "bg-gray-900" : "bg-gray-300 group-hover:bg-gray-400"}`} />
              <span className={`text-base font-medium ${filter === "other" ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}>
                Others
              </span>
            </button>
          </>
        ) : (
          // Dark Mode / Grid Filter Style
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${filter === "all"
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
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${filter === "security"
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
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${filter === "other"
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
          </>
        )}
      </div>

      {/* Projects Display */}
      {layout === "carousel" ? (
        <div className="w-full group relative pb-12">
          <Carousel
            setApi={setApi}
            opts={{ loop: false, align: "center", dragFree: true, containScroll: "trimSnaps" }}
            className="w-full mx-auto cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="-ml-4">
              {filteredProjects.map((project, i) => (
                <CarouselItem key={project.title} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={(e) => {
                      handleProjectClick(e, i);
                      setSelectedProjectForDetails(project);
                    }}
                    className={`rounded-xl overflow-hidden cursor-grab active:cursor-grabbing h-full flex flex-col ${isDark
                      ? "bg-card border border-primary/30 hover:border-primary"
                      : "bg-white border border-gray-200 hover:shadow-xl"
                      } transition-all`}
                  >
                    {/* Photo Area */}
                    <div className={`aspect-video w-full flex items-center justify-center ${isDark ? "bg-primary/10" : "bg-gray-100"
                      }`}>
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-4xl">
                          {project.category === "security" ? "🔒" : "💡"}
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className={`text-base md:text-lg font-bold font-playfair mb-1 ${isDark ? "text-primary glow-green" : "text-gray-900"
                        }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${isDark ? "text-muted-foreground" : "text-gray-600 font-lora italic"
                        }`}>
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
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
              className={`rounded-lg overflow-hidden cursor-pointer ${isDark
                ? "bg-card border border-primary/30 hover:border-primary"
                : "bg-white border-2 border-gray-200 hover:border-gray-400"
                } transition-all ${focusedProject === i ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                }`}
            >
              {/* Project Card Content */}
              <div className={`p-6 flex flex-col h-full ${isDark ? "hover:bg-primary/5" : "hover:bg-gray-50"}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-lg font-bold font-mono ${isDark ? "text-primary glow-green" : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  <ExternalLink className={`w-5 h-5 ${isDark ? "text-primary/50" : "text-gray-400"}`} />
                </div>

                <p className={`text-sm mb-4 line-clamp-2 flex-grow ${isDark ? "text-muted-foreground" : "text-gray-600"}`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs font-mono rounded ${isDark
                        ? "bg-primary/10 border border-primary/30 text-primary"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className={`px-2 py-1 text-xs font-mono rounded ${isDark ? "text-primary/70" : "text-gray-500"}`}>
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
              className={`rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative ${isDark
                ? "bg-card border-2 border-primary shadow-[0_0_50px_rgba(0,255,65,0.5)]"
                : "bg-white border-2 border-gray-900 shadow-2xl"
                }`}
            >
              <button
                onClick={() => setSelectedProjectForDetails(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDark
                  ? "hover:bg-primary/20 text-primary"
                  : "hover:bg-gray-100 text-gray-900"
                  }`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Project Image/Video */}
              {selectedProjectForDetails.image && (
                <div className={`mb-6 rounded-lg overflow-hidden ${isDark ? "border border-primary/30" : "border border-gray-200"}`}>
                  <img
                    src={selectedProjectForDetails.image}
                    alt={selectedProjectForDetails.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <h2 className={`text-3xl font-bold mb-4 font-mono ${isDark ? "text-primary glow-green" : "text-gray-900"
                }`}>
                {selectedProjectForDetails.title}
              </h2>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProjectForDetails.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-full text-sm font-mono ${isDark
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <p className={`mb-6 leading-relaxed ${isDark ? "text-muted-foreground" : "text-gray-600"
                }`}>
                {selectedProjectForDetails.description}
              </p>

              <div className="flex gap-4">
                {selectedProjectForDetails.github && (
                  <a
                    href={selectedProjectForDetails.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors ${isDark
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono transition-colors ${isDark
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
