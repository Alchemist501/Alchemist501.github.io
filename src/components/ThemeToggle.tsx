import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all shadow-lg pointer-events-auto relative z-10 ${theme === "dark"
        ? "bg-primary/20 border-2 border-primary hover:bg-primary/30"
        : "bg-white hover:bg-gray-50 border-2 border-gray-900"
        }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6 text-primary glow-green" />
      ) : (
        <Moon className="w-6 h-6 text-gray-900" />
      )}
    </motion.button>
  );
};
