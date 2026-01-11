"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface StickyNavProps {
  sections: { id: string; label: string }[];
}

export function StickyNav({ sections }: StickyNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  return (
    <nav className="sticky top-24 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-1 py-4">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                activeSection === section.id
                  ? "bg-brand-emerald-600 text-white"
                  : "text-gray-600 hover:text-brand-emerald-600 hover:bg-gray-100"
              )}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
