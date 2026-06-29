"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  FileUp,
  BrainCircuit,
  PenLine,
  Rocket,
} from "lucide-react";

const steps = [
  {
    icon: FileUp,
    title: "Upload Your Manuscript",
    description: "Drag and drop your book file or select from your device. We support PDF, DOC, and DOCX formats.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description: "Our AI processes your content, analyzing structure, characters, themes, and narrative flow.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: PenLine,
    title: "Review Insights",
    description: "Examine detailed recommendations, character arcs, plot holes, and improvement suggestions.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Rocket,
    title: "Publish & Share",
    description: "Export your refined manuscript and share with editors, publishers, or directly to readers.",
    gradient: "from-pink-500 to-rose-500",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative py-24 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
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
            <span className="text-sm font-medium text-purple-400">🚀 How It Works</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-purple">
            How BookFlow Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Four simple steps to transform your manuscript into a compelling story.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line - animated */}
          <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/30 hidden lg:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <GlassCard variant="dark" className="p-8 text-center h-full group">
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="h-10 w-10 text-white" />
                    </motion.div>

                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <span className="font-bold text-white text-sm">{index + 1}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}