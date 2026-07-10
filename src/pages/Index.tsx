import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useRole } from "@/contexts/RoleContext";
import { SPECIALIZATIONS } from "@/lib/config";
import { SKILLS_DATA, ALL_INTERESTS } from "@/lib/skillsData";
import { LightPortfolio } from "@/components/LightPortfolio";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TypewriterText } from "@/components/TypewriterText";
import { NameTypewriter } from "@/components/NameTypewriter";
import { ResumeDialog } from "@/components/ResumeDialog";
import { ProjectFilter } from "@/components/ProjectFilter";
import { Mail, Linkedin, Github, Shield, Code2, User, BookOpen, Trophy, Cpu, Brain, Award } from "lucide-react";
import { Terminal } from "@/components/Terminal";
import { Bitmoji } from "@/components/Bitmoji";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Index = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<"network" | "about" | "projects" | "skills" | "achievements" | "experience" | "contact">("network");
  const [terminalCommand, setTerminalCommand] = useState<string>("");
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  const [viewFocus, setViewFocus] = useState<"terminal" | "content">("terminal");
  const [terminalBounds, setTerminalBounds] = useState<{ width: number | null; height: number }>({ width: null, height: 192 });
  const location = useLocation();
  const isProfessional = location.pathname.startsWith("/professional");

  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <>
      {/* Light Mode */}
      {theme === "light" && <LightPortfolio />}

      {/* Dark Mode */}
      {theme === "dark" && (
        <DarkModeContent
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          terminalCommand={terminalCommand}
          setTerminalCommand={setTerminalCommand}
          focusedElement={focusedElement}
          setFocusedElement={setFocusedElement}
          viewFocus={viewFocus}
          setViewFocus={setViewFocus}
          terminalBounds={terminalBounds}
          setTerminalBounds={setTerminalBounds}
          isProfessional={isProfessional}
          heroY={heroY}
          heroOpacity={heroOpacity}
        />
      )}
    </>
  );
};

