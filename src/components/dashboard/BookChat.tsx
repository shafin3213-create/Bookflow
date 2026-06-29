"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Bot, User, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface BookChatProps {
  bookTitle?: string;
  bookContext?: string;
}

export function BookChat({ bookTitle = "Your Book", bookContext }: BookChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Howdy! I'm BookFlow AI, your literary companion. Ask me anything about "${bookTitle}" - from character motivations to plot analysis, hidden themes, or what happens next. I'm here to chat!`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        "That's a fascinating observation! The protagonist's journey reflects the classic hero's arc, but with a modern twist that makes it uniquely compelling.",
        "Great question! This theme has been woven throughout the narrative as a subtle undercurrent, only becoming fully apparent in the climactic scenes.",
        "I'd say this symbol represents transformation and growth - both literally and metaphorically. The author uses it masterfully to mirror the character development.",
        "The emotional core of this chapter lies in the tension between expectation and reality. Notice how the dialogue patterns shift when the character faces adversity.",
        "What a sharp insight! You've identified one of the key motifs that connects the beginning and end. This creates a beautiful circular narrative structure.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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
      transition: { duration: 0.5 },
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
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Book Chat</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="text-gray-400 mb-8 max-w-2xl">
        Have a conversation with AI about your book. Ask questions, explore themes,
        or discuss character development and plot intricacies.
      </motion.p>

      <GlassCard variant="premium" className="p-6 h-[500px] flex flex-col">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-emerald-400" />
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className={`flex-1 max-w-[80%] ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-4 rounded-2xl ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 ml-auto"
                        : "bg-white/5 border border-white/10"
                    }`}
                  >
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </motion.div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1 max-w-[80%]">
                  <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 text-emerald-400 animate-spin" />
                      <span className="text-sm text-gray-400">
                        Thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <motion.div
          variants={itemVariants}
          className="pt-4 border-t border-white/10"
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about the book, themes, characters..."
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 disabled:opacity-50"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="premium"
                size="md"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="px-5"
              >
                <Send className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              "What is the main theme?",
              "Character analysis?",
              "Plot summary?",
              "Key symbols?",
            ].map((prompt, index) => (
              <motion.button
                key={prompt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInputValue(prompt)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-full text-xs text-gray-400 bg-white/5 border border-white/10 hover:text-white transition-colors disabled:opacity-50"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </GlassCard>
    </motion.section>
  );
}