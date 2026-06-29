"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass" | "premium";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, loading, ...props }, ref) => {
    const variants = {
      primary: cn(
        "relative overflow-hidden",
        "bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500",
        "text-white",
        "shadow-lg shadow-purple-500/20",
        "hover:shadow-xl hover:shadow-purple-500/30",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
        "before:translate-x-[-100%] before:transition-transform before:duration-500",
        "hover:before:translate-x-[100%]"
      ),
      secondary: cn(
        "glass-premium",
        "text-gray-200",
        "hover:text-white"
      ),
      ghost: cn(
        "text-gray-400",
        "hover:text-purple-400",
        "hover:bg-white/5"
      ),
      glass: cn(
        "glass-premium",
        "text-gray-200",
        "border-purple-500/20"
      ),
      premium: cn(
        "relative overflow-hidden",
        "bg-gradient-to-r from-purple-600/80 to-blue-600/80",
        "backdrop-blur-xl",
        "border border-purple-500/30",
        "text-white",
        "shadow-lg shadow-purple-500/20"
      ),
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-full",
      md: "px-6 py-3 text-base rounded-full",
      lg: "px-8 py-4 text-lg rounded-full",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading || props.disabled}
        className={cn(
          "font-medium",
          "transition-all duration-300",
          "inline-flex items-center justify-center",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as any)}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";