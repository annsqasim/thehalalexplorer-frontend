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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-white/90 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/the-logo.svg"
              alt="The Halal Explorer"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {pages.map((page) => {
              const isActive = pathname === page.path;
              return (
                <Link
                  key={page.name}
                  href={page.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive
                      ? "text-brand-emerald-600 bg-brand-emerald-50"
                      : "text-gray-700 hover:text-brand-emerald-600 hover:bg-gray-100"
                  )}
                >
                  {page.name}
                </Link>
              );
            })}
          </div>

          {/* Search Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-gray-300"
            >
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {pages.map((page) => {
                const isActive = pathname === page.path;
                return (
                  <Link
                    key={page.name}
                    href={page.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "text-brand-emerald-600 bg-brand-emerald-50"
                        : "text-gray-700 hover:text-brand-emerald-600 hover:bg-gray-100"
                    )}
                  >
                    {page.name}
                  </Link>
                );
              })}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-2 border-gray-300"
              >
                <Link href="/search" onClick={() => setIsOpen(false)}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
