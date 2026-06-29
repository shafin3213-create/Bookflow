"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";

interface GoldenPagesProps {
  pages: string[];
}

export function GoldenPages({ pages }: GoldenPagesProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
          <Star className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Golden Pages & Insights</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-2xl">
        Must-read passages that illuminate the heart of your story. These golden pages
        capture the essence, emotion, and pivotal moments that make your book unforgettable.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {pages.map((page, index) => (
          <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="cursor-pointer"
            >
              <GlassCard
                variant="premium"
                className="p-6 h-full flex flex-col"
              >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-yellow-400">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Page Insight #{index + 1}
                  </h3>
                  <p className="text-sm text-purple-400 font-medium">
                    {index < 3 ? "Essential Reading" : "Key Insight"}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, height: "6rem" }}
                  animate={{
                    opacity: 1,
                    height: expandedIndex === index ? "auto" : "6rem",
                  }}
                  exit={{ opacity: 0, height: "6rem" }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className={`text-gray-300 text-sm leading-relaxed ${
                      expandedIndex !== index ? "line-clamp-4" : ""
                    }`}
                  >
                    {page}
                  </p>
                </motion.div>
              </AnimatePresence>

              <motion.div
                variants={itemVariants}
                className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Lightbulb className="h-3 w-3" />
                  <span>Teaser Preview</span>
                </div>

                <motion.button
                  whileHover={{ x: 3 }}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  {expandedIndex === index ? "Show Less" : "Read More"}
                </motion.button>
              </motion.div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}