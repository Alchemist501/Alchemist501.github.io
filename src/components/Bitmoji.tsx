import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

const MatrixRain = () => {
  const chars = ['0', '1'];
  const columns = 15;
  const rows = 15;
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex justify-around">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <motion.span
              key={colIndex}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                y: [0, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (rowIndex + colIndex) * 0.1,
                ease: "linear"
              }}
              className="text-primary text-xs font-mono"
            >
              {chars[Math.floor(Math.random() * chars.length)]}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Bitmoji = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="relative perspective-1000"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateY: [0, 0, 180],
        }}
        transition={{
          duration: 10,
          repeat: 0,
          ease: "linear",
        }}
        className="w-80 h-80 relative"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side - Waving Hand with Matrix Rain */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-4 border-primary shadow-lg shadow-primary/50 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20"
          style={{
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
          }}
        >
          <MatrixRain />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-9xl z-10"
            animate={{
              rotate: [0, 14, -8, 14, -4, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
            style={{ originX: 0.7, originY: 0.7 }}
          >
            👋
          </motion.div>
        </motion.div>

        {/* Back Side - Photo with Matrix Rain */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-4 border-primary shadow-lg shadow-primary/50 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <MatrixRain />
          <img
            src={profilePhoto}
            alt="Profile"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
