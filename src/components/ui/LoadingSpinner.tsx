"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "white";
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = "md",
  variant = "primary",
  className,
  text,
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const variants = {
    primary: "border-purple-500",
    accent: "border-purple-500 border-t-blue-500 border-r-blue-500",
    white: "border-white",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={text ? `Loading: ${text}` : "Loading"}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={cn(
            "border-2 rounded-full border-t-transparent",
            sizes[size],
            variants[variant]
          )}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-purple-500/20 blur-md"
        />
      </div>
      {text && (
        <p className={cn("text-gray-400", textSizes[size])}>{text}</p>
      )}
    </div>
  );
}