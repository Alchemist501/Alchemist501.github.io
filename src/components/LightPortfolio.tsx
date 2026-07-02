import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Menu, X, ExternalLink, BookOpen, Cpu, Shield, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ResumeDialog } from "@/components/ResumeDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useRole } from "@/contexts/RoleContext";
import { Bitmoji } from "@/components/Bitmoji";
import { useState, useEffect, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SPECIALIZATIONS } from "@/lib/config";

const skillRoleStyles: Record<string, {
  accentText: string;
  badge: string;
  cardBorder: string;
  interestBadge: string;
}> = {
  systems: {
    accentText: "text-indigo-950 font-bold font-mono",
    badge: "bg-white/60 text-indigo-950 border border-indigo-150/40 hover:bg-white/95 hover:border-indigo-300/40",
    cardBorder: "bg-white/85 border border-white/40 shadow-sm hover:shadow-md hover:border-white/60 backdrop-blur-md",
    interestBadge: "bg-white/60 text-indigo-950 border border-indigo-150/40"
  },
  cybersecurity: {
    accentText: "text-indigo-950 font-bold font-mono",
    badge: "bg-white/60 text-indigo-950 border border-indigo-150/40 hover:bg-white/95 hover:border-indigo-300/40",
    cardBorder: "bg-white/85 border border-white/40 shadow-sm hover:shadow-md hover:border-white/60 backdrop-blur-md",
    interestBadge: "bg-white/60 text-indigo-950 border border-indigo-150/40"
  },
  ai: {
    accentText: "text-indigo-950 font-bold font-mono",
    badge: "bg-white/60 text-indigo-950 border border-indigo-150/40 hover:bg-white/95 hover:border-indigo-300/40",
    cardBorder: "bg-white/85 border border-white/40 shadow-sm hover:shadow-md hover:border-white/60 backdrop-blur-md",
    interestBadge: "bg-white/60 text-indigo-950 border border-indigo-150/40"
  }
};

