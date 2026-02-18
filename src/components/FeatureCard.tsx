"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  index?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  index = 0,
}: FeatureCardProps) {
  return (
    <div className="animate-fade-in-up">
      <Card className={cn(
        "p-8 h-full rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300",
        className
      )}>
        {icon && (
          <div className="mb-4 text-primary">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
      </Card>
    </div>
  );
}
