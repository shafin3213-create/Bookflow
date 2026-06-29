"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeInOut } from "framer-motion";
import { Save, Book, Calendar, Trash2, Share2, Download } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { supabase, SUPABASE_CONFIGURED } from "@/lib/supabase";

interface AnalysisData {
  id: string;
  bookTitle: string;
  storySummary: string;
  goldenPages: string[];
  quizQuestions: any[];
  flashcards: any[];
  mindmap: any;
  createdAt: string;
}

interface SaveHistoryProps {
  analysisData?: any;
  onSave?: (savedId: string) => void;
  onLoad?: (data: any) => void;
}

export function SaveHistory({ analysisData, onSave, onLoad }: SaveHistoryProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savedItems, setSavedItems] = useState<AnalysisData[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // If Supabase is not configured, show friendly message
  if (!SUPABASE_CONFIGURED) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
            <Save className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Save History</h2>
        </div>
        <GlassCard variant="premium" className="p-6 text-center">
          <p className="text-gray-300 mb-2">Storage not configured</p>
          <p className="text-gray-500 text-sm">
            Supabase environment variables are missing. The Save feature will be available once configured.
          </p>
        </GlassCard>
      </motion.section>
    );
  }

  // Fetch saved analyses on mount
  useEffect(() => {
    fetchSavedAnalyses();
  }, []);

  const fetchSavedAnalyses = async () => {
    setIsLoading(true);
    try {

      const { data, error } = await supabase
        .from("book_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      // Handle Supabase response errors
      if (error) {
        const errorMsg = error?.message || error?.details || "Unknown error fetching analyses";
        console.error("[SaveHistory] Error fetching analyses:", errorMsg);
        setSavedItems([]); // Clear items on error to prevent showing stale data
        return;
      }

      // Safely handle data
      const safeData = data || [];
      const formattedData: AnalysisData[] = safeData.map((item: any) => ({
        id: item.id,
        bookTitle: item.book_title,
        storySummary: item.story_summary,
        goldenPages: item.golden_pages,
        quizQuestions: item.quiz_questions,
        flashcards: item.flashcards,
        mindmap: item.mindmap,
        createdAt: item.created_at,
      }));

      setSavedItems(formattedData);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : (error && typeof error === "object" ? JSON.stringify(error) : "Unknown error fetching analyses");
      console.error("[SaveHistory] Error fetching analyses:", errorMsg);
      setSavedItems([]); // Clear items on error to prevent showing stale data
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!analysisData) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const { data, error } = await supabase
        .from("book_analyses")
        .insert({
          book_title: analysisData.bookTitle || "Untitled Book",
          story_summary: analysisData.storySummary,
          golden_pages: analysisData.goldenPages,
          quiz_questions: analysisData.quizQuestions,
          flashcards: analysisData.flashcards,
          mindmap: analysisData.mindmap,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      // Handle Supabase response errors
      if (error) {
        const errorMsg = error?.message || error?.details || "Unknown error saving analysis";
        console.error("[SaveHistory] Save error:", errorMsg);
        setSaveError(errorMsg);
        return;
      }

      // Optimistic UI update
      const newSaved: AnalysisData = {
        id: data.id,
        bookTitle: data.book_title,
        storySummary: data.story_summary,
        goldenPages: data.golden_pages,
        quizQuestions: data.quiz_questions,
        flashcards: data.flashcards,
        mindmap: data.mindmap,
        createdAt: data.created_at,
      };

      setSavedItems((prev) => [newSaved, ...prev]);
      onSave?.(data.id);

      // Show success animation
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : (error && typeof error === "object" ? JSON.stringify(error) : "Unknown error saving analysis");
      console.error("[SaveHistory] Save error:", errorMsg);
      setSaveError(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoad = (item: AnalysisData) => {
    onLoad?.(item);
  };

  const handleDelete = async (id: string) => {
    try {

      const { error } = await supabase.from("book_analyses").delete().eq("id", id);

      if (error) {
        const errorMsg = error?.message || error?.details || "Unknown error deleting analysis";
        console.error("[SaveHistory] Delete error:", errorMsg);
      } else {
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error deleting analysis";
      console.error("[SaveHistory] Delete error:", errorMsg);
    }
  };

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
      transition: { duration: 0.5, ease: easeInOut },
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
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
          <Save className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Save History</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-2xl">
        Save your book analysis for later reference. All analyses are securely
        stored and easily accessible from your dashboard.
      </motion.p>

      {/* Save button */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-start gap-4">
          <Button
            variant="premium"
            size="lg"
            onClick={handleSave}
            disabled={!analysisData || isSaving}
            loading={isSaving}
            className="px-8"
          >
            {showSaved ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                Saved!
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Save Analysis to Supabase
              </div>
            )}
          </Button>

          {saveError && (
            <div className="glass-premium border border-red-500/30 bg-red-500/10 px-4 py-2 rounded-xl">
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Saved items list */}
      <AnimatePresence>
        {savedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Your Saved Analyses
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <GlassCard variant="premium" className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Book className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {item.bookTitle}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLoad(item)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                          Summary
                        </span>
                        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                          {item.quizQuestions?.length || 0} Questions
                        </span>
                        <span className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                          {item.flashcards?.length || 0} Cards
                        </span>
                      </div>

                      <p className="text-sm text-gray-300 line-clamp-2">
                        {item.storySummary}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleLoad(item)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass-premium text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Load Analysis
                    </motion.button>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 bg-white/5 rounded-2xl animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </motion.div>
      ) : !analysisData && savedItems.length === 0 && (
        <motion.div
          variants={itemVariants}
          className="text-center py-12 glass-premium rounded-2xl"
        >
          <Save className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">
            Analyze a book to save it to your history
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}