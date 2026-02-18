"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Utensils } from "lucide-react";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

interface DestinationDetailHeroProps {
  name: string;
  country: string;
  imageUrl: string;
  highlights?: {
    halalFood?: string;
    mosques?: string;
    safety?: string;
  };
}

export function DestinationDetailHero({
  name,
  country,
  imageUrl,
  highlights,
}: DestinationDetailHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      <Image
        src={imageUrl || PLACEHOLDER_IMAGE}
        alt={`${name}, ${country}`}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      
      <div className="container relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="mb-4">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-4">
              {country}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {name}
          </h1>
          
          {highlights && (
            <div className="flex flex-wrap gap-4 mt-6">
              {highlights.halalFood && (
                <div className="flex items-center gap-2 text-white/90">
                  <Utensils className="h-5 w-5" />
                  <span className="text-sm font-medium">Halal Food Available</span>
                </div>
              )}
              {highlights.mosques && (
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">Prayer Facilities</span>
                </div>
              )}
              {highlights.safety && (
                <div className="flex items-center gap-2 text-white/90">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">Muslim-Friendly</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
