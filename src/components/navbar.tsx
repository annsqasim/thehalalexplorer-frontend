"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const pages = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Blog", path: "/blog" },
  { name: "Travel Tips", path: "/travel-tips" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/the-logo.svg"
            alt="The Halal Explorer"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {pages.map((page) => {
            const isActive = pathname === page.path;
            return (
              <Link
                key={page.name}
                href={page.path}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-slate-700 dark:text-slate-300 hover:text-primary"
                )}
              >
                {page.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="rounded-full md:flex hidden"
          >
            <Link href="/destinations">Explore</Link>
          </Button>
          <button
            className="md:hidden p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden py-4 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-1">
            {pages.map((page) => {
              const isActive = pathname === page.path;
              return (
                <Link
                  key={page.name}
                  href={page.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive ? "text-primary bg-primary/10" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  {page.name}
                </Link>
              );
            })}
            <Button asChild className="mt-2 rounded-xl">
              <Link href="/search" onClick={() => setIsOpen(false)}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
