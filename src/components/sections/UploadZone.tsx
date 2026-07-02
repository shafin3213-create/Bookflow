"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ProcessingSkeleton } from "@/components/ui/ProcessingSkeleton";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const LOADING_MESSAGES = [
  "BookFlow is reading your book...",
  "Understanding the narrative...",
  "Finding golden pages...",
  "Creating quizzes...",
  "Building flashcards...",
  "Mapping ideas...",
];

interface UploadZoneProps {
  onUploadComplete?: (data: any) => void;
  onUploadError?: (error: string) => void;
}

export function UploadZone({ onUploadComplete, onUploadError }: UploadZoneProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate AI processing steps with loading messages
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= LOADING_MESSAGES.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        // Safe parse error response
        const errorText = await response.text();
        let errorData: any = {};
        try {
          errorData = errorText ? JSON.parse(errorText) : {};
        } catch {
          // Response wasn't JSON, use raw text as error message
          errorData = { error: errorText || "Upload failed" };
        }
        throw new Error(errorData.error || errorData.message || "Upload failed");
      }

      // Safe parse success response
      const resultText = await response.text();
      let result: any = {};
      try {
        result = resultText ? JSON.parse(resultText) : {};
      } catch (parseError) {
        console.error("[Upload] Failed to parse response:", parseError);
        throw new Error("Invalid response from server: malformed JSON");
      }

      // Validate response structure
      if (result?.success === false) {
        const errorMsg = result?.error || result?.details || "Server returned an error";
        console.error("[Upload] API returned error:", result);
        throw new Error(errorMsg);
      }

      if (!result?.data) {
        console.error("[Upload] Invalid response format:", result);
        throw new Error("Invalid response from server: missing data");
      }

      setProcessingStep(LOADING_MESSAGES.length - 1);

      // Wait for final loading message display
      setTimeout(() => {
        onUploadComplete?.(result.data);
        setIsProcessing(false);
      }, 500);
    } catch (error) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      const message = error instanceof Error ? error.message : "Failed to process file";
      setError(message);
      onUploadError?.(message);
    }
  }, [onUploadComplete, onUploadError]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];

    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported");
      onUploadError?.("Only PDF files are supported");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large. Maximum size is 50MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      onUploadError?.(`File too large. Maximum size is 50MB.`);
      return;
    }

    setUploadedFile(file);
    processFile(file);
  }, [processFile, onUploadError]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (rejections) => {
      const rejection = rejections[0];
      if (rejection?.errors?.[0]?.code === "file-too-large") {
        setError("File is too large. Maximum size is 50MB.");
      } else if (rejection?.errors?.[0]?.code === "file-invalid-type") {
        setError("Only PDF files are allowed.");
      }
    },
  });

  const removeFile = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setProcessingStep(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <GlassCard variant="premium" className="overflow-hidden">
        <div
          {...getRootProps()}
          className={`cursor-pointer border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[280px] ${
            error ? "border-red-500/50" : isDragActive ? "border-purple-500/50" : "border-purple-500/30"
          }`}
        >
          <input {...getInputProps()} />

          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4"
              >
                <AlertCircle className="h-16 w-16 text-red-500" />
                <div className="space-y-2">
                  <p className="font-semibold text-xl text-red-400">Upload Failed</p>
                  <p className="text-gray-400 max-w-sm">{error}</p>
                </div>
                <Button variant="secondary" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}>
                  Try Again
                </Button>
              </motion.div>
            ) : isProcessing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="flex flex-col items-center gap-6 mb-6">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-2 border-purple-500 border-t-transparent rounded-full"
                    />
                    <div className="absolute inset-0 w-16 h-16 border-2 border-blue-500/30 border-b-transparent rounded-full animate-spin" style={{ animationDuration: "3s" }} />
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-xl gradient-text-purple">
                      {LOADING_MESSAGES[processingStep]}
                    </p>
                    <div className="flex items-center gap-2 justify-center">
                      {LOADING_MESSAGES.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index <= processingStep ? "bg-purple-500" : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <ProcessingSkeleton />
              </motion.div>
            ) : uploadedFile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <CheckCircle2 className="h-20 w-20 text-green-500" />
                </motion.div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold text-xl text-white">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-400">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-6"
              >
                <motion.div
                  animate={{
                    scale: isDragActive ? 1.15 : 1,
                    y: isDragActive ? -5 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl scale-150" />
                  <Upload className="h-20 w-20 text-purple-500 relative z-10" />
                </motion.div>

                <div className="space-y-2">
                  <p className="font-semibold text-xl text-white">
                    {isDragActive ? "Drop your PDF here" : "Upload your PDF document"}
                  </p>
                  <p className="text-gray-400 max-w-sm">
                    Drag & drop your files here or click to browse. Max 50MB.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full glass-premium text-sm text-gray-300">
                    PDF
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}