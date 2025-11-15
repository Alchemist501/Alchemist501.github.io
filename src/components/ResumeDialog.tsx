import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

export const ResumeDialog = ({ variant = "default" }: { variant?: "default" | "cyber" }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant === "cyber" ? "outline" : "default"} className={variant === "cyber" ? "border-primary text-primary hover:bg-primary hover:text-background" : ""}>
          <FileText className="mr-2 h-4 w-4" />
          Hire Me
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Professional Resume</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </h3>
            <div className="pl-7 space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> siyapp@example.com
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Kerala, India
              </p>
            </div>
          </div>

          {/* About */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold">About Me</h3>
            <div className="pl-7 text-sm space-y-2">
              <p>
                Driven B.Tech student in Computer Science and Business Systems, specializing in Cybersecurity, Backend Development, and AI in security. Proficient in Python, C++, and advanced security tools like Burp Suite, Nmap, and Wireshark.
              </p>
              <p className="font-semibold mt-3">Experience spans:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Offensive Security:</strong> Bug Bounty Hunting on live assets (Meta, Zomato), penetration testing, and ethical hacking</li>
                <li><strong>Secure Systems & Research:</strong> FL-DP Framework (Federated Learning + Differential Privacy) and The Marauder's Map (network anomaly detection)</li>
                <li><strong>Security Operations:</strong> Completed SOC Analyst workflows on LetsDefend.io handling malware and RCE exploitation cases</li>
              </ul>
            </div>
          </div>

          {/* Practical Experience */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Practical Experience
            </h3>
            <div className="pl-7 space-y-3 text-sm">
              <div>
                <h4 className="font-semibold">Research and Development Intern</h4>
                <p className="text-muted-foreground">HSS • Dec 2023 - May 2024</p>
              </div>
              <div>
                <h4 className="font-semibold">Bug Bounty Hunter</h4>
                <p className="text-muted-foreground">Active on platforms hunting vulnerabilities on live assets (Meta, Zomato)</p>
              </div>
              <div>
                <h4 className="font-semibold">Security Training Platforms</h4>
                <p className="text-muted-foreground">TryHackMe • LetsDefend.io • PicoCTF • PortSwigger Labs • Hack The Box</p>
              </div>
              <div>
                <h4 className="font-semibold">IBM SkillsBuild Internship</h4>
                <p className="text-muted-foreground">2-week online internship on CyberSecurity with CSRBOX</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </h3>
            <div className="pl-7 space-y-3 text-sm">
              <div>
                <h4 className="font-semibold">B.Tech in Computer Science and Business Systems</h4>
                <p className="text-muted-foreground">Govt. Model Engineering College, KTU • Expected 2026</p>
                <p className="text-muted-foreground">CGPA: 8.4</p>
              </div>
              <div>
                <h4 className="font-semibold">Higher Secondary Education (12th)</h4>
                <p className="text-muted-foreground">St. Mary's CGHSS, Ernakulam • 2021 • 99%</p>
              </div>
              <div>
                <h4 className="font-semibold">Secondary Education (10th)</h4>
                <p className="text-muted-foreground">St. Mary's CGHSS, Ernakulam • 2019 • 100%</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certifications
            </h3>
            <div className="pl-7">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Google Cybersecurity Professional Certificate</li>
                <li>Ethical Hacking - NPTEL</li>
                <li>CyberSecurity Fundamentals - IBM SkillsBuild</li>
              </ul>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </h3>
            <div className="pl-7">
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>1st Position - Hack-For-Humanity Hackathon (YI-Yuva-MITS 2024)</li>
                <li>Participant - Hac'KP Hackathon 2025 (Kerala Police Cyberdome)</li>
                <li>Completed Advent of Cyber 2024 & 2023 (TryHackMe)</li>
                <li>Participant - CodeRed CTF (Red Team Hacker Academy)</li>
                <li>Participant - Tink-Her-Hack 2022 & 2.0 2023 (Tinker Hub Foundation)</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Technical Skills</h3>
            <div className="pl-7">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <strong>Security:</strong> Penetration Testing, Network Security, Threat Intelligence, SIEM
                </div>
                <div>
                  <strong>Tools:</strong> Burp Suite, Wireshark, Nmap, Scapy, GoPhish
                </div>
                <div>
                  <strong>Languages:</strong> Python, C++, JavaScript, Bash
                </div>
                <div>
                  <strong>Platforms:</strong> Linux, Windows, Git, Flask, Node.js
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Interests & Hobbies</h3>
            <div className="pl-7 text-sm">
              <p><strong>Professional:</strong> Cybersecurity, Backend Development, AI in Security, Bug Bounty Hunting, Agentic AI</p>
              <p className="mt-2"><strong>Personal:</strong> Music, Reading Articles</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
