"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white",
            "border-white/10 placeholder:text-gray-500",
            "focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-300",
            error && "border-red-500/50 focus:ring-red-500/50",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";