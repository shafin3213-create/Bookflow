"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  className?: string;
  label?: string;
  variant?: "gradient" | "grid" | "abstract";
}

export function PlaceholderImage({
  width = 400,
  height = 300,
  className,
  label,
  variant = "gradient",
}: PlaceholderImageProps) {
  const variants = {
    gradient: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
    ),
    grid: (
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
    ),
    abstract: (
      <>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
        />
      </>
    ),
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-black/40",
        className
      )}
      style={{ width, height }}
    >
      {variants[variant]}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-500 text-sm font-medium">{label || "Preview"}</span>
      </div>
    </div>
  );
}