import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Menu, X, ExternalLink } from "lucide-react";
import { ResumeDialog } from "@/components/ResumeDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Bitmoji } from "@/components/Bitmoji";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const LightPortfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-gray-900"
            >
              SIYA P P
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-gray-900 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Skills
              </button>
              <button onClick={() => scrollToSection('achievements')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Achievements
              </button>
              <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Experience
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </button>
              <ResumeDialog />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <ResumeDialog />
              <ThemeToggle />
              <button 
                className="text-gray-900"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 space-y-3"
            >
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                Skills
              </button>
              <button onClick={() => scrollToSection('achievements')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                Achievements
              </button>
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                Experience
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </button>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20 bg-gradient-to-br from-gray-50 to-white pt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div {...fadeIn}>
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hey!
              </motion.div>
              <motion.div 
                className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I am SIYA P P
              </motion.div>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Want to know about me?
            </motion.p>
            <p className="text-base md:text-lg text-gray-500 mb-6 md:mb-8 leading-relaxed">
              Cyber Security Researcher • Bug Bounty Hunter • IoT Enthusiast • Student • Homo Sapien
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-center"
              >
                Get in Touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                View Work
              </button>
            </div>
          </motion.div>

          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <Bitmoji />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed text-gray-700"
          >
            <p>
              I am a driven <strong>B.Tech student in Computer Science and Business Systems</strong>, specializing in 
              <strong> Cybersecurity, Backend Development, and AI in security</strong>. My profile is anchored by robust 
              technical proficiency across multiple domains, including scripting with <strong>Python and C++</strong>, and 
              leveraging advanced security tools like <strong>Burp Suite, Nmap, and Wireshark</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Offensive Security</h3>
                <p className="text-sm">
                  Currently engaged in Bug Bounty Hunting on live assets (Meta, Zomato), performing continuous reconnaissance 
                  and vulnerability assessments. Practical experience in penetration testing and ethical hacking.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Secure Systems & Research</h3>
                <p className="text-sm">
                  Major ongoing project: FL-DP FRAMEWORK, focusing on cutting-edge AI in security by integrating Federated 
                  Learning and Differential Privacy. Also developed THE MARAUDER'S MAP for network anomaly detection.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Security Operations</h3>
                <p className="text-sm">
                  Completed simulated SOC Analyst workflows on LETSDEFEND.IO, handling cases like malware side-loading and RCE 
                  exploitation. Active on TryHackMe, Hack the Box, and PortSwigger Labs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
          >
            Skills & Expertise
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                category: "Security",
                skills: ["Penetration Testing", "Network Security", "Threat Intelligence", "SIEM"],
              },
              {
                category: "Tools",
                skills: ["Burp Suite", "Wireshark", "Nmap", "Scapy", "GoPhish", "Git"],
              },
              {
                category: "Languages",
                skills: ["Python", "C++", "JavaScript", "Bash"],
              },
              {
                category: "Platforms",
                skills: ["Linux", "Windows", "Flask", "Node.js"],
              },
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Interests</h3>
            <div className="flex flex-wrap gap-3">
              {["Cybersecurity", "Backend Development", "AI in Security", "Threat Detection", "Penetration Testing", "Bug Bounty Hunting", "Agentic AI", "IoT"].map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
          >
            Featured Projects
          </motion.h2>

          {/* Security Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Security Projects</h3>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {[
                  {
                    title: "FL-DP FRAMEWORK",
                    description: "An advanced Federated Learning-Differential Privacy Framework focused on enhancing data privacy while maintaining model accuracy.",
                    tech: ["Python", "TensorFlow", "Privacy Tech"],
                    category: "security",
                    github: "#",
                  },
                  {
                    title: "THE MARAUDER'S MAP",
                    description: "Network anomaly detection system that monitors and analyzes network traffic patterns to identify potential security threats.",
                    tech: ["Python", "Scapy", "Machine Learning"],
                    category: "security",
                    demo: "#",
                  },
                  {
                    title: "SIEM Lab Setup",
                    description: "Comprehensive SIEM (Security Information and Event Management) lab environment for security monitoring and incident response.",
                    tech: ["Splunk", "ELK Stack", "Python"],
                    category: "security",
                  },
                ].map((project, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all group h-full"
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center text-4xl">
                        🔒
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, j) => (
                            <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {project.github && (
                            <a href={project.github} className="text-gray-900 hover:text-gray-600 transition-colors">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} className="text-gray-900 hover:text-gray-600 transition-colors">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>

          {/* Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Other Projects</h3>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {[
                  {
                    title: "IoT Security Monitor",
                    description: "Real-time monitoring system for IoT devices, detecting vulnerabilities and security misconfigurations.",
                    tech: ["Python", "MQTT", "Flask"],
                    category: "other",
                    github: "#",
                  },
                  {
                    title: "Smart Home Automation",
                    description: "Secure home automation system with emphasis on privacy and data protection.",
                    tech: ["Arduino", "ESP32", "Node.js"],
                    category: "other",
                    demo: "#",
                  },
                  {
                    title: "Phishing Detection Tool",
                    description: "Machine learning-based tool for detecting and preventing phishing attempts.",
                    tech: ["Python", "Scikit-learn", "Flask"],
                    category: "other",
                    github: "#",
                  },
                ].map((project, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all group h-full"
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-4xl">
                        💡
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech, j) => (
                            <span key={j} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {project.github && (
                            <a href={project.github} className="text-gray-900 hover:text-gray-600 transition-colors">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                          {project.demo && (
                            <a href={project.demo} className="text-gray-900 hover:text-gray-600 transition-colors">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-12 md:py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
          >
            Achievements
          </motion.h2>
          
          {/* Achievement Photo Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-5xl md:text-6xl">
                  {achievement.emoji}
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{achievement.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{achievement.org}</p>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <a 
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-900 hover:text-gray-600 transition-colors font-semibold"
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
          >
            <h3 className="text-2xl font-bold mb-6">Certifications</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-2">📜</div>
                  <p className="font-semibold text-gray-900">{cert.name}</p>
                  {cert.org && <p className="text-sm text-gray-600">{cert.org}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
          >
            Experience
          </motion.h2>
          
          <div className="space-y-6">
            {/* R&D Intern Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900">Research and Development Intern</h3>
                  <p className="text-gray-600 mt-1">HSS (Human Safety Services)</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Dec 2023 - May 2024
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Worked on cybersecurity research and development projects, focusing on security analysis and vulnerability assessment.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Research", "Security Analysis", "Vulnerability Assessment", "Development"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 md:mb-8"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12"
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
              href="mailto:cyber@example.com"
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-gray-900 text-white text-center">
        <p className="text-gray-400 text-sm md:text-base">© 2025 SIYA P P. All rights reserved.</p>
      </footer>
    </div>
  );
};
