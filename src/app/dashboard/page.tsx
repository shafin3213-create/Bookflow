"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easeOut } from "motion-utils";
import {
  Upload, BookOpen, History, Sparkles,
  Brain, CreditCard, MessageCircle, Share2, Save
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { UploadZone } from "@/components/sections/UploadZone";
import { StorySummary } from "@/components/dashboard/StorySummary";
import { GoldenPages } from "@/components/dashboard/GoldenPages";
import { QuizCards } from "@/components/dashboard/QuizCards";
import { Flashcards } from "@/components/dashboard/Flashcards";
import { BookChat } from "@/components/dashboard/BookChat";
import { Mindmap } from "@/components/dashboard/Mindmap";
import { SaveHistory } from "@/components/dashboard/SaveHistory";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { SUPABASE_CONFIGURED } from "@/lib/supabase";

type Tab = "upload" | "summary" | "pages" | "quiz" | "flashcards" | "chat" | "mindmap" | "history" | "dashboard";

interface AnalysisData {
  storySummary: string;
  goldenPages: string[];
  quizQuestions: any[];
  flashcards: any[];
  mindmap: any;
  bookTitle?: string;
}

const baseTabConfig = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "summary", label: "Summary", icon: BookOpen },
  { id: "pages", label: "Pages", icon: Sparkles },
  { id: "quiz", label: "Quiz", icon: Brain },
  { id: "flashcards", label: "Cards", icon: CreditCard },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "mindmap", label: "Map", icon: Share2 },
  { id: "history", label: "Save", icon: Save },
  { id: "dashboard", label: "Library", icon: History },
] as { id: Tab; label: string; icon: any }[];

// Filter out Save and Library tabs if Supabase is not configured
const tabConfig = SUPABASE_CONFIGURED
  ? baseTabConfig
  : baseTabConfig.filter((tab) => tab.id !== "history" && tab.id !== "dashboard");

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("upload");
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [showTabs, setShowTabs] = useState(false);
  const [storedAnalysis, setStoredAnalysis] = useState<AnalysisData | null>(null);

  // Check for stored analysis data on initial load (persistent in localStorage)
  useEffect(() => {
    const storedData = localStorage.getItem("analysisData") || sessionStorage.getItem("analysisData");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setStoredAnalysis(data);
        setAnalysisData(data);
        setShowTabs(true);
        setActiveTab("summary");
      } catch (e) {
        console.error("Failed to parse stored analysis data:", e);
      }
    }
  }, []);

  // Also save to localStorage when analysisData is set
  useEffect(() => {
    if (analysisData) {
      localStorage.setItem("analysisData", JSON.stringify(analysisData));
    }
  }, [analysisData]);

  // Clear stored analysis data
  const handleClearResults = () => {
    localStorage.removeItem("analysisData");
    setStoredAnalysis(null);
    setAnalysisData(null);
    setShowTabs(false);
    setActiveTab("upload");
  };

  const handleUploadComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setShowTabs(true);
    setActiveTab("summary");
    // Persist analysis data to localStorage for page refresh survival
    localStorage.setItem("analysisData", JSON.stringify(data));
  };

  const handleLoadAnalysis = (data: any) => {
    setAnalysisData(data);
    setShowTabs(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: easeOut },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      transition: { duration: 0.3 },
    },
  };

  const tabButtonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      {/* Spacer to separate navbar from main content */}
      <div className="h-24" />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 pb-8 w-full">
        {/* Tab Navigation - sticky at top while scrolling */}
        <AnimatePresence>
          {showTabs && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="sticky top-24 z-40 mb-8 bg-black/90 backdrop-blur-xl py-3 rounded-2xl"
            >
              <div className="flex items-center gap-2 p-2 glass-premium rounded-2xl min-w-max">
                {tabConfig.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    variants={tabButtonVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="whileHover"
                    whileTap="whileTap"
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 pointer-events-auto
                      ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>

                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}

                {/* Clear Results Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={handleClearResults}
                  className="ml-2 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                >
                  Clear Results
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Tab Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-0 max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === "upload" && (
                <UploadZone onUploadComplete={handleUploadComplete} />
              )}

              {activeTab === "summary" && analysisData && (
                <StorySummary summary={analysisData.storySummary} />
              )}

              {activeTab === "pages" && analysisData && (
                <GoldenPages pages={analysisData.goldenPages} />
              )}

              {activeTab === "quiz" && analysisData && (
                <QuizCards questions={analysisData.quizQuestions} />
              )}

              {activeTab === "flashcards" && analysisData && (
                <Flashcards cards={analysisData.flashcards} />
              )}

              {activeTab === "chat" && analysisData && (
                <BookChat
                  bookTitle={analysisData.bookTitle}
                  bookContext={analysisData.storySummary}
                />
              )}

              {activeTab === "mindmap" && analysisData && (
                <Mindmap data={analysisData.mindmap} />
              )}

              {activeTab === "history" && analysisData && (
                <SaveHistory
                  analysisData={analysisData}
                  onSave={(id) => console.log("Saved:", id)}
                  onLoad={handleLoadAnalysis}
                />
              )}

              {activeTab === "dashboard" && (
                <UserDashboard />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Welcome state when no analysis */}
        {!analysisData && activeTab !== "upload" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 max-w-2xl mx-auto"
          >
            <Upload className="h-20 w-20 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              No analysis yet
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Upload a book to get started. Your analysis will appear here with
              summary, quizzes, flashcards, and more.
            </p>
            <button
              onClick={() => setActiveTab("upload")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Upload Your First Book
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}