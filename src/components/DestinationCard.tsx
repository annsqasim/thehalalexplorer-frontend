"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

interface DestinationCardProps {
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  slug: string;
  tags?: string[];
  className?: string;
  index?: number;
}

export function DestinationCard({
  name,
  country,
  description,
  imageUrl,
  slug,
  tags,
  className,
  index = 0,
}: DestinationCardProps) {
  return (
    <div className="animate-fade-in-up">
      <Link href={`/destinations/${slug}`}>
        <Card className={cn(
          "group overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm",
          className
        )}>
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageUrl || PLACEHOLDER_IMAGE}
              alt={`${name}, ${country}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {tags && tags.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-white/90 text-gray-900 hover:bg-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-2">
              <p className="text-sm text-primary font-semibold mb-1">
                {country}
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                {name}
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3 flex-1">
              {description}
            </p>
            
            <div className="flex items-center text-primary font-semibold text-sm mt-auto">
              Explore
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
