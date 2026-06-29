"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Check, X, ChevronRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

interface QuizCardsProps {
  questions: QuizQuestion[];
}

export function QuizCards({ questions }: QuizCardsProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleCheckAnswer = (questionIndex: number) => {
    setShowResults((prev) => ({ ...prev, [questionIndex]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const optionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12"
    >
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
          <Brain className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Quiz Generation</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-2xl">
        Test your understanding of your book. Each question helps reinforce key concepts
        and themes from your story.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {questions.map((quiz, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <GlassCard variant="premium" className="p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-purple-400">
                  Question {index + 1}
                </span>
                <span className="text-xs text-gray-500">
                  {index + 1} of {questions.length}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-6 leading-relaxed">
                {quiz.question}
              </h3>

              <div className="space-y-3 flex-1">
                {quiz.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[index] === option;
                  const isCorrect = showResults[index] && option === quiz.answer;
                  const isWrong = showResults[index] && isSelected && option !== quiz.answer;

                  return (
                    <motion.button
                      key={optionIndex}
                      variants={optionVariants}
                      custom={optionIndex}
                      initial="hidden"
                      animate="visible"
                      whileHover={!showResults[index] ? { scale: 1.02, x: 5 } : {}}
                      whileTap={!showResults[index] ? { scale: 0.98 } : {}}
                      onClick={() =>
                        !showResults[index] && handleSelectAnswer(index, option)
                      }
                      disabled={!!showResults[index]}
                      className={`
                        w-full p-4 rounded-xl text-left transition-all duration-300
                        border border-white/10
                        flex items-center justify-between
                        ${
                          isCorrect
                            ? "bg-green-500/20 border-green-500/50 text-green-300"
                            : isWrong
                            ? "bg-red-500/20 border-red-500/50 text-red-300"
                            : isSelected
                            ? "bg-purple-500/20 border-purple-500/50 text-white"
                            : "bg-white/5 hover:bg-white/10 text-gray-300"
                        }
                      `}
                    >
                      <span className="text-sm pr-2">{option}</span>
                      <AnimatePresence>
                        {isCorrect && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="h-5 w-5 text-green-400" />
                          </motion.div>
                        )}
                        {isWrong && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <X className="h-5 w-5 text-red-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-white/5">
                {!showResults[index] ? (
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => handleCheckAnswer(index)}
                    disabled={!selectedAnswers[index]}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-green-400 font-medium">
                      Correct Answer: {quiz.answer}
                    </span>
                  </div>
                )}
              </motion.div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={itemVariants}
        className="flex justify-center mt-12 gap-4"
      >
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {questions.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentQuestion(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentQuestion
                  ? "w-8 bg-purple-500"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </motion.section>
  );
}