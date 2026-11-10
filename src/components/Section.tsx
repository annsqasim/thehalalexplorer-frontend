"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
}

export function Section({
  children,
  className,
  containerClassName,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 lg:py-32", className)}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("text-center max-w-3xl mx-auto mb-8 md:mb-12", className)}
    >
      {subtitle && (
        <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
