"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadZone } from "./UploadZone";

interface AnalysisData {
  storySummary: string;
  goldenPages: string[];
  quizQuestions: any[];
  flashcards: any[];
  mindmap: any;
  bookTitle?: string;
}

export function Hero() {
  const router = useRouter();

  const handleUploadComplete = (data: AnalysisData) => {
    // Store analysis data in localStorage for dashboard to read
    localStorage.setItem("analysisData", JSON.stringify(data));
    // Navigate to dashboard to show results
    router.push("/dashboard");
  };

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      {/* Premium animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
          <span className="text-sm font-medium text-gray-300">Advanced AI PDF Analyzer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-violet-500 to-blue-600 bg-clip-text text-transparent text-glow"
        >
          The Ultimate AI PDF Analyzer & Summarizer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Upload any document instantly and let our AI PDF analyzer help you extract deep insights, summarize complex chapters, and chat with your data in seconds.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-3xl"
      >
        <UploadZone onUploadComplete={handleUploadComplete} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-500">
          Supported formats: PDF, DOC, DOCX • Max file size: 50MB
        </p>
      </motion.div>
    </section>
  );
}