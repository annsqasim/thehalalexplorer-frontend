"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TocItem {
  id: string;
  label: string;
}

interface Props {
  items: TocItem[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export function BlogTocSidebar({ items, ctaTitle, ctaDescription }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden sticky top-20">
        <div className="bg-[#1D6A5B] text-white px-4 py-3 text-xs font-semibold uppercase tracking-wider">
          📋 Table of Contents
        </div>
        <ul className="px-4 py-2">
          {items.map(({ id, label }) => (
            <li key={id} className="border-b border-gray-100 last:border-b-0">
              <a
                href={`#${id}`}
                className={`block py-2 text-sm transition-colors ${
                  activeId === id
                    ? "text-[#1D6A5B] font-semibold"
                    : "text-gray-600 hover:text-[#1D6A5B]"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#E8F5F1] rounded-xl p-5">
        <h3 className="text-gray-900 font-semibold text-base">
          {ctaTitle || "The Halal Traveller's Starter Kit"}
        </h3>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">
          {ctaDescription ||
            "Get our free guide to halal travel essentials, prayer tips, and destination checklists."}
        </p>
        <Link
          href="/contact"
          className="block w-full mt-4 text-center bg-[#1D6A5B] hover:bg-[#16574A] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
        >
          Get the Free Guide →
        </Link>
      </div>
    </aside>
  );
}
