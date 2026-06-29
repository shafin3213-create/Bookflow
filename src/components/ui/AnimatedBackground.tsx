"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  variant?: "hero" | "section" | "minimal";
  className?: string;
}

export function AnimatedBackground({ variant = "hero", className }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const patterns = {
    hero: (
      <>
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </>
    ),
    section: (
      <>
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </>
    ),
    minimal: (
      <>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
      </>
    ),
  };

  return (
    <div className={className}>
      {patterns[variant]}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
      />
    </div>
  );
}