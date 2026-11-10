"use client";

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
    <div className="animate-fade-in-up">
      <Card className="p-6 h-full flex flex-col rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 relative">
        <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/20" />
        <blockquote className="text-slate-700 dark:text-slate-300 text-base leading-relaxed mb-5 pr-8 relative z-10 flex-1">
          &quot;{quote}&quot;
        </blockquote>
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
          <p className="font-semibold text-slate-900 dark:text-white">{author}</p>
          {location && (
            <p className="text-sm text-slate-500">{location}</p>
          )}
        </div>
      </Card>
    </div>
  );
}
