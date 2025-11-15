import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { LightPortfolio } from "@/components/LightPortfolio";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NetworkGraph } from "@/components/NetworkGraph";
import { TypewriterText } from "@/components/TypewriterText";
import { NameTypewriter } from "@/components/NameTypewriter";
import { ResumeDialog } from "@/components/ResumeDialog";
import { ProjectFilter } from "@/components/ProjectFilter";
import { Mail, Linkedin, Github, Shield, Code2, User, BookOpen, Trophy } from "lucide-react";
import { Terminal } from "@/components/Terminal";
import { Bitmoji } from "@/components/Bitmoji";

const Index = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<"network" | "about" | "projects" | "skills" | "achievements" | "experience" | "contact">("network");
  const [terminalCommand, setTerminalCommand] = useState<string>("");
  const [focusedElement, setFocusedElement] = useState<string | null>(null);
  
  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  if (theme === "light") {
    return <LightPortfolio />;
  }

  const scrollToSection = (id: "network" | "about" | "projects" | "skills" | "achievements" | "experience" | "contact") => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
  };

  const handleCardClick = (cardId: string) => {
    setFocusedElement(cardId);
  };

  const handleBackgroundClick = () => {
    setFocusedElement(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono overflow-hidden" onClick={handleBackgroundClick}>
      {/* Minimal Fixed Header - ResumeDialog on Left & Theme Toggle on Right */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          <ResumeDialog variant="cyber" />
          <ThemeToggle />
        </div>
      </header>

      {/* Conditional rendering based on active section */}
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
                <div className="font-mono text-3xl sm:text-4xl md:text-6xl font-bold mt-2 lg:mt-20">
                  <div className="glow-green">Hey!</div>
                  <div className="glow-green mt-2">I am SIYA P P</div>
                </div>
              </div>
              <TypewriterText
                texts={[
                  "Cyber Security Researcher",
                  "Bug Bounty Hunter",
                  "IoT Enthusiast",
                  "Student",
                  "Homo Sapien",
                ]}
                typingSpeed={80}
                deletingSpeed={50}
                pauseDuration={2000}
              />
            </motion.div>
            <Bitmoji />
          </motion.div>
          <NetworkGraph />
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
            className="space-y-6 text-lg leading-relaxed"
          >
            <p className="border-l-4 border-primary pl-6">
              I am a driven <strong className="text-primary">B.Tech student in Computer Science and Business Systems</strong>, 
              specializing in <strong className="text-accent">Cybersecurity, Backend Development, and AI in security</strong>. 
              My profile is anchored by robust technical proficiency across multiple domains, including scripting with 
              <strong className="text-primary"> Python and C++</strong>, and leveraging advanced security tools like 
              <strong className="text-accent"> Burp Suite, Nmap, and Wireshark</strong>.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card border border-primary/30 p-6 rounded-lg">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-primary">Offensive Security</h3>
                <p className="text-sm">
                  Currently engaged in <strong>Bug Bounty Hunting</strong> on live assets (Meta, Zomato), 
                  performing continuous reconnaissance and vulnerability assessments. Practical experience in 
                  <strong> penetration testing and ethical hacking</strong>.
                </p>
              </div>

              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick('about-secure');
                }}
                className={`bg-card border border-primary/30 p-6 rounded-lg cursor-pointer ${
                  focusedElement === 'about-secure' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                }`}
              >
                <Code2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3 text-accent">Secure Systems & Research</h3>
                <p className="text-sm">
                  Major ongoing project: <strong>FL-DP FRAMEWORK</strong>, focusing on cutting-edge AI in security 
                  by integrating Federated Learning and Differential Privacy. Also developed 
                  <strong> THE MARAUDER'S MAP</strong> for network anomaly detection.
                </p>
              </div>

              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick('about-operations');
                }}
                className={`bg-card border border-primary/30 p-6 rounded-lg cursor-pointer ${
                  focusedElement === 'about-operations' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                }`}
              >
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3 text-primary">Security Operations</h3>
                <p className="text-sm">
                  Completed simulated <strong>SOC Analyst workflows</strong> on <strong>LETSDEFEND.IO</strong>, 
                  handling cases like malware side-loading and RCE exploitation. Active on platforms like 
                  <strong> TryHackMe, Hack the Box, and PortSwigger Labs</strong>.
                </p>
              </div>
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
          <ProjectFilter theme="dark" />
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
            {[
              {
                category: "Security",
                icon: <Shield className="w-8 h-8" />,
                skills: ["Penetration Testing", "Network Security", "Threat Intelligence", "SIEM"],
                color: "text-[hsl(330,100%,60%)]",
                borderColor: "border-[hsl(330,100%,60%)]",
                bgColor: "bg-[hsl(330,100%,60%)]/20",
                glow: "glow-pink"
              },
              {
                category: "Tools",
                icon: <Code2 className="w-8 h-8" />,
                skills: ["Burp Suite", "Wireshark", "Nmap", "Scapy", "GoPhish", "Git"],
                color: "text-[hsl(180,100%,50%)]",
                borderColor: "border-[hsl(180,100%,50%)]",
                bgColor: "bg-[hsl(180,100%,50%)]/20",
                glow: "glow-cyan"
              },
              {
                category: "Languages",
                icon: <Code2 className="w-8 h-8" />,
                skills: ["Python", "C++", "JavaScript", "Bash"],
                color: "text-[hsl(280,100%,60%)]",
                borderColor: "border-[hsl(280,100%,60%)]",
                bgColor: "bg-[hsl(280,100%,60%)]/20",
                glow: "glow-purple"
              },
              {
                category: "Platforms",
                icon: <BookOpen className="w-8 h-8" />,
                skills: ["Linux", "Windows", "Flask", "Node.js"],
                color: "text-[hsl(200,100%,50%)]",
                borderColor: "border-[hsl(200,100%,50%)]",
                bgColor: "bg-[hsl(200,100%,50%)]/20",
                glow: "glow-blue"
              },
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(`skill-${i}`);
                }}
                className={`bg-card border-2 ${group.borderColor} p-6 rounded-xl hover:shadow-[0_0_20px] hover:shadow-current transition-all cursor-pointer ${
                  focusedElement === `skill-${i}` ? 'z-50 scale-105' : 'z-10'
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
            className="mt-12 bg-card border-2 border-accent p-8 rounded-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-accent">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {["Cybersecurity", "Backend Development", "AI in Security", "Threat Detection", "Penetration Testing", "Bug Bounty Hunting", "Agentic AI", "IoT"].map((interest) => (
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
              { emoji: "🏆", title: "1st Place - Hack-For-Humanity 2024", org: "YI-Yuva-MITS", description: "Won first place in hackathon focused on humanitarian tech solutions", link: "#" },
              { emoji: "🎯", title: "Hac'KP 2025", org: "Kerala Police Cyberdome", description: "Participated in Kerala Police's cybersecurity challenge", link: "#" },
              { emoji: "🎄", title: "Advent of Cyber 2024 & 2023", org: "TryHackMe", description: "Completed TryHackMe's annual Advent of Cyber challenges", link: "https://tryhackme.com" },
              { emoji: "💼", title: "IBM SkillsBuild Internship", org: "2-week CyberSecurity Program with CSRBOX", description: "Completed intensive cybersecurity training program", link: "#" },
              { emoji: "👩‍💻", title: "Tink-Her-Hack 2022 & 2.0 2023", org: "Women in Tech Wing - Tinker Hub Foundation", description: "Participated in women-focused tech hackathons", link: "#" },
              { emoji: "🚩", title: "CodeRed CTF", org: "Red Team Hacker Academy", description: "Competed in Capture The Flag cybersecurity competition", link: "#" },
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
                className={`bg-card border border-primary/30 rounded-lg overflow-hidden hover:border-primary transition-all group cursor-pointer ${
                  focusedElement === `achievement-${i}` ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
                }`}
              >
                <div className="aspect-video bg-primary/10 flex items-center justify-center text-6xl">
                  {achievement.emoji}
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
                    className={`bg-card border border-primary/30 rounded-lg p-4 hover:border-primary transition-all cursor-pointer ${
                      focusedElement === `cert-${i}` ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
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
              className={`bg-card border border-primary/30 rounded-lg p-6 hover:border-primary transition-all cursor-pointer ${
                focusedElement === 'experience-card' ? 'z-50 scale-105 shadow-[0_0_40px_rgba(0,255,65,0.5)]' : 'z-10'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary font-mono">Research and Development Intern</h3>
                  <p className="text-accent font-mono mt-1">HSS (Human Safety Services)</p>
                </div>
                <div className="text-sm text-muted-foreground font-mono mt-2 md:mt-0">
                  Dec 2023 - May 2024
                </div>
              </div>
              <div className="space-y-3 text-sm md:text-base">
                <p className="text-muted-foreground">
                  Worked on cybersecurity research and development projects, focusing on security analysis and vulnerability assessment.
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
            Interested in working together or discussing cybersecurity? Reach out!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            <a
              href="mailto:siyapp@example.com"
              className="p-4 bg-primary/20 text-primary rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-primary/20 text-primary rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com"
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

      {/* Terminal */}
      <Terminal onCommand={handleCommand} />
      
      {/* Bottom padding to prevent terminal overlap - 15% of viewport height */}
      <div className="h-[15vh]" />
    </div>
  );
};

export default Index;
