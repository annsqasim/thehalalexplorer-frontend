"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

interface HeroProps {
  headline: string;
  subtext: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  backgroundImage?: string;
}

export function Hero({
  headline,
  subtext,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.3), rgba(15,23,42,0.7)), url(${backgroundImage || PLACEHOLDER_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 hero-gradient" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Travel Without Limits
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight animate-fade-in-up"
          >
            {headline}
          </h1>
          <p
            className="text-xl text-slate-200 mb-10 max-w-xl leading-relaxed animate-fade-in-up [animation-delay:100ms] [animation-fill-mode:both]"
          >
            {subtext}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:200ms] [animation-fill-mode:both]"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all"
            >
              <Link href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-xl"
              >
                <Link href={secondaryCta.href}>{secondaryCta.text}            </Link>
          </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
