import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Linkedin, Github, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const ResumeDialog = ({ variant = "default" }: { variant?: "default" | "cyber" }) => {
  const [scale, setScale] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Calculate scale to fit 794px (A4 width) into current window width
        // Subtracting 32px for padding/margins
        const newScale = (window.innerWidth - 32) / 794;
        setScale(newScale);
      } else {
        setScale(1);
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant === "cyber" ? "outline" : "default"} className={variant === "cyber" ? "border-primary text-primary hover:bg-primary hover:text-background" : ""}>
          <FileText className="mr-2 h-4 w-4" />
          Hire Me
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto z-[200] w-full p-0 md:p-6 bg-background">
        <div className="w-full h-full overflow-x-hidden overflow-y-auto p-4 md:p-0">
          <div
            style={{
              transform: window.innerWidth < 768 ? `scale(${scale})` : 'none',
              transformOrigin: 'top left',
              width: window.innerWidth < 768 ? '794px' : '100%',
              marginBottom: window.innerWidth < 768 ? `-${(1 - scale) * 100}%` : '0' // Compensate for scale whitespace
            }}
            className="bg-background transition-transform duration-200"
          >
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center">SIYA P P</DialogTitle>
              <p className="text-center text-sm text-muted-foreground">Cybersecurity Researcher | Bug Bounty Hunter | Backend Developer</p>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Contact Information */}
              <div className="border-b pb-4">
                <div className="flex flex-col gap-2 text-xs">
                  {/* Row 1: Links (Left) and Email (Right) */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <a href="https://www.linkedin.com/in/alchemist501" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Linkedin className="h-3.5 w-3.5" />
                        <span>LinkedIn</span>
                      </a>
                      <span className="text-muted-foreground">|</span>
                      <a href="https://github.com/Alchemist501" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                      <span className="text-muted-foreground">|</span>
                      <a href="https://alchemist501.github.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Globe className="h-3.5 w-3.5" />
                        <span>Portfolio</span>
                      </a>
                      <span className="text-muted-foreground">|</span>
                      <a href="https://tryhackme.com/p/HoloCrypt" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Code className="h-3.5 w-3.5" />
                        <span>TryHackMe</span>
                      </a>
                    </div>
                    <a href="mailto:siyapp.mec@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Mail className="h-3.5 w-3.5" />
                      <span>siyapp.mec@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1">Professional Summary</h3>
                <p className="text-sm leading-relaxed">
                  Tech Enthusiast who finds beauty in how systems work—how small pieces connect, how patterns form, and how a simple idea can turn into something meaningful when built with intention. This perspective shapes the way I approach backend development, automation, and privacy-focused digital solutions. I enjoy breaking down problems, understanding them deeply, and designing tools that make processes smoother, more organized, and more efficient. As a CSBS undergrad, I combine technical thinking with practical application, aiming to create solutions that are clear, reliable, and genuinely useful to the people who rely on them.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1 flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-semibold">Security & Testing:</p>
                    <p className="text-muted-foreground">Penetration Testing, Network Security, Threat Intelligence, SIEM, Vulnerability Assessment, Ethical Hacking</p>
                  </div>
                  <div>
                    <p className="font-semibold">Security Tools:</p>
                    <p className="text-muted-foreground">Burp Suite, Wireshark, Nmap, Scapy, GoPhish, Metasploit</p>
                  </div>
                  <div>
                    <p className="font-semibold">Programming Languages:</p>
                    <p className="text-muted-foreground">Python, C++, JavaScript, Bash, SQL</p>
                  </div>
                  <div>
                    <p className="font-semibold">Frameworks & Platforms:</p>
                    <p className="text-muted-foreground">Linux, Windows, Git, Flask, Node.js, React</p>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Experience
                </h3>

                {/* Bug Bounty Hunter */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">Bug Bounty Hunter</h4>
                      <p className="text-sm text-muted-foreground">Independent Security Researcher</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Ongoing</p>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4 text-muted-foreground">
                    <li>Actively hunting vulnerabilities on live assets including Meta and Zomato platforms</li>
                    <li>Performing continuous reconnaissance and comprehensive vulnerability assessments</li>
                    <li>Conducting penetration testing and ethical hacking on web applications</li>
                    <li>Identifying and reporting security flaws following responsible disclosure practices</li>
                  </ul>
                </div>

                {/* R&D Intern */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">Research and Development Intern</h4>
                      <p className="text-sm text-muted-foreground">HSS (Harish Software Systems)</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Dec 2023 - May 2024</p>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4 text-muted-foreground">
                    <li>Conducted research in scalable backend systems.</li>
                    <li>Involved in building secure and efficient backend systems, implementing APIs, and ensuring data integrity.</li>
                    <li>Collaborated with cross-functional teams to implement security best practices</li>
                    <li>Developed and tested security solutions for client applications</li>
                  </ul>
                </div>

                {/* IBM SkillsBuild */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">Cybersecurity Intern</h4>
                      <p className="text-sm text-muted-foreground">IBM SkillsBuild with CSRBOX</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2-week Program</p>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4 text-muted-foreground">
                    <li>Completed intensive cybersecurity fundamentals training program</li>
                    <li>Gained practical knowledge in security operations and threat analysis</li>
                    <li>Applied cybersecurity concepts to real-world scenarios and case studies</li>
                  </ul>
                </div>

                {/* Security Training */}
                <div className="space-y-1">
                  <div>
                    <h4 className="font-bold">Security Training & Continuous Learning</h4>
                    <p className="text-sm text-muted-foreground">Multiple Platforms | Ongoing</p>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4 text-muted-foreground">
                    <li>Active participant on TryHackMe, LetsDefend.io, PicoCTF, PortSwigger Labs, and Hack The Box</li>
                    <li>Completed SOC Analyst workflows handling malware side-loading and RCE exploitation cases</li>
                    <li>Regularly solving CTF challenges and security labs to enhance practical skills</li>
                  </ul>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">B.Tech in Computer Science and Business Systems</h4>
                      <p className="text-sm text-muted-foreground">Govt. Model Engineering College, Kerala Technological University (KTU)</p>
                      <p className="text-sm font-semibold">CGPA: 8.4/10</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Expected 2026</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">Higher Secondary Education (12th)</h4>
                      <p className="text-sm text-muted-foreground">St. Mary's CGHSS, Ernakulam</p>
                      <p className="text-sm font-semibold">Percentage: 99%</p>
                    </div>
                    <p className="text-sm text-muted-foreground">2021</p>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Certifications
                </h3>
                <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                  <li><strong>Google Cybersecurity Professional Certificate</strong></li>
                  <li><strong>Ethical Hacking</strong> - NPTEL</li>
                  <li><strong>Cybersecurity Fundamentals</strong> - IBM SkillsBuild</li>
                </ul>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1 flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Projects
                </h3>
                <div className="space-y-3 text-sm">
                  {/* The Marauder's Map */}
                  <div>
                    <h4 className="font-bold">THE MARAUDER'S MAP</h4>
                    <p className="text-muted-foreground mt-1">
                      Network Reconnaissance and Anomaly Detector - Python-based security application for proactive defense and monitoring with packet sniffing using Scapy, SQLite storage, and Flask web interface.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> Python, Scapy, Flask, SQLite
                    </p>
                  </div>

                  {/* LetsDefend SOC Simulation */}
                  <div>
                    <h4 className="font-bold">LETSDEFEND.IO - SOC ANALYST SIMULATION</h4>
                    <p className="text-muted-foreground mt-1">
                      Simulated core SOC Analyst workflows focusing on rapid incident response, detection, and analysis using SIEM, Threat Intelligence, and Incident Response Playbooks for complex cases including malware and RCE exploitations.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> SIEM, Threat Intelligence, Incident Response
                    </p>
                  </div>

                  {/* Phishing Simulation Campaign */}
                  <div>
                    <h4 className="font-bold">PHISHING SIMULATION CAMPAIGN</h4>
                    <p className="text-muted-foreground mt-1">
                      Security awareness campaign using GoPhish deployed on Railway with Mailtrap integration. Ethical hacking to measure human risk, create custom phishing content, and track user interaction via live dashboard.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> GoPhish, Railway, Mailtrap, Social Engineering
                    </p>
                  </div>

                  {/* FL-DP Framework */}
                  <div>
                    <h4 className="font-bold">FL-DP FRAMEWORK</h4>
                    <p className="text-muted-foreground mt-1">
                      Secure Collaborative Machine Learning - Privacy and Security Research framework integrating Federated Learning (FL) and Differential Privacy (DP) to protect sensitive data across multi-client environments.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> Python, TensorFlow, Flower, PySyft
                    </p>
                  </div>

                  {/* SubWhisper */}
                  <div>
                    <h4 className="font-bold">SUBWHISPER</h4>
                    <p className="text-muted-foreground mt-1">
                      Automated reconnaissance utility for bug bounty hunting. Integrates popular asset discovery tools (Subfinder, Assetfinder) into a single efficient workflow, improving speed and comprehensiveness of initial target analysis.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> Python, Subfinder, Assetfinder, Automation
                    </p>
                  </div>

                  {/* Aggrow */}
                  <div>
                    <h4 className="font-bold">AGGROW</h4>
                    <p className="text-muted-foreground mt-1">
                      AI-driven web application for agricultural insights using ResNet (CNN) model with OpenCV and Scikit-learn. Built on Python/Flask stack for crop disease detection and farming recommendations.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> Python, Flask, ResNet, OpenCV, Scikit-learn
                    </p>
                  </div>

                  {/* BioSignals */}
                  <div>
                    <h4 className="font-bold">BIOSIGNALS</h4>
                    <p className="text-muted-foreground mt-1">
                      Flask-based system using OpenCV to analyze animal behavior in real-time. Detects unusual patterns and triggers alerts for disaster prediction, demonstrating proficiency in Python, Flask, and computer vision.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> Python, Flask, OpenCV, Computer Vision
                    </p>
                  </div>

                  {/* Deadline Extractor */}
                  <div>
                    <h4 className="font-bold">DEADLINE EXTRACTOR</h4>
                    <p className="text-muted-foreground mt-1">
                      Chrome extension that automatically extracts and organizes deadlines from Google Classroom. Streamlines academic task management by parsing assignment data and presenting it in an accessible format.
                    </p>
                    <p className="text-muted-foreground mt-1">
                      <strong>Technologies:</strong> JavaScript, Chrome Extension API, HTML/CSS
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements & Competitions */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements & Competitions
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-semibold">Hackathons:</p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground space-y-1">
                      <li><strong>1st Position</strong> - Hack-For-Humanity Hackathon (YI-Yuva-MITS 2024)</li>
                      <li>Participant - Hac'KP Hackathon 2025 (Kerala Police Cyberdome)</li>
                      <li>Participant - Tink-Her-Hack 2022 & 2.0 2023 (Tinker Hub Foundation)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold">CTF Competitions:</p>
                    <ul className="list-disc list-inside ml-4 text-muted-foreground space-y-1">
                      <li>Completed Advent of Cyber 2024 & 2023 (TryHackMe)</li>
                      <li>Participant - CodeRed CTF (Red Team Hacker Academy)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase border-b-2 border-primary pb-1">Areas of Interest</h3>
                <div className="text-sm">
                  <p><strong>Professional:</strong> Cybersecurity, Backend Development, AI in Security, Bug Bounty Hunting, Agentic AI, Secure Systems Design</p>
                  <p className="mt-1"><strong>Personal:</strong> Music, Reading Technical Articles, Open Source Contributions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
