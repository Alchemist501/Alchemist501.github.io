import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Shield, Cpu, Brain, Award, FileText } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useRole } from "@/contexts/RoleContext";
import { ThemeToggle } from "@/components/ThemeToggle";


const Research = () => {
  const { theme } = useTheme();
  const { role } = useRole();
  const location = useLocation();
  const isProfessional = location.pathname.startsWith("/professional");
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-20 px-4 md:px-8 transition-colors duration-300 ${
      isDark ? "bg-black text-foreground font-mono" : "bg-gray-50 text-gray-900 font-sans"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <Link
            to={isProfessional 
              ? (role === "systems" ? "/professional" : `/professional/${role}`) 
              : (role === "systems" ? "/" : `/${role}`)
            }
            className={`inline-flex items-center transition-colors font-bold text-sm ${
              isDark ? "text-primary hover:text-accent" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl md:text-5xl font-bold mb-12 text-center ${
            isDark ? "glow-green font-mono" : "text-gray-900 "
          }`}
        >
          {isDark ? "< Research & Publications />" : "Research & Publications"}
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main publication area - takes 2 cols */}
          <div className="lg:col-span-2 space-y-8">
            {/* FedDP Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 md:p-8 rounded-xl border transition-all duration-300 glow-card-hover ${
                isDark 
                  ? "glass-card border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.05)]" 
                  : "glass-card border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${isDark ? "bg-primary/10 text-primary" : "bg-gray-150 text-gray-900"}`}>
                  <Brain className="w-8 h-8" />
                </div>
                <div>
                  <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${isDark ? "text-accent" : "text-gray-500"}`}>
                    Active Research Framework
                  </span>
                  <h2 className={`text-2xl font-bold mt-1 ${isDark ? "text-primary" : "text-gray-900 "}`}>
                    FEDDP: Federated Learning with Differential Privacy
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                <p>
                  Collaboratively trained ML models face massive security vulnerabilities, specifically membership inference and model inversion attacks. 
                  My research proposes an end-to-end framework integrating <strong>Federated Learning (FL)</strong> and <strong>Differential Privacy (DP)</strong> 
                  to allow secure collaborative training of neural networks without compromising local training data.
                </p>
                <p>
                  By deploying localized noise injection during client training rounds using <strong>TensorFlow</strong>, <strong>Flower (FLwr)</strong>, 
                  and <strong>PySyft</strong>, we bound privacy leaks mathematically while maintaining competitive validation accuracies.
                </p>
              </div>

              {/* Metrics */}
              <div className="mt-8 border-t border-dashed border-primary/20 pt-6">
                <h3 className={`text-lg font-bold mb-4 font-mono ${isDark ? "text-accent" : "text-gray-900"}`}>
                  Key Verification Metrics
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "95%+ Local model validation accuracy",
                    "Zero raw client training data leakage",
                    "Adaptive noise injection (Differential Privacy ε-δ bounds)",
                    "Sub-second parameter sync aggregation benchmarks"
                  ].map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={isDark ? "text-accent font-bold" : "text-gray-900 font-bold"}>✔</span>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Specialized Areas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 md:p-8 rounded-xl border transition-all duration-300 glow-card-hover ${
                isDark 
                  ? "glass-card border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.05)]" 
                  : "glass-card border-gray-200 shadow-sm"
              }`}
            >
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-primary" : "text-gray-900"}`}>
                <FileText className="w-5 h-5" />
                Specialized Research Interests
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Privacy & Security in Online Social Media (NPTEL Research Course)",
                    desc: "Investigated metadata disclosure vectors, user de-anonymization attacks, and information dissemination dynamics. Analyzed structural anonymity and designed containment models for adversarial information leakage.",
                    icon: Shield
                  },
                  {
                    title: "Performance-Aware Edge AI Systems",
                    desc: "Architecting resource-optimized computer vision pipelines (OpenCV, ResNet) running on low-power edge nodes. Minimizing footprint (<2 MB) and CPU cycle occupancy to deliver real-time predictions.",
                    icon: Cpu
                  },
                  {
                    title: "Automated Privilege Escalation Detection",
                    desc: "Researching automated static and dynamic inspection rules for AWS IAM configurations. Mapping privilege escalation chains to prevent zero-day lateral movement.",
                    icon: Shield
                  }
                ].map((interest, idx) => {
                  const IntIcon = interest.icon;
                  return (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className={`p-2 rounded mt-1 ${isDark ? "bg-primary/5 text-primary" : "bg-gray-100 text-gray-700"}`}>
                        <IntIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${isDark ? "text-accent" : "text-gray-900"}`}>{interest.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{interest.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Certifications & Coursework Column - 1 col */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-xl border transition-all duration-300 glow-card-hover ${
                isDark 
                  ? "glass-card border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.05)]" 
                  : "glass-card border-gray-200 shadow-sm"
              }`}
            >
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? "text-primary" : "text-gray-900"}`}>
                <Award className="w-5 h-5" />
                Certifications
              </h2>

              <div className="space-y-4">
                {[
                  { name: "Google Cybersecurity Specialization", issuer: "Google" },
                  { name: "Privacy & Security in Online Social Media", issuer: "NPTEL - Elite Silver Badge" },
                  { name: "Practical Cybersecurity for Practitioners", issuer: "NPTEL" },
                  { name: "Ethical Hacking", issuer: "NPTEL" },
                  { name: "Cybersecurity Fundamentals", issuer: "IBM SkillsBuild" }
                ].map((cert, i) => (
                  <div key={i} className={`p-3 rounded border transition-colors ${
                    isDark ? "border-primary/20 bg-primary/5 hover:border-primary/45" : "border-gray-200 bg-gray-100/50 hover:bg-gray-100"
                  }`}>
                    <p className={`text-sm font-bold ${isDark ? "text-primary" : "text-gray-900"}`}>{cert.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-6 rounded-xl border transition-all duration-300 glow-card-hover ${
                isDark 
                  ? "glass-card border-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.05)]" 
                  : "glass-card border-gray-200 shadow-sm"
              }`}
            >
              <h2 className={`text-lg font-bold mb-4 ${isDark ? "text-primary" : "text-gray-900"}`}>
                Conference & Papers
              </h2>
              <div className="space-y-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex gap-2">
                  <span className="font-bold text-accent">●</span>
                  <p>
                    <strong>FedDP Framework:</strong> Paper under review detailing the privacy-utility tradeoff optimization under localized client noise perturbations.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="font-bold text-accent">●</span>
                  <p>
                    Investigating zero-knowledge proof protocols to verify model weight updates without parameter extraction.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
