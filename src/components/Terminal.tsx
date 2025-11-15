import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

interface TerminalProps {
  onCommand: (command: string) => void;
}

// File system structure
const fileSystem: Record<string, string[]> = {
  "~": ["about/", "projects/", "skills/", "achievements/", "experience/", "contact/"],
  "~/about": ["offensive_security.txt", "secure_systems.txt", "security_operations.txt"],
  "~/projects": ["marauders_map.txt", "letsdefend_soc.txt", "phishing_campaign.txt", "fl_dp_framework.txt", "subwhisper.txt", "aggrow.txt", "biosignals.txt", "deadline_extractor.txt"],
  "~/skills": ["security/", "tools/", "languages/", "platforms/"],
  "~/skills/security": ["penetration_testing", "network_security", "threat_intelligence", "siem"],
  "~/skills/tools": ["burp_suite", "wireshark", "nmap", "scapy", "gophish", "git"],
  "~/skills/languages": ["python", "cpp", "javascript", "bash"],
  "~/skills/platforms": ["linux", "windows", "flask", "nodejs"],
  "~/achievements": ["hackathons/", "certifications/"],
  "~/achievements/hackathons": ["hack_for_humanity.txt", "hackp.txt", "advent_of_cyber.txt", "ibm_internship.txt", "tinkerhack.txt", "codered_ctf.txt"],
  "~/achievements/certifications": ["google_cybersecurity.txt", "ethical_hacking_nptel.txt", "ibm_fundamentals.txt"],
  "~/experience": ["hss_internship.txt"],
  "~/contact": ["email.txt", "linkedin.txt", "github.txt"],
};

