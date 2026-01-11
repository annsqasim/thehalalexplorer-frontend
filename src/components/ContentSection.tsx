"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ContentSection({
  id,
  title,
  icon,
  children,
  className,
}: ContentSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 mb-16", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              {icon && <span className="text-brand-emerald-600">{icon}</span>}
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            {children}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
