"use client";

import { motion } from "framer-motion";
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
      <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", containerClassName)}>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("text-center max-w-3xl mx-auto mb-12 md:mb-16", className)}
    >
      {subtitle && (
        <p className="text-brand-emerald-600 font-semibold text-sm uppercase tracking-wider mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}
