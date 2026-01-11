"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutBoxProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "success" | "info" | "warning";
  icon?: ReactNode;
  className?: string;
}

export function CalloutBox({
  title,
  children,
  variant = "default",
  icon,
  className,
}: CalloutBoxProps) {
  const variants = {
    default: "bg-gray-50 border-gray-200",
    success: "bg-brand-emerald-50 border-brand-emerald-200",
    info: "bg-blue-50 border-blue-200",
    warning: "bg-amber-50 border-amber-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("p-6 border-2", variants[variant], className)}>
        <div className="flex items-start gap-4">
          {icon && (
            <div className="text-brand-emerald-600 flex-shrink-0 mt-1">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <div className="text-gray-700">{children}</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
