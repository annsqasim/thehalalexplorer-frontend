"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/destinations/${slug}`}>
        <Card className={cn(
          "group overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-card-hover border-0 shadow-card",
          className
        )}>
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imageUrl}
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
              <p className="text-sm text-brand-emerald-600 font-semibold mb-1">
                {country}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-emerald-600 transition-colors">
                {name}
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
              {description}
            </p>
            
            <div className="flex items-center text-brand-emerald-600 font-semibold text-sm mt-auto">
              Explore
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
