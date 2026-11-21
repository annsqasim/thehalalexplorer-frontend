"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";

export interface SearchItem {
  id: string;
  name: string;
  country: string;
  region?: string;
  slug: string;
  description: string;
  imageUrl: string;
  score?: number;
}

export function SearchResults({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [region, setRegion] = useState(params.get("region") ?? "");

  const regions = useMemo(
    () => [...new Set(items.map((i) => i.region).filter((r): r is string => Boolean(r)))].sort(),
    [items]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!region || i.region === region) &&
        (!q || `${i.name} ${i.country} ${i.region ?? ""}`.toLowerCase().includes(q))
    );
  }, [items, query, region]);

  // Keep the URL in sync so searches can be shared, without adding history entries
  const sync = (q: string, r: string) => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (r) next.set("region", r);
    router.replace(`/search${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      <section className="bg-[#0F1923] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Search destinations</h1>
          <p className="mb-6 text-white/80">Find Muslim-friendly cities by name, country or region.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 text-slate-900">
              <Search className="h-5 w-5 text-slate-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  sync(e.target.value, region);
                }}
                placeholder="Try Istanbul, Malaysia or Europe"
                aria-label="Search destinations"
                className="min-w-0 flex-1 bg-transparent py-3 focus:outline-none"
              />
            </label>
            {regions.length > 0 && (
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  sync(query, e.target.value);
                }}
                aria-label="Filter by region"
                className="rounded-full bg-white px-4 py-3 text-slate-900"
              >
                <option value="">All regions</option>
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          {results.length} {results.length === 1 ? "destination" : "destinations"}
        </p>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {results.map((item, index) => (
              <DestinationCard
                key={item.id}
                name={item.name}
                country={item.country}
                description={item.description}
                imageUrl={item.imageUrl}
                slug={item.slug}
                score={item.score}
                index={index}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-slate-600 dark:text-slate-400">
            No destinations match your search. Try a country or region instead.
          </p>
        )}
      </section>
    </div>
  );
}