export const LightPortfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isProfessional = location.pathname.startsWith("/professional");
  const { role } = useRole();
  const styles = skillRoleStyles[role] || skillRoleStyles.systems;
  const [skillsAnimateKey, setSkillsAnimateKey] = useState(0);

  const orderedSkills = useMemo(() => {
    if (role === "systems") {
      return [
        {
          id: "core",
          category: "Core Systems",
          skills: ["Memory Management", "Concurrency", "Lock-free Programming", "Kernel Space", "Low-Latency Data Structures"],
        },
        {
          id: "languages",
          category: "Languages",
          skills: ["C++", "Rust", "Go", "C", "Bash"],
        },
        {
          id: "platforms",
          category: "Platforms & Tools",
          skills: ["Linux", "UNIX/POSIX", "Git", "Docker", "eBPF"],
        },
        {
          id: "other",
          category: "Interests & Infra",
          skills: ["Network Programming", "Performance Auditing", "Distributed Systems"],
        }
      ];
    } else if (role === "cybersecurity") {
      return [
        {
          id: "core",
          category: "Security Operations",
          skills: ["SIEM (Splunk)", "Threat Detection", "Incident Response", "Vulnerability Analysis"],
        },
        {
          id: "testing",
          category: "Offensive Security",
          skills: ["Penetration Testing", "OWASP Top 10", "Burp Suite", "Nmap", "Metasploit"],
        },
        {
          id: "tools",
          category: "Tools & Scripting",
          skills: ["Scapy", "GoPhish", "YARA", "AWS IAM Security", "Python"],
        },
        {
          id: "infra",
          category: "Network Defense",
          skills: ["Wireshark", "IDS/IPS Auditing", "eBPF Syscall Auditing", "Linux Security"],
        }
      ];
    } else {
      return [
        {
          id: "core",
          category: "Deep Learning",
          skills: ["TensorFlow", "PyTorch", "Transformers", "Model Optimization", "CUDA"],
        },
        {
          id: "distributed",
          category: "Distributed ML",
          skills: ["Federated Learning (Flower)", "Differential Privacy", "Secure Aggregation", "PySyft"],
        },
        {
          id: "vision",
          category: "Computer Vision",
          skills: ["OpenCV", "ResNet (CNN)", "Image Processing", "Feature Extraction"],
        },
        {
          id: "dev",
          category: "Backend & Systems",
          skills: ["Python", "Flask", "C++ Engine Integrations", "Linux Execution", "REST APIs"],
        }
      ];
    }
  }, [role]);

  const orderedInterests = useMemo(() => {
    const allInterests = [
      { name: "Low-Latency Systems", rolePriority: { systems: 1, cybersecurity: 5, ai: 4 } },
      { name: "Distributed Infrastructure", rolePriority: { systems: 2, cybersecurity: 6, ai: 3 } },
      { name: "Backend Engineering", rolePriority: { systems: 3, cybersecurity: 7, ai: 5 } },
      { name: "Computer Architecture", rolePriority: { systems: 4, cybersecurity: 8, ai: 6 } },
      { name: "Cybersecurity", rolePriority: { systems: 7, cybersecurity: 1, ai: 8 } },
      { name: "Penetration Testing", rolePriority: { systems: 8, cybersecurity: 2, ai: 9 } },
      { name: "Threat Detection", rolePriority: { systems: 6, cybersecurity: 3, ai: 7 } },
      { name: "Security Automation", rolePriority: { systems: 5, cybersecurity: 4, ai: 10 } },
      { name: "Distributed Learning", rolePriority: { systems: 9, cybersecurity: 10, ai: 1 } },
      { name: "AI in Security", rolePriority: { systems: 10, cybersecurity: 9, ai: 2 } },
    ];

    return [...allInterests]
      .sort((a, b) => a.rolePriority[role] - b.rolePriority[role])
      .map(item => item.name);
  }, [role]);

  // Achievements Carousel State
  const [achievementsApi, setAchievementsApi] = useState<CarouselApi>();
  const [achievementsScrollProgress, setAchievementsScrollProgress] = useState(0);
  const [achievementsHasScroll, setAchievementsHasScroll] = useState(false);

  const achievements = useMemo(() => [
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
  ], []);

  const handleAchievementsSliderChange = (value: number[]) => {
    if (!achievementsApi) return;
    const targetIndex = Math.round((value[0] / 100) * (achievements.length - 1));
    achievementsApi.scrollTo(targetIndex);
  };

  useEffect(() => {
    if (!achievementsApi) {
      return;
    }

    const onScroll = (api: CarouselApi) => {
      if (!api) return;
      try {
        const progress = Math.max(0, Math.min(1, api.scrollProgress()));
        setAchievementsScrollProgress(progress * 100);
      } catch (error) {
        console.error('Achievements carousel scroll error:', error);
      }
    };

    const checkScrollability = (api: CarouselApi) => {
      if (!api) return;
      try {
        setAchievementsHasScroll(api.canScrollNext() || api.canScrollPrev());
      } catch (error) {
        console.error('Achievements carousel scrollability check error:', error);
      }
    };

    achievementsApi.on("scroll", onScroll);
    achievementsApi.on("reInit", onScroll);
    achievementsApi.on("reInit", checkScrollability);
    achievementsApi.on("select", checkScrollability);

    // Initial check
    checkScrollability(achievementsApi);

    return () => {
      try {
        achievementsApi.off("scroll", onScroll);
        achievementsApi.off("reInit", onScroll);
        achievementsApi.off("reInit", checkScrollability);
        achievementsApi.off("select", checkScrollability);
      } catch (error) {
        // Ignore cleanup errors during unmount
      }
    };
  }, [achievementsApi]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync active section with hash on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Scroll to section on mount if hash exists
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "glass-header py-4" : "bg-transparent py-6"}`}>
        <nav className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Hire Me Button */}
              <div className="md:hidden">
                <ResumeDialog />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                key={scrolled ? "name" : "question"}
                className={`transition-all duration-300 ${!scrolled ? "font-sans font-bold text-lg md:text-xl" : " text-2xl md:text-3xl font-bold"}`}
              >
                {/* Show question on desktop if not scrolled, otherwise show name. Hidden on mobile. */}
                <span className="hidden md:inline">
                  {scrolled ? "SIYA P P" : "Want to know more about me?"}
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-6">
              <div className="flex items-center gap-4 text-lg font-sans font-bold">
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('projects')} className="text-gray-600 hover:text-gray-900 transition-colors">
                  Projects
                </button>
                <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-gray-900 transition-colors">
                  Skills
                </button>
                <button onClick={() => scrollToSection('achievements')} className="text-gray-600 hover:text-gray-900 transition-colors">
                  Achievements
                </button>
                <button onClick={() => scrollToSection('experience')} className="text-gray-600 hover:text-gray-900 transition-colors">
                  Experience
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact
                </button>
                <Link to={isProfessional ? "/professional/blog" : "/blog"} className="text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </Link>
              </div>

              <div className="h-6 w-px bg-gray-200 mx-2" />

              <div className="flex items-center gap-3">
                <ResumeDialog />
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
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
              className="md:hidden mt-4 pb-4 space-y-3 font-sans font-bold text-lg bg-white border-t border-gray-100 shadow-lg absolute left-0 right-0 px-4 top-full"
            >
              <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-50">
                About
              </button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-50">
                Projects
              </button>
              <button onClick={() => scrollToSection('skills')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-50">
                Skills
              </button>
              <button onClick={() => scrollToSection('achievements')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-50">
                Achievements
              </button>
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-50">
                Experience
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors border-b border-gray-50">
                Contact
              </button>
              <Link to={isProfessional ? "/professional/blog" : "/blog"} className="block w-full text-left py-2 text-gray-700 hover:text-gray-900 transition-colors">
                Blog
              </Link>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20 bg-gradient-to-br from-gray-50 to-white pt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div {...fadeIn}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="bg-gradient-to-r from-gray-950 via-gray-800 to-gray-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hey!
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-gray-950 via-gray-800 to-gray-600 bg-clip-text text-transparent mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I am SIYA P P
              </motion.div>
            </motion.h1>

            <p className="text-xs md:text-sm text-primary font-mono uppercase tracking-widest font-bold opacity-80 mb-4">
              {SPECIALIZATIONS[role].subtitle}
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-xl">
              {SPECIALIZATIONS[role].description}
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
            className="space-y-6 text-lg leading-relaxed text-gray-700 font-sans font-medium"
          >
            <p>
              I'm Tech Enthusiast who finds beauty in how systems work—how small pieces connect, how patterns form, and how a simple idea can turn into something meaningful when built with intention. This perspective shapes the way I approach backend development, automation, and privacy-focused digital solutions. I enjoy breaking down problems, understanding them deeply, and designing tools that make processes smoother, more organized, and more efficient. As a CSBS undergrad, I combine technical thinking with practical application, aiming to create solutions that are clear, reliable, and genuinely useful to the people who rely on them.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {SPECIALIZATIONS[role].aboutCards.map((card, index) => (
                <div key={index} className="glass-card p-6 rounded-xl border border-gray-150 glow-card-hover">
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-sm font-sans font-medium">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section - Custom Pastel Purple (#C5ADC5) and Light Steel Blue (#B2B5E0) Gradient */}
      <section 
        id="skills" 
        className="py-20 md:py-28 text-slate-900 border-t border-b border-white/20"
        style={{ background: 'linear-gradient(135deg, #C5ADC5 0%, #B2B5E0 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setSkillsAnimateKey(prev => prev + 1)}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-center tracking-tight text-indigo-950 cursor-pointer select-none active:scale-[0.97] transition-transform duration-150"
            title="Click to animate cards"
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-indigo-900/80 max-w-2xl mx-auto mb-12 text-sm md:text-base font-sans"
          >
            Specialized technical toolkit structured around core capabilities, tools, languages, and runtime environments.
          </motion.p>
          
          <motion.div key={skillsAnimateKey} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {orderedSkills.map((group, i) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ 
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className={`p-6 rounded-xl border transition-all duration-300 ${styles.cardBorder} cursor-default`}
              >
                <h3 className={`text-lg font-bold font-mono mb-4 ${styles.accentText}`}>{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span
                      key={j}
                      className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-300 ${styles.badge}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Domain Focus & Interests */}
          <motion.div
            key={`interests-${skillsAnimateKey}`}
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: orderedSkills.length * 0.1
            }}
            className="mt-12 bg-white/50 border border-white/30 backdrop-blur-md p-8 rounded-xl cursor-default transition-all duration-300"
          >
            <h3 className={`text-xl font-bold font-mono mb-6 ${styles.accentText}`}>Domain Focus & Interests</h3>
            <div className="flex flex-wrap gap-3">
              {orderedInterests.map((interest) => (
                <span
                  key={interest}
                  className={`px-4 py-2 text-xs md:text-sm font-mono rounded-full border transition-all duration-300 ${styles.interestBadge}`}
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Immersive Dark Gallery Look */}
      <section id="projects" className="py-20 md:py-28 bg-slate-950 text-white border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold mb-4 text-center tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-12 md:mb-16"
          >
            Explore a curated selection of systems infrastructure, cybersecurity platforms, and AI models.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ProjectFilter theme="dark" layout="grid" />
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-12 md:py-20 px-4 md:px-8 bg-gray-50 border-t border-b border-gray-150">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
          >
            Research & Publications
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-150">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                FEDDP: Federated Learning with Differential Privacy
              </h3>
              <p className="text-sm font-semibold text-gray-500 font-mono mb-4 uppercase tracking-wider">
                Collaborative Privacy-Preserving ML Research
              </p>
              <p className="text-gray-700 font-sans font-medium leading-relaxed mb-4">
                Researching strategies to build collaborative machine learning models without sharing raw user data. Developed a Python framework combining Federated Learning and Differential Privacy (DP). By adding mathematically calibrated noise to client updates before aggregation, we safeguard edge devices against training-data reconstruction attacks and reverse-engineering, preserving user privacy.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Federated Learning", "Differential Privacy", "TensorFlow", "Flower", "PySyft"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-150">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Academic Research Focus Areas
              </h3>
              <ul className="space-y-3 list-disc list-inside text-gray-700 font-sans font-medium">
                <li>
                  <strong className="text-gray-900 font-sans font-bold">Privacy & Security in Online Social Media:</strong> Advanced NPTEL research coursework covering network analysis, information dissemination models, profiling attacks, and de-anonymization techniques.
                </li>
                <li>
                  <strong className="text-gray-900 font-sans font-bold">Performance-Aware AI Systems:</strong> Combining deep learning optimizations with low-overhead hardware interfaces for real-time edge devices.
                </li>
                <li>
                  <strong className="text-gray-900 font-sans font-bold">Security Automation:</strong> Researching automated static and dynamic analysis rules for zero-trust cloud configuration analysis.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center"
          >
            Achievements
          </motion.h2>
        </div>

        <div className="w-full group relative pb-12">
          <Carousel
            setApi={setAchievementsApi}
            opts={{ loop: false, align: "start", dragFree: true }}
            className="w-full mx-auto cursor-grab active:cursor-grabbing"
          >
            <CarouselContent className="-ml-4">
              {achievements.map((achievement, i) => (
                <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group h-full flex flex-col"
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                      {achievement.image ? (
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl md:text-6xl">{achievement.emoji}</span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 font-sans font-medium">{achievement.org}</p>
                      <p className="text-sm text-gray-600 mb-3 font-sans font-medium line-clamp-2">{achievement.description}</p>
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-xs text-gray-900 hover:text-gray-600 transition-colors font-semibold uppercase tracking-wider"
                      >
                        View Details →
                      </a>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Interactive Scroll Bar */}
          {achievementsHasScroll && (
            <div className="absolute -bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full max-w-3xl px-4">
                <Slider
                  defaultValue={[0]}
                  value={[achievementsScrollProgress]}
                  max={100}
                  step={1}
                  onValueChange={handleAchievementsSliderChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 md:px-8 mt-16"
        >
          <h3 className="text-2xl font-bold mb-6">Certifications</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-2">📜</div>
                <p className="font-semibold text-gray-900">{cert.name}</p>
                {cert.org && <p className="text-sm text-gray-600 font-sans font-medium">{cert.org}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>
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
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Research and Development Intern</h3>
                  <p className="text-sm text-gray-600 mt-1 font-sans font-medium">HSS (Harish Software Solutions )</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Dec 2023 - May 2024
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 font-sans font-medium">
                  Built scalable backend systems. Involved in building secure and efficient backend systems, implementing APIs, and ensuring data integrity.                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Research", "Security Analysis", "Vulnerability Assessment", "Development"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full">
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
              className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Bug Bounty Hunter</h3>
                  <p className="text-sm text-gray-600 mt-1 font-sans font-medium">Independent Security Researcher</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Ongoing
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 font-sans font-medium">
                  Active on platforms hunting vulnerabilities on live assets including Meta and Zomato. Performing continuous reconnaissance and vulnerability assessments.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Penetration Testing", "Vulnerability Assessment", "Ethical Hacking", "Web Security"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full">
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
              className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">Security Training Platforms</h3>
                  <p className="text-sm text-gray-600 mt-1 font-sans font-medium">Continuous Learning & Practice</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  Ongoing
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 font-sans font-medium">
                  Active participant on multiple cybersecurity training platforms, completing challenges and improving practical security skills.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["TryHackMe", "LetsDefend.io", "PicoCTF", "PortSwigger Labs", "Hack The Box"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs md:text-sm rounded-full">
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
              className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">IBM SkillsBuild Internship</h3>
                  <p className="text-sm text-gray-600 mt-1 font-sans font-medium">CSRBOX</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0">
                  2-week Program
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700 font-sans font-medium">
                  Completed intensive 2-week online internship focused on cybersecurity fundamentals and practical applications.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Cybersecurity Fundamentals", "IBM SkillsBuild", "Online Training"].map((skill) => (
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
            className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 font-sans font-medium"
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
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/alchemist501"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Alchemist501"
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm md:text-base font-sans font-medium">© 2025 SIYA P P. All rights reserved.</p>
        </div>
      </footer>
    </div >
  );
};
