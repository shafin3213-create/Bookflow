"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOut } from "framer-motion";
import { Share2, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface MindmapBranch {
  title: string;
  children: string[];
}

interface MindmapData {
  centralTheme: string;
  branches: MindmapBranch[];
}

interface MindmapProps {
  data: MindmapData;
}

export function Mindmap({ data }: MindmapProps) {
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeInOut },
    },
  };

  const branchVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const childVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
          <Share2 className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Mindmap</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-2xl">
        Visualize the core themes and connections in your book. The mindmap
        shows how ideas interrelate and build upon each other.
      </motion.p>

      {/* Controls */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mb-6"
      >
        <div className="flex items-center gap-2 glass-premium px-3 py-2 rounded-full">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ZoomOut className="h-4 w-4" />
          </motion.button>
          <span className="text-xs text-gray-400 min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ZoomIn className="h-4 w-4" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScale(1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-sm text-gray-300 hover:text-white transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Reset
        </motion.button>
      </motion.div>

      <GlassCard variant="premium" className="p-8">
        <div className="relative min-h-[500px]">
          {/* Central node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          >
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 p-6">
              <p className="text-center text-white font-bold text-lg leading-tight">
                {data.centralTheme}
              </p>
            </div>
          </motion.div>

          {/* Branch nodes around central node */}
          {data.branches.map((branch, branchIndex) => {
            const angle = (branchIndex * 360) / data.branches.length;
            const radius = 180;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={branchIndex}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                }}
                onMouseEnter={() => setHoveredBranch(branch.title)}
                onMouseLeave={() => setHoveredBranch(null)}
              >
                {/* Branch connector line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 0.4 + branchIndex * 0.1 }}
                  className="absolute w-px h-[120px] bg-gradient-to-b from-purple-500 to-transparent"
                  style={{
                    top: "-60px",
                    left: "50%",
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "bottom",
                  }}
                />

                {/* Branch title node */}
                <motion.div
                  variants={branchVariants}
                  custom={branchIndex}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  className="relative"
                >
                  <GlassCard
                    variant="accent"
                    className={`px-6 py-4 min-w-[150px] transition-all duration-300 ${
                      hoveredBranch === branch.title ? "shadow-lg shadow-purple-500/30" : ""
                    }`}
                  >
                    <h3 className="text-sm font-semibold text-purple-300 text-center whitespace-nowrap">
                      {branch.title}
                    </h3>
                  </GlassCard>

                  {/* Child nodes */}
                  <AnimatePresence>
                    {hoveredBranch === branch.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 space-y-2"
                      >
                        {branch.children.map((child, childIndex) => (
                          <motion.div
                            key={childIndex}
                            variants={childVariants}
                            custom={childIndex}
                            initial="hidden"
                            animate="visible"
                            className="glass-premium px-3 py-2 rounded-lg"
                          >
                            <p className="text-xs text-gray-300 whitespace-nowrap">
                              {child}
                            </p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </motion.section>
  );
}