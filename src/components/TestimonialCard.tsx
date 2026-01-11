"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  index?: number;
}

export function TestimonialCard({
  quote,
  author,
  location,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-8 h-full border-0 shadow-soft hover:shadow-medium transition-all duration-300 relative">
        <Quote className="absolute top-6 right-6 h-12 w-12 text-brand-emerald-100" />
        <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
          "{quote}"
        </blockquote>
        <div className="border-t pt-4">
          <p className="font-semibold text-gray-900">{author}</p>
          {location && (
            <p className="text-sm text-gray-500">{location}</p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
