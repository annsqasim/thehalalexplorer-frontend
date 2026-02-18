"use client";

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
    <div className="animate-scale-in">
      <Card className={cn("p-6 border-2", variants[variant], className)}>
        <div className="flex items-start gap-4">
          {icon && (
            <div className="text-primary flex-shrink-0 mt-1">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <div className="text-slate-700 dark:text-slate-300">{children}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
