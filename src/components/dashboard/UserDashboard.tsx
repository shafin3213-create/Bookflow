"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, BookOpen, CreditCard, Brain, Calendar, Search, Filter, Share2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SUPABASE_CONFIGURED, supabase } from "@/lib/supabase";

interface SavedAnalysis {
  id: string;
  book_title: string;
  created_at: string;
  story_summary: string;
  quiz_questions: any[];
  flashcards: any[];
  golden_pages: string[];
}

export function UserDashboard() {
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "recent" | "favorites">("all");

  // If Supabase is not configured, show friendly message
  if (!SUPABASE_CONFIGURED) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <History className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">User Dashboard</h2>
        </div>
        <GlassCard variant="premium" className="p-6 text-center">
          <p className="text-gray-300 mb-2">Storage not configured</p>
          <p className="text-gray-500 text-sm">
            Supabase environment variables are missing. The Library feature will be available once configured.
          </p>
        </GlassCard>
      </motion.section>
    );
  }

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    setIsLoading(true);

    try {

      const { data, error } = await supabase
        .from("book_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      // Handle Supabase response errors
      if (error) {
        const errorMsg = error?.message || error?.details || "Unknown error fetching analyses";
        console.error("[UserDashboard] Failed to fetch analyses:", errorMsg);
        setAnalyses([]); // Clear analyses on error to prevent showing stale data
        return;
      }

      // Safely handle data
      setAnalyses(data || []);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : (error && typeof error === "object" ? JSON.stringify(error) : "Unknown error fetching analyses");
      console.error("[UserDashboard] Failed to fetch analyses:", errorMsg);
      setAnalyses([]); // Clear analyses on error to prevent showing stale data
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAnalyses = analyses.filter((analysis) => {
    if (searchQuery) {
      return (
        analysis.book_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        analysis.story_summary?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 30 },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <History className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">User Dashboard</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-2xl">
        Your personal library of analyzed books. Access your saved summaries,
        quizzes, flashcards, and insights anytime.
      </motion.p>

      {/* Search and filter */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your library..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex items-center gap-1 glass-premium rounded-full p-1">
            {(["all", "recent", "favorites"] as const).map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  activeFilter === filter
                    ? "bg-purple-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats overview */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <GlassCard variant="premium" className="p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <BookOpen className="h-6 w-6 text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{analyses.length}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Books Analyzed</p>
        </GlassCard>

        <GlassCard variant="premium" className="p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-3">
            <CreditCard className="h-6 w-6 text-cyan-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {analyses.reduce((acc, curr) => acc + (curr.flashcards?.length || 0), 0)}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Flashcards</p>
        </GlassCard>

        <GlassCard variant="premium" className="p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
            <Brain className="h-6 w-6 text-indigo-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {analyses.reduce((acc, curr) => acc + (curr.quiz_questions?.length || 0), 0)}
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Quiz Questions</p>
        </GlassCard>

        <GlassCard variant="premium" className="p-5 text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-3">
            <History className="h-6 w-6 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">This Month</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">Activity</p>
        </GlassCard>
      </motion.div>

      {/* Analyses grid */}
      {isLoading ? (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 bg-white/5 rounded-2xl animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </motion.div>
      ) : (
        <AnimatePresence>
          {filteredAnalyses.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                >
                  <GlassCard variant="premium" className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">
                          {analysis.book_title || "Untitled Book"}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(analysis.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-1">
                      {analysis.story_summary || "No summary available"}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                        {analysis.quiz_questions?.length || 0} Qs
                      </span>
                      <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs">
                        {analysis.flashcards?.length || 0} Cards
                      </span>
                      <span className="px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs">
                        {analysis.golden_pages?.length || 0} Pages
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="glass" size="sm" className="flex-1">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <History className="h-20 w-20 text-gray-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No analyses found
              </h3>
              <p className="text-gray-400">
                {searchQuery
                  ? "Try a different search term"
                  : "Upload your first book to get started"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.section>
  );
}