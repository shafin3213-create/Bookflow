"use client";

import { motion } from "framer-motion";

interface ProcessingSkeletonProps {
  message?: string;
}

export function ProcessingSkeleton({ message }: ProcessingSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-3xl mx-auto space-y-6"
    >
      {/* Story Summary Skeleton */}
      <div className="glass-premium rounded-2xl p-6">
        <div className="h-6 w-32 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-4 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded-full w-full animate-pulse" style={{ animationDelay: "100ms" }} />
          <div className="h-4 bg-white/10 rounded-full w-11/12 animate-pulse" style={{ animationDelay: "200ms" }} />
          <div className="h-4 bg-white/10 rounded-full w-10/12 animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="h-4 bg-white/10 rounded-full w-9/12 animate-pulse" style={{ animationDelay: "400ms" }} />
        </div>
      </div>

      {/* Golden Pages Skeleton */}
      <div className="glass-premium rounded-2xl p-6">
        <div className="h-6 w-28 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-4 animate-pulse" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-white/10 rounded-xl w-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
      </div>

      {/* Quiz Questions Skeleton */}
      <div className="glass-premium rounded-2xl p-6">
        <div className="h-6 w-36 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-4 animate-pulse" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-white/10 rounded-full w-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              <div className="h-4 bg-white/10 rounded-full w-11/12 animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }} />
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-8 bg-white/5 rounded-full flex-1 animate-pulse" style={{ animationDelay: `${(i * 4 + j) * 50}ms` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flashcards Skeleton */}
      <div className="glass-premium rounded-2xl p-6">
        <div className="h-6 w-24 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-20 bg-white/10 rounded-xl animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
          ))}
        </div>
      </div>

      {/* Mindmap Skeleton */}
      <div className="glass-premium rounded-2xl p-6">
        <div className="h-6 w-20 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full mb-4 animate-pulse" />
        <div className="h-48 bg-white/10 rounded-xl animate-pulse" style={{ animationDelay: "100ms" }} />
      </div>
    </motion.div>
  );
}