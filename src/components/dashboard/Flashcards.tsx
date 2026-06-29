"use client";

import { motion } from "framer-motion";
import { easeInOut } from "motion-utils";
import { CreditCard, RotateCcw, Shuffle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useState } from "react";

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardsProps {
  cards: Flashcard[];
}

export function Flashcards({ cards }: FlashcardsProps) {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [shuffled, setShuffled] = useState(false);

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => {
      const newState = { ...prev };
      newState[index] = !prev[index];
      return newState;
    });
  };

  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);

  const shuffleCards = () => {
    if (shuffled) {
      setShuffled(false);
      setShuffledCards([]);
      setFlippedCards({});
    } else {
      const shuffledResult = [...cards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffledResult);
      setShuffled(true);
      // Reset flips when shuffling
      setFlippedCards({});
    }
  };

  const displayedCards = shuffled ? shuffledCards : cards;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.5, ease: easeInOut },
    },
    back: {
      rotateY: -180,
      transition: { duration: 0.5, ease: easeInOut },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-12"
    >
      <motion.div variants={cardVariants} className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Flashcards</h2>
      </motion.div>

      <motion.div
        variants={cardVariants}
        className="flex items-center justify-between mb-8"
      >
        <p className="text-gray-400 max-w-2xl">
          Key concepts and themes at a glance. Flip each card to reveal insights
          about your book&apos;s most important elements.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shuffleCards}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-sm text-gray-300 hover:text-white transition-colors"
        >
          <Shuffle className="h-4 w-4" />
          {shuffled ? "Unshuffle" : "Shuffle"}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {displayedCards.map((card, index) => (
          <motion.div
            key={shuffled ? `${index}-${card.front}` : index}
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative h-48 cursor-pointer perspective-1000"
            onClick={() => toggleFlip(index)}
          >
            <motion.div
              animate={flippedCards[index] ? "back" : "front"}
              variants={flipVariants}
              className="relative w-full h-full preserve-3d"
            >
              {/* Front of card */}
              <div className="absolute inset-0 w-full h-full backface-visibility-hidden">
                <GlassCard variant="premium" className="p-6 h-full flex flex-col justify-between bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-center text-lg font-semibold text-white leading-relaxed">
                      {card.front}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <RotateCcw className="h-3 w-3" />
                    <span>Click to flip</span>
                  </div>
                </GlassCard>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 w-full h-full backface-visibility-hidden" style={{ transform: "rotateY(180deg)" }}>
                <GlassCard variant="premium" className="p-6 h-full flex flex-col justify-between bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-center text-sm text-gray-300 leading-relaxed">
                      {card.back}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <RotateCcw className="h-3 w-3" />
                    <span>Click to flip back</span>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
