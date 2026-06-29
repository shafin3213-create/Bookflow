"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Bestselling Author",
    content: "BookFlow transformed my writing process. The AI insights helped me identify plot holes I never would have caught, and the workflow suggestions made my narrative flow like a professional novel.",
    rating: 5,
    avatar: "SC",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Technical Writer",
    content: "As someone who writes complex documentation, the character analysis and timeline features are invaluable. My productivity has increased by 40% since using BookFlow.",
    rating: 5,
    avatar: "MR",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Publishing Editor",
    content: "The collaboration tools are game-changing. Being able to annotate, suggest, and track changes in real-time with my authors has streamlined our entire review process.",
    rating: 5,
    avatar: "AP",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Self-Published Author",
    content: "I was skeptical about AI writing tools, but BookFlow proved me wrong. The smart suggestions are contextual and actually helpful - not generic advice. My self-published novel hit #1 in its category!",
    rating: 5,
    avatar: "DK",
  },
  {
    id: 5,
    name: "Elena Volkov",
    role: "Novel Coach",
    content: "The analytics dashboard gives me insights I can't get anywhere else. Tracking word count patterns, pacing, and reader engagement metrics helps me coach my clients more effectively.",
    rating: 5,
    avatar: "EV",
  },
  {
    id: 6,
    name: "James Thompson",
    role: "Screenwriter",
    content: "The scene breakdown and dialogue analysis tools are fantastic. BookFlow caught inconsistencies in my characters' voices that I missed after multiple drafts.",
    rating: 5,
    avatar: "JT",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Loved by Writers Worldwide
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Join thousands of authors who have transformed their manuscripts with BookFlow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col" variant="dark">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-purple-500/30 mb-3" />

                <p className="text-gray-300 leading-relaxed mb-6 flex-grow">
                  {testimonial.content}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-semibold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-16 pt-8 border-t border-white/10"
        >
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text-purple">10K+</p>
            <p className="text-gray-500 text-sm">Active Authors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text-purple">50K+</p>
            <p className="text-gray-500 text-sm">Books Processed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold gradient-text-purple">98%</p>
            <p className="text-gray-500 text-sm">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}