import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NameTypewriterProps {
  name: string;
  typingSpeed?: number;
}

export const NameTypewriter = ({
  name,
  typingSpeed = 100,
}: NameTypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < name.length) {
      const timeout = setTimeout(() => {
        setDisplayText(name.slice(0, displayText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayText, name, typingSpeed]);

  return (
    <div className="font-mono text-4xl md:text-6xl font-bold">
      <span className="glow-green">{displayText}</span>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-3 h-8 md:h-12 bg-primary ml-1"
        />
      )}
    </div>
  );
};
