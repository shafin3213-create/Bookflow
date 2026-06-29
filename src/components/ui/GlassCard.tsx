"use client";

import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "accent" | "premium";
  hover?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, variant = "default", hover = true, ...props }, ref) => {
    const variants = {
      default: "glass-premium",
      dark: "glass-dark",
      accent: "glass-accent",
      premium: "relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
    };

    const hoverEffect = hover
      ? {
          whileHover: { scale: 1.02, y: -2 },
          transition: { type: "spring" as const, stiffness: 400, damping: 30 },
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          "border-white/10",
          "backdrop-blur-xl",
          "transition-all duration-300",
          hover && "hover:border-white/20",
          variants[variant],
          className
        )}
        {...hoverEffect}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";