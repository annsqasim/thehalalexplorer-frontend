"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`
          : "linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {headline}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {subtext}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-brand-emerald-600 hover:bg-brand-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
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
                <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
