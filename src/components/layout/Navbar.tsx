"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#workflow", label: "How It Works" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <GlassCard
        variant={scrolled ? "dark" : "default"}
        className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between rounded-full"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <BookOpen className="h-6 w-6 text-purple-500" />
          </motion.div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 bg-clip-text text-transparent">
            BookFlow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="primary" size="sm" className="group">
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg glass-premium"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <X className="h-5 w-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
              >
                <Menu className="h-5 w-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </GlassCard>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-20 left-4 right-4 md:hidden"
          >
            <GlassCard variant="dark" className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                <Button variant="primary" size="sm" className="w-full">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}