export const Terminal = ({ onCommand }: TerminalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to CyberSec Terminal v2.0",
    "Type 'help' for available commands",
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentDir, setCurrentDir] = useState("~");
  const [isDragging, setIsDragging] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(192);
  const [terminalWidth, setTerminalWidth] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const [binaryAnimation, setBinaryAnimation] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const sections = ["about", "projects", "skills", "achievements", "experience", "contact"];
  const availableCommands = ["help", "ls", "cd", "pwd", "about", "projects", "skills", "achievements", "experience", "contact", "clear"];

  // Binary animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      const binary = Array.from({ length: 40 }, () => Math.random() > 0.5 ? '1' : '0').join('');
      setBinaryAnimation(binary);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const commands = {
    help: () => [
      "Available commands:",
      "  ls           - List contents of current directory",
      "  cd <path>    - Navigate to a directory (use '..' to go up)",
      "  pwd          - Print current directory",
      "  about        - Learn about me",
      "  projects     - View cybersecurity projects",
      "  skills       - Explore technical skills",
      "  achievements - View my achievements",
      "  experience   - View my experience",
      "  contact      - Get in touch",
      "  clear        - Clear terminal",
    ],
    ls: () => {
      const contents = fileSystem[currentDir] || [];
      if (contents.length === 0) {
        return ["Directory is empty"];
      }
      return contents.map(item => `  ${item}`);
    },
    pwd: () => [`${currentDir}`],
    clear: () => {
      setHistory([]);
      return [];
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Autocomplete suggestions
    if (value.trim()) {
      const matches = availableCommands.filter(cmd => 
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleTabComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const fullCmd = input.trim();
    const [cmd, ...args] = fullCmd.toLowerCase().split(" ");
    setHistory((prev) => [...prev, `${currentDir} > ${fullCmd}`]);

    if (cmd === "cd") {
      const target = args[0];
      if (!target) {
        setHistory((prev) => [...prev, "cd: missing operand"]);
      } else if (target === "~") {
        setCurrentDir("~");
        setHistory((prev) => [...prev, "Navigating to home..."]);
        onCommand("network");
      } else if (target === "..") {
        // Go up one directory
        if (currentDir === "~") {
          setHistory((prev) => [...prev, "Already at root directory"]);
        } else {
          const parts = currentDir.split("/");
          parts.pop();
          const newDir = parts.join("/") || "~";
          setCurrentDir(newDir);
          
          // If we're back at root, show network
          if (newDir === "~") {
            setHistory((prev) => [...prev, "Navigating to home..."]);
            onCommand("network");
          } else {
            setHistory((prev) => [...prev, `Navigating to ${newDir}...`]);
          }
        }
      } else {
        // Try to navigate to target
        const newPath = currentDir === "~" ? `~/${target}` : `${currentDir}/${target}`;
        const normalizedPath = newPath.replace(/\/$/, ""); // Remove trailing slash
        
        if (fileSystem[normalizedPath]) {
          setCurrentDir(normalizedPath);
          setHistory((prev) => [...prev, `Navigating to ${normalizedPath}...`]);
          
          // Navigate to section view if it's a top-level section
          const topLevelSection = normalizedPath.replace("~/", "").split("/")[0];
          if (sections.includes(topLevelSection)) {
            onCommand(topLevelSection);
          }
        } else {
          setHistory((prev) => [...prev, `cd: ${target}: No such directory`]);
        }
      }
    } else if (cmd in commands) {
      const output = commands[cmd as keyof typeof commands]();
      setHistory((prev) => [...prev, ...output]);
      if (sections.includes(cmd)) {
        setCurrentDir(`~/${cmd}`);
        onCommand(cmd);
      }
    } else if (sections.includes(cmd)) {
      setCurrentDir(`~/${cmd}`);
      setHistory((prev) => [...prev, `Navigating to ${cmd}...`]);
      onCommand(cmd);
    } else {
      setHistory((prev) => [...prev, `Command not found: ${cmd}`, "Type 'help' for available commands"]);
    }

    setInput("");
    setSuggestions([]);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleResizeWidthMouseDown = (e: React.MouseEvent, side: 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizingWidth(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        setTerminalHeight(Math.max(150, Math.min(newHeight, window.innerHeight - 100)));
      }
      if (isResizingWidth) {
        const newWidth = e.clientX * 2; // Since terminal is centered
        setTerminalWidth(Math.max(400, Math.min(newWidth, window.innerWidth - 40)));
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setIsResizingWidth(false);
    };

    if (isResizing || isResizingWidth) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isResizingWidth]);

  const handleTerminalClick = () => {
    setIsFocused(true);
  };

  const handleTerminalDoubleClick = () => {
    // Reset width
    setTerminalWidth(null);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ top: -window.innerHeight + terminalHeight + 50, bottom: 0, left: -window.innerWidth / 2 + 200, right: window.innerWidth / 2 - 200 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onClick={handleTerminalClick}
      onDoubleClick={handleTerminalDoubleClick}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={{ 
        height: `${terminalHeight}px`,
        width: terminalWidth ? `${terminalWidth}px` : undefined,
        left: terminalWidth ? `${(window.innerWidth - terminalWidth) / 2}px` : 0,
        right: terminalWidth ? 'auto' : 0,
      }}
      className={`fixed bottom-0 bg-black/98 backdrop-blur-sm border-2 border-primary font-mono text-sm overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.3)] ${
        isFocused ? 'z-[100]' : 'z-40'
      } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {/* Resize Handles */}
      {/* Top resize handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize bg-gradient-to-r from-[hsl(280,100%,60%)] via-[hsl(180,100%,50%)] to-[hsl(330,100%,60%)] hover:h-3 transition-all"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-1 bg-black/50 rounded-full" />
        </div>
      </div>

      {/* Left resize handle */}
      <div
        onMouseDown={(e) => handleResizeWidthMouseDown(e, 'left')}
        className="absolute top-0 left-0 bottom-0 w-2 cursor-ew-resize bg-gradient-to-b from-[hsl(280,100%,60%)] via-[hsl(180,100%,50%)] to-[hsl(330,100%,60%)] hover:w-3 transition-all z-50"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-1 bg-black/50 rounded-full" />
        </div>
      </div>

      {/* Right resize handle */}
      <div
        onMouseDown={(e) => handleResizeWidthMouseDown(e, 'right')}
        className="absolute top-0 right-0 bottom-0 w-2 cursor-ew-resize bg-gradient-to-b from-[hsl(280,100%,60%)] via-[hsl(180,100%,50%)] to-[hsl(330,100%,60%)] hover:w-3 transition-all z-50"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-1 bg-black/50 rounded-full" />
        </div>
      </div>

      {/* Terminal Header */}
      <div className="h-8 border-b border-primary/30 flex items-center justify-between px-4 pt-2 cursor-move bg-gradient-to-r from-black via-[hsl(280,100%,10%)] to-black relative overflow-hidden">
        {/* Binary animation background */}
        <div className="absolute inset-0 opacity-5 text-[hsl(180,100%,50%)] text-[8px] whitespace-nowrap overflow-hidden">
          {binaryAnimation}
        </div>
        
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-3 h-3 rounded-full bg-[hsl(0,100%,50%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(60,100%,50%)]" />
          <div className="w-3 h-3 rounded-full bg-[hsl(120,100%,50%)]" />
        </div>
        <span className="text-xs text-[hsl(180,100%,50%)] glow-cyan font-bold relative z-10">CYBER_TERMINAL_v2.0</span>
        <button
          onClick={() => {
            setCurrentDir("~");
            onCommand("network");
            setHistory((prev) => [...prev, "Returning to home..."]);
          }}
          className="text-[hsl(330,100%,60%)] hover:text-[hsl(280,100%,60%)] transition-colors relative z-10"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={terminalRef}
        style={{ height: `${terminalHeight - 90}px` }}
        className="overflow-y-auto px-4 py-2 text-terminal-text scrollbar-thin scrollbar-thumb-[hsl(280,100%,60%)] scrollbar-track-transparent"
      >
        {history.map((line, i) => {
          const isCommand = line.includes('>');
          const isError = line.toLowerCase().includes('not found') || line.toLowerCase().includes('error');
          const isSuccess = line.toLowerCase().includes('navigating');
          
          return (
            <div 
              key={i} 
              className={`mb-1 ${
                isCommand ? 'text-[hsl(180,100%,50%)] glow-cyan' : 
                isError ? 'text-[hsl(0,100%,50%)]' :
                isSuccess ? 'text-[hsl(330,100%,60%)] glow-pink' :
                'text-primary'
              }`}
            >
              {line}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-2 border-t-2 border-[hsl(280,100%,60%)] bg-black">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[hsl(280,100%,60%)] glow-purple font-bold">{currentDir}</span>
            <span className="text-[hsl(330,100%,60%)]">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleTabComplete}
              className="flex-1 bg-transparent outline-none text-[hsl(180,100%,50%)] caret-[hsl(330,100%,60%)] font-mono placeholder:text-primary/30"
              autoFocus
              spellCheck={false}
              placeholder="Type a command..."
            />
          </div>
          {suggestions.length > 0 && (
            <div className="pl-4 text-xs text-[hsl(180,100%,50%)]/60">
              Suggestions: {suggestions.join(", ")} <span className="text-primary/40">(press Tab)</span>
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};
