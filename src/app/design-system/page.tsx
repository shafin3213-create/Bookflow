"use client";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { motion } from "framer-motion";

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold gradient-text-purple">
            BORNO Design System
          </h1>
          <p className="text-gray-400 text-lg">
            Premium futuristic dark mode with cinematic gradients
          </p>
        </motion.div>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Colors</h2>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-lg bg-purple-500"></div>
              <p className="text-sm text-gray-400">Purple 500</p>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-lg bg-blue-500"></div>
              <p className="text-sm text-gray-400">Blue 500</p>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-lg bg-cyan-500"></div>
              <p className="text-sm text-gray-400">Cyan 500</p>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Gradients</h2>
          <div className="flex flex-wrap gap-4">
            <GlassCard className="p-6">
              <div className="space-y-2">
                <div className="w-32 h-32 rounded-lg bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500"></div>
                <p className="text-sm text-gray-400">Primary Gradient</p>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="space-y-2">
                <div className="w-32 h-32 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <p className="text-sm text-gray-400">Accent Gradient</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Buttons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="premium">Premium</Button>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Glass Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard variant="default" className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">Default</h3>
              <p className="text-gray-400">Standard glass morphism effect</p>
            </GlassCard>
            <GlassCard variant="dark" className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">Dark</h3>
              <p className="text-gray-400">Darker glass variant</p>
            </GlassCard>
            <GlassCard variant="accent" className="p-6">
              <h3 className="text-lg font-medium text-white mb-2">Accent</h3>
              <p className="text-gray-400">Purple-blue tinted glass</p>
            </GlassCard>
          </div>
        </section>

        {/* Loading */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Loading</h2>
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <LoadingSpinner />
              <span className="text-gray-300">Loading spinner component</span>
            </div>
          </GlassCard>
        </section>

        {/* Text Effects */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Text Effects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Gradient Text
              </h3>
              <p className="text-gray-400 text-sm">Animated gradient</p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold gradient-text-purple mb-2">
                Purple Gradient
              </h3>
              <p className="text-gray-400 text-sm">Static purple gradient</p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-2xl font-bold text-glow mb-2">Glow Text</h3>
              <p className="text-gray-400 text-sm">Purple glow effect</p>
            </GlassCard>
          </div>
        </section>
      </div>
    </div>
  );
}