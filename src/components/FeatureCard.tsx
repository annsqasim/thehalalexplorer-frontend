"use client";

import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={cn(
        "p-8 h-full border-0 shadow-soft hover:shadow-medium transition-all duration-300",
        className
      )}>
        {icon && (
          <div className="mb-4 text-brand-emerald-600">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  );
}
