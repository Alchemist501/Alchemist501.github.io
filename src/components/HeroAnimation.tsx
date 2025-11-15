import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export const HeroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Generate particles in a circular vortex pattern
    const particleCount = 150;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = 300;

    const newParticles: Particle[] = [];

    // Define "HELLO" text positions (simplified grid)
    const helloPositions = generateHelloPositions(centerX, centerY);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = radius + Math.random() * 100;
      
      newParticles.push({
        id: i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        targetX: helloPositions[i % helloPositions.length].x,
        targetY: helloPositions[i % helloPositions.length].y,
      });
    }

    setParticles(newParticles);

    // Show text after particles form
    setTimeout(() => {
      setShowText(true);
      setTimeout(() => onComplete(), 1500);
    }, 2500);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary rounded-full glow-green"
          initial={{ x: particle.x, y: particle.y, opacity: 0 }}
          animate={{
            x: particle.targetX,
            y: particle.targetY,
            opacity: 1,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: Math.random() * 0.5,
          }}
        />
      ))}

      {/* HELLO Text */}
      <motion.h1
        className="absolute text-9xl font-bold glow-green"
        style={{ color: "hsl(var(--primary))" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showText ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        HELLO
      </motion.h1>
    </div>
  );
};

// Generate positions for "HELLO" letters
function generateHelloPositions(centerX: number, centerY: number) {
  const positions: { x: number; y: number }[] = [];
  const letterSpacing = 80;
  const startX = centerX - (4 * letterSpacing) / 2;

  // Simple grid pattern for each letter
  const letterPatterns = [
    // H
    [
      [0, -60], [0, -30], [0, 0], [0, 30], [0, 60],
      [40, -60], [40, -30], [40, 0], [40, 30], [40, 60],
      [10, 0], [20, 0], [30, 0],
    ],
    // E
    [
      [0, -60], [0, -30], [0, 0], [0, 30], [0, 60],
      [10, -60], [20, -60], [30, -60],
      [10, 0], [20, 0],
      [10, 60], [20, 60], [30, 60],
    ],
    // L
    [
      [0, -60], [0, -30], [0, 0], [0, 30], [0, 60],
      [10, 60], [20, 60], [30, 60],
    ],
    // L
    [
      [0, -60], [0, -30], [0, 0], [0, 30], [0, 60],
      [10, 60], [20, 60], [30, 60],
    ],
    // O
    [
      [0, -40], [0, -20], [0, 0], [0, 20], [0, 40],
      [10, -50], [20, -50], [30, -50],
      [10, 50], [20, 50], [30, 50],
      [40, -40], [40, -20], [40, 0], [40, 20], [40, 40],
    ],
  ];

  letterPatterns.forEach((pattern, letterIndex) => {
    const letterX = startX + letterIndex * letterSpacing;
    pattern.forEach(([dx, dy]) => {
      positions.push({
        x: letterX + dx,
        y: centerY + dy,
      });
    });
  });

  return positions;
}
