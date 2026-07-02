"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Brain,
  Zap,
  Shield,
  Users,
  BarChart3,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced AI analyzes your content to provide actionable insights, character development suggestions, and plot improvements.",
    color: "text-purple-500",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Lightning Processing",
    description: "Process large manuscripts in seconds with our optimized infrastructure and intelligent chunking algorithms.",
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your content is encrypted and never stored. We prioritize your intellectual property protection.",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Collaboration Tools",
    description: "Invite editors, co-authors, and beta readers to collaborate seamlessly on your project.",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Writing Analytics",
    description: "Track your progress, word count, reading time, and engagement metrics across all chapters.",
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "Get context-aware recommendations for improving dialogue, pacing, and narrative flow.",
    color: "text-pink-500",
    gradient: "from-pink-500 to-rose-500",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-2 rounded-full glass-premium mb-6"
          >
            <span className="text-sm font-medium text-purple-400">✨ Features</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple">
            Powerful AI Tools to Analyze PDFs Instantly
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to transform your manuscript from a rough draft to a polished masterpiece.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <GlassCard variant="premium" className="p-8 h-full group cursor-pointer overflow-hidden">
                <div className="relative z-10">
                  <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-glow transition-all">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}