"use client";

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
      <div className="animate-fade-in-up">
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              {icon && <span className="text-primary">{icon}</span>}
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            {children}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