// Extract dark mode content into a separate component
const DarkModeContent = ({
  activeSection,
  setActiveSection,
  terminalCommand,
  setTerminalCommand,
  focusedElement,
  setFocusedElement,
  viewFocus,
  setViewFocus,
  terminalBounds,
  setTerminalBounds,
  isProfessional,
  heroY,
  heroOpacity,
}: {
  activeSection: "network" | "about" | "projects" | "skills" | "achievements" | "experience" | "contact";
  setActiveSection: (section: "network" | "about" | "projects" | "skills" | "achievements" | "experience" | "contact") => void;
  terminalCommand: string;
  setTerminalCommand: (cmd: string) => void;
  focusedElement: string | null;
  setFocusedElement: (id: string | null) => void;
  viewFocus: "terminal" | "content";
  setViewFocus: (focus: "terminal" | "content") => void;
  terminalBounds: { width: number | null; height: number };
  setTerminalBounds: (bounds: { width: number | null; height: number }) => void;
  isProfessional: boolean;
  heroY: any;
  heroOpacity: any;
}) => {
  const { theme } = useTheme();
  const location = useLocation();
  const { role } = useRole();
  const navigate = useNavigate();

  const getAboutIcon = (index: number, role: string) => {
    if (role === "systems") {
      return [Cpu, Code2, BookOpen][index] || Cpu;
    } else if (role === "cybersecurity") {
      return [Shield, Code2, BookOpen][index] || Shield;
    } else {
      return [Brain, Shield, Cpu][index] || Brain;
    }
  };

  const orderedSkills = useMemo(() => {
    const rawGroups = SKILLS_DATA[role] || SKILLS_DATA.systems;
    
    const getGroupIcon = (groupId: string) => {
      if (groupId === "core") return <Cpu className="w-8 h-8" />;
      if (groupId === "languages" || groupId === "testing" || groupId === "distributed") return <Code2 className="w-8 h-8" />;
      if (groupId === "platforms" || groupId === "tools" || groupId === "vision") return <BookOpen className="w-8 h-8" />;
      return <Shield className="w-8 h-8" />;
    };
    
    const stylesMap = [
      {
        color: "text-[hsl(200,100%,50%)]",
        borderColor: "border-[hsl(200,100%,50%)]",
        bgColor: "bg-[hsl(200,100%,50%)]/20",
        glow: "glow-blue"
      },
      {
        color: "text-[hsl(280,100%,60%)]",
        borderColor: "border-[hsl(280,100%,60%)]",
        bgColor: "bg-[hsl(280,100%,60%)]/20",
        glow: "glow-purple"
      },
      {
        color: "text-[hsl(180,100%,50%)]",
        borderColor: "border-[hsl(180,100%,50%)]",
        bgColor: "bg-[hsl(180,100%,50%)]/20",
        glow: "glow-cyan"
      },
      {
        color: "text-[hsl(330,100%,60%)]",
        borderColor: "border-[hsl(330,100%,60%)]",
        bgColor: "bg-[hsl(330,100%,60%)]/20",
        glow: "glow-pink"
      }
    ];

    return rawGroups.map((group, idx) => {
      const style = stylesMap[idx % stylesMap.length];
      return {
        ...group,
        icon: getGroupIcon(group.id),
        ...style
      };
    });
  }, [role]);

  const orderedInterests = useMemo(() => {
    return [...ALL_INTERESTS]
      .sort((a, b) => a.rolePriority[role] - b.rolePriority[role])
      .map(item => item.name);
  }, [role]);

  // Initialize active section from hash or default to network
  useEffect(() => {
    if (theme === 'dark') {
      // Extract hash path without query params
      const hash = location.hash.replace('#', '').split('?')[0];
      if (hash && ["network", "about", "projects", "skills", "achievements", "experience", "contact"].includes(hash)) {
        setActiveSection(hash as any);
      }
    }
  }, [theme, location.hash]);

  // Update hash when active section changes, preserving the role query parameter
  useEffect(() => {
    if (theme === 'dark') {
      const searchParams = new URLSearchParams(window.location.search);
      const roleParam = searchParams.get("role") || searchParams.get("focus");
      
      let queryStr = "";
      if (roleParam) {
        queryStr = `?role=${roleParam}`;
      } else {
        const hash = window.location.hash;
        const hashQueryIndex = hash.indexOf("?");
        if (hashQueryIndex !== -1) {
          const hashParams = new URLSearchParams(hash.substring(hashQueryIndex));
          const roleHash = hashParams.get("role") || hashParams.get("focus");
          if (roleHash) {
            queryStr = `?role=${roleHash}`;
          }
        }
      }
      
      window.history.replaceState(null, '', `#${activeSection}${queryStr}`);
      window.scrollTo(0, 0);
    }
  }, [activeSection, theme]);

  const scrollToSection = (id: "network" | "about" | "projects" | "skills" | "achievements" | "experience" | "contact") => {
    setActiveSection(id);
    // In dark mode, we don't scroll to ID, we just switch state and reset scroll
    window.scrollTo(0, 0);
  };

  const handleCommand = (cmd: string) => {
    setTerminalCommand(cmd);
    if (cmd === "projects") setActiveSection("projects");
    if (cmd === "skills") setActiveSection("skills");
    if (cmd === "contact") setActiveSection("contact");
    if (cmd === "about") setActiveSection("about");
    if (cmd === "achievements") setActiveSection("achievements");
    if (cmd === "experience") setActiveSection("experience");
    if (cmd === "network" || cmd === "~") setActiveSection("network");

    // When a command changes the section, give focus to content so user can see it
    if (["projects", "skills", "contact", "about", "achievements", "experience", "network"].includes(cmd)) {
      setViewFocus("content");
    }
  };

  const handleCardClick = (cardId: string) => {
    setFocusedElement(cardId);
    setViewFocus("content");
  };

  const handleBackgroundClick = () => {
    setFocusedElement(null);
    setViewFocus("content");
  };

  const handleContentClick = (e: React.MouseEvent) => {
    // Check if click is within terminal bounds (click-through logic)
    // If the terminal is behind content, we want to bring it forward if clicked
    if (viewFocus === 'content') {
      const termHeight = terminalBounds.height;
      const isInVertical = window.innerHeight - e.clientY < termHeight;

      let isInHorizontal = true;
      if (terminalBounds.width) {
        const left = (window.innerWidth - terminalBounds.width) / 2;
        const right = left + terminalBounds.width;
        isInHorizontal = e.clientX >= left && e.clientX <= right;
      }

      if (isInVertical && isInHorizontal) {
        // Clicked over terminal area
        // Check if target is interactive (don't steal focus from buttons/links)
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button, a, input, textarea, [role="button"]');

        // Also check if we are clicking on a card that is focused/active
        const isCard = target.closest('.content-card');

        if (!isInteractive && !isCard) {
          setViewFocus("terminal");
          setFocusedElement(null);
          e.stopPropagation();
          return;
        }
      }
    }

    setViewFocus("content");
  };

  return (
    <div key="dark-theme" className={`min-h-screen font-mono overflow-hidden ${theme === 'dark' ? 'bg-black text-green-500 dark' : 'bg-background text-foreground'}`} onClick={handleBackgroundClick}>
      {/* Minimal Fixed Header - ResumeDialog on Left & Theme Toggle on Right */}
      <header className="fixed top-0 left-0 right-0 z-[100] p-4 glass-header">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-center w-full sm:w-auto gap-4">
            <ResumeDialog variant="cyber" />
            <div className="sm:hidden flex items-center gap-3">
              <Link to={isProfessional ? "/professional/blog" : "/blog"} className="text-primary hover:text-accent transition-colors" title="Blog">
                <BookOpen className="w-5 h-5" />
              </Link>
              <ThemeToggle />
            </div>
          </div>
          


          <div className="hidden sm:flex items-center gap-4">
            <Link to={isProfessional ? "/professional/blog" : "/blog"} className="text-primary hover:text-accent transition-colors" title="Blog">
              <BookOpen className="w-6 h-6" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Conditional rendering based on active section */}
      <main
        className={`relative transition-all duration-300 ${viewFocus === 'content' ? 'z-50' : 'z-0'}`}
        onClick={handleContentClick}
      >
        {activeSection === "network" && (
          <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pb-48">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-7xl mb-12 mt-16"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center md:text-left md:ml-0"
              >
                <div className="mb-5 lg:mr-40">
                  <div className="font-sans text-4xl sm:text-5xl md:text-7xl font-extrabold mt-2 lg:mt-20 tracking-tight leading-none">
                    <div className="text-white">Hey!</div>
                    <div className="bg-gradient-to-r from-primary via-[hsl(var(--accent))] to-primary bg-clip-text text-transparent mt-2 py-1 select-none filter drop-shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                      I am SIYA P P
                    </div>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-accent uppercase tracking-widest mt-4 mb-2 opacity-80">
                    {SPECIALIZATIONS[role].subtitle}
                  </div>
                </div>
                <TypewriterText
                  key={role}
                  texts={SPECIALIZATIONS[role].typewriterTexts}
                  typingSpeed={80}
                  deletingSpeed={50}
                  pauseDuration={2000}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={`hero-desc-${role}`}
                  className="mt-6 text-sm md:text-base text-primary/80 max-w-xl font-mono leading-relaxed"
                >
                  {SPECIALIZATIONS[role].description}
                </motion.div>
              </motion.div>
              <Bitmoji />
            </motion.div>
          </section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <section id="about" className="min-h-screen py-20 px-4 md:px-8 bg-card/30 flex items-center">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-8 text-center text-[hsl(330,100%,60%)] glow-pink"
              >
                <User className="inline-block w-10 h-10 mr-3" />
                About Me
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg leading-relaxed content-card"
              >
                <p className="border-l-4 border-primary pl-6">
                  I am a driven <strong className="text-primary">B.Tech student in Computer Science and Business Systems</strong>,
                  specializing in <strong className="text-accent">Cybersecurity, Backend Development, and AI in security</strong>.
                  My profile is anchored by robust technical proficiency across multiple domains, including scripting with
                  <strong className="text-primary"> Python and C++</strong>, and leveraging advanced security tools like
                  <strong className="text-accent"> Burp Suite, Nmap, and Wireshark</strong>.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {SPECIALIZATIONS[role].aboutCards.map((card, index) => {
                    const IconComponent = getAboutIcon(index, role);
                    const cardId = `about-card-${index}`;
                    return (
                      <div
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(cardId);
                        }}
                        className={`bg-card border border-primary/30 p-6 rounded-lg cursor-pointer content-card transition-all ${
                          focusedElement === cardId 
                            ? 'z-50 scale-105 shadow-[0_0_40px_hsl(var(--primary)/0.5)] border-primary' 
                            : 'z-10'
                        }`}
                      >
                        <IconComponent className="w-12 h-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-3 text-primary">{card.title}</h3>
                        <p className="text-sm">
                          {card.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Projects Section with Filter */}
        {activeSection === "projects" && (
          <section id="projects" className="min-h-screen py-20 px-4 md:px-8 flex items-center">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center text-[hsl(180,100%,50%)] glow-cyan"
              >
                Featured Projects
              </motion.h2>
              <ProjectFilter theme="dark" onInteraction={() => setViewFocus("content")} />
            </div>
          </section>
        )}

        {/* Research Section */}
        {activeSection === "research" && (
          <section id="research" className="min-h-screen py-20 px-4 md:px-8 bg-card/30 flex items-center">
            <div className="max-w-4xl mx-auto w-full">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center text-[hsl(150,100%,50%)] glow-green font-mono"
              >
                {"<"} Research {"/>"}
              </motion.h2>
              
              <div className="space-y-6">
                {/* FEDDP Research Project Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick('research-feddp');
                  }}
                  className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === 'research-feddp' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary font-mono">FEDDP: Federated Learning with Differential Privacy</h3>
                      <p className="text-accent font-mono mt-1">Collaborative Research Framework</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm md:text-base">
                    <p className="text-muted-foreground leading-relaxed">
                      Investigating and developing a privacy-preserving secure collaborative learning framework. The research combines 
                      <strong> Federated Learning (FL)</strong> and <strong>Differential Privacy (DP)</strong> using TensorFlow, Flower, and PySyft.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By adding calibrated noise to client models during training rounds, the framework successfully prevents membership inference 
                      and reconstruction attacks, preserving privacy while training highly accurate distributed neural networks.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Federated Learning", "Differential Privacy", "Distributed ML", "Network Security", "TensorFlow", "Flower"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Additional Research Info / NPTEL certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick('research-academic');
                  }}
                  className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === 'research-academic' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'}`}
                >
                  <h3 className="text-lg font-bold text-accent font-mono mb-4">Academic & Specialized Research Fields</h3>
                  <ul className="space-y-3 list-disc list-inside text-sm md:text-base text-muted-foreground">
                    <li>
                      <strong className="text-primary">Privacy & Security in Online Social Media:</strong> Advanced NPTEL research coursework covering network analysis, information dissemination models, profiling attacks, and de-anonymization techniques.
                    </li>
                    <li>
                      <strong className="text-primary">Performance-Aware AI Systems:</strong> Architecting resource-optimized computer vision pipelines (OpenCV, ResNet) for edge and IoT systems to trigger anomaly detections.
                    </li>
                    <li>
                      <strong className="text-primary">Zero-Trust Cloud & Identity Infrastructure:</strong> Researching automated IAM privilege escalation detection methods and least-privilege security automation in AWS.
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <section id="skills" className="min-h-screen py-20 px-4 md:px-8 bg-card/30 flex items-center">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center text-[hsl(280,100%,60%)] glow-purple"
              >
                Skills & Expertise
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {orderedSkills.map((group, i) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(`skill-${i}`);
                    }}
                    className={`bg-card border-2 ${group.borderColor} p-6 rounded-xl hover:shadow-[0_0_20px] hover:shadow-current transition-all cursor-pointer content-card ${focusedElement === `skill-${i}` ? 'z-50 scale-105' : 'z-10'
                      }`}
                  >
                    <div className={`${group.color} mb-4 ${group.glow}`}>{group.icon}</div>
                    <h3 className={`text-xl font-bold mb-4 ${group.color} ${group.glow}`}>{group.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, j) => (
                        <span
                          key={j}
                          className={`px-3 py-1 ${group.bgColor} ${group.color} text-sm rounded-full border ${group.borderColor}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Interests Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-card border-2 border-accent p-8 rounded-xl content-card"
              >
                <h3 className="text-2xl font-bold mb-6 text-accent">Interests</h3>
                <div className="flex flex-wrap gap-3">
                  {orderedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 bg-accent/20 text-accent rounded-full border border-accent/50 font-semibold"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {activeSection === "achievements" && (
          <section id="achievements" className="min-h-screen py-20 px-4 md:px-8 flex items-center overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-12 text-center glow-green font-mono"
              >
                {"<"} Achievements {"/>"}
              </motion.h2>

              <div className="space-y-6">
                {/* Achievement Cards with Photos */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      emoji: "🎯",
                      title: "Hac'KP 2025",
                      org: "Kerala Police Cyberdome",
                      description: "Won Hac'KP 2025 organized by Kerala Police Cyberdome",
                      link: "https://www.linkedin.com/posts/alchemist501_have-you-ever-thought-about-using-tech-to-activity-7381365809153155072-sRc8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
                      image: "/assets/Achievments/Hackp.jpg"
                    },
                    {
                      emoji: "🏆",
                      title: "1st Place - Hack-For-Humanity 2024",
                      org: "YI-Yuva-MITS",
                      description: "Won first place in hackathon focused on humanitarian tech solutions",
                      link: "https://www.linkedin.com/posts/alchemist501_hackforhumanity-hackathon-techforgood-activity-7250835679587262464--tMF?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
                      image: "/assets/Achievments/MITS.jpg"
                    },
                    {
                      emoji: "👩‍💻",
                      title: "Tink-Her-Hack 2022 & 2.0 2023",
                      org: "Women in Tech Wing - Tinker Hub Foundation",
                      description: "Participated in women-focused tech hackathons conducted by Tinker Hub",
                      link: "https://www.linkedin.com/posts/alchemist501_tinkherhack-hackathon-womenintech-activity-7246002367232409601-kn4q?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
                      image: "/assets/Achievments/Tink.jpg"
                    },
                    {
                      emoji: "🎄",
                      title: "Advent of Cyber 2024 & 2023",
                      org: "TryHackMe",
                      description: "Completed TryHackMe's annual Advent of Cyber challenges",
                      link: "https://www.linkedin.com/posts/alchemist501_adventofcyber-tryhackme-socmas-activity-7277372580666228736-oBif?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
                      image: "/assets/blog/AoD25.jpg" // Add your image path here
                    },
                    {
                      emoji: "💼",
                      title: "IBM SkillsBuild Internship",
                      org: "2-week CyberSecurity Program with CSRBOX",
                      description: "Completed intensive cybersecurity training program",
                      link: "https://www.linkedin.com/posts/alchemist501_cybersecurity-ibm-csrbox-activity-7266151883910582272-3W1j?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
                      image: "/assets/Achievments/IBM.jpg"
                    },

                    {
                      emoji: "🚩",
                      title: "CodeRed CTF",
                      org: "Red Team Hacker Academy",
                      description: "Competed in Capture The Flag cybersecurity competition",
                      link: "https://www.linkedin.com/posts/alchemist501_throwback2023-redteamhackeracademy-cybersecurity-activity-7171529421709848576-e6IO?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD92xMABDJDA3tFyYEx9O5e6jxx1w1Uod6U",
                      image: "/assets/Achievments/CTF.jpg"
                    },
                  ].map((achievement, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(`achievement-${i}`);
                      }}
                      className={`bg-card border border-primary/30 rounded-lg overflow-hidden hover:border-primary transition-all group cursor-pointer content-card ${focusedElement === `achievement-${i}` ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                        }`}
                    >
                      <div className="aspect-video bg-primary/10 flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                        {achievement.image ? (
                          <img
                            src={achievement.image}
                            alt={achievement.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`text-6xl ${achievement.image ? 'hidden' : ''} absolute inset-0 flex items-center justify-center bg-primary/10`}>
                          {achievement.emoji}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-primary font-mono mb-1">{achievement.title}</h3>
                        <p className="text-xs text-accent mb-2">{achievement.org}</p>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        <a
                          href={achievement.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:text-accent transition-colors font-mono"
                        >
                          View Details →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Certifications Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12"
                >
                  <h3 className="text-2xl font-bold mb-6 glow-cyan font-mono">Certifications</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { name: "Google Cybersecurity", org: "" },
                      { name: "Ethical Hacking", org: "NPTEL" },
                      { name: "Practical Cybersecurity for Cybersecurity practitioners", org: "NPTEL" },
                      { name: "Privacy and Security in Online Social Media", org: "NPTEL" },
                      { name: "Cybersecurity Fundamentals", org: "IBM SkillsBuild" },
                    ].map((cert, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(`cert-${i}`);
                        }}
                        className={`bg-card border border-primary/30 rounded-lg p-4 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === `cert-${i}` ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                          }`}
                      >
                        <div className="text-3xl mb-2">📜</div>
                        <p className="font-semibold text-primary font-mono">{cert.name}</p>
                        {cert.org && <p className="text-sm text-muted-foreground">{cert.org}</p>}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {activeSection === "experience" && (
          <section id="experience" className="min-h-screen py-20 px-4 md:px-8 bg-card/30 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center text-[hsl(330,100%,60%)] glow-pink font-mono"
              >
                {"<"} Experience {"/>"}
              </motion.h2>

              <div className="space-y-8">
                {/* R&D Intern Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick('experience-card');
                  }}
                  className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === 'experience-card' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-primary font-mono">Research and Development Intern</h3>
                      <p className="text-accent font-mono mt-1">HSS (Harish Software Solutions)</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono mt-2 md:mt-0">
                      Dec 2023 - May 2024
                    </div>
                  </div>
                  <div className="space-y-3 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      Built scalable backend systems. Involved in building secure and efficient backend systems, implementing APIs, and ensuring data integrity.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Research", "Security Analysis", "Vulnerability Assessment", "Development"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Bug Bounty Hunter */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick('bug-bounty-card');
                  }}
                  className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === 'bug-bounty-card' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-primary font-mono">Bug Bounty Hunter</h3>
                      <p className="text-accent font-mono mt-1">Independent Security Researcher</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono mt-2 md:mt-0">
                      Ongoing
                    </div>
                  </div>
                  <div className="space-y-3 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      Active on platforms hunting vulnerabilities on live assets including Meta and Zomato. Performing continuous reconnaissance and vulnerability assessments.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Penetration Testing", "Vulnerability Assessment", "Ethical Hacking", "Web Security"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Security Training Platforms */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick('training-card');
                  }}
                  className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === 'training-card' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-primary font-mono">Security Training Platforms</h3>
                      <p className="text-accent font-mono mt-1">Continuous Learning & Practice</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono mt-2 md:mt-0">
                      Ongoing
                    </div>
                  </div>
                  <div className="space-y-3 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      Active participant on multiple cybersecurity training platforms, completing challenges and improving practical security skills.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["TryHackMe", "LetsDefend.io", "PicoCTF", "PortSwigger Labs", "Hack The Box"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* IBM SkillsBuild Internship */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick('ibm-card');
                  }}
                  className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer content-card ${focusedElement === 'ibm-card' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-primary font-mono">IBM SkillsBuild Internship</h3>
                      <p className="text-accent font-mono mt-1">CSRBOX</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono mt-2 md:mt-0">
                      2-week Program
                    </div>
                  </div>
                  <div className="space-y-3 text-sm md:text-base">
                    <p className="text-muted-foreground">
                      Completed intensive 2-week online internship focused on cybersecurity fundamentals and practical applications.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {["Cybersecurity Fundamentals", "IBM SkillsBuild", "Online Training"].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <section id="contact" className="min-h-screen py-20 px-4 md:px-8 bg-card/30 flex items-center">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-8 text-[hsl(200,100%,50%)] glow-blue"
              >
                Let's Connect
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground mb-12"
              >
                {SPECIALIZATIONS[role].contactTagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-6"
              >
                <a
                  href="mailto:siyapp.mec@gmail.com"
                  className="p-4 bg-primary/20 text-primary rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/alchemist501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/20 text-primary rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/Alchemist501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary/20 text-primary rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 border-t border-primary/20 text-center text-xs text-muted-foreground font-mono bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025 SIYA P P. All rights reserved.</p>
        </div>
      </footer>

      {/* Terminal */}
      <Terminal
        onCommand={handleCommand}
        zIndex={viewFocus === 'terminal' ? 50 : 10}
        onFocus={() => setViewFocus("terminal")}
        onResize={useCallback((width, height) => setTerminalBounds({ width, height }), [])}
      />

      {/* Bottom padding to prevent terminal overlap - 15% of viewport height */}
      <div className="h-[15vh]" />
    </div>
  );
};

export default Index;
