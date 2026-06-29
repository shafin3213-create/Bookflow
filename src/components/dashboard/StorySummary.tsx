"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface StorySummaryProps {
  summary: string;
}

export function StorySummary({ summary }: StorySummaryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Storybook Summary</h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GlassCard variant="premium" className="p-8 md:p-10 relative overflow-hidden bg-white/5 border border-white/10">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/3 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-8 md:leading-9 text-gray-200 font-serif"
            >
              {summary}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mt-10 pt-8 border-t border-white/10"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-400">AI-Crafted Narrative Insights</span>
            </motion.div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.section>
  );
}