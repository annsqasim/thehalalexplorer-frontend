// components/DestinationAutocomplete.tsx
'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, MapPin, X, ArrowRight, Star } from 'lucide-react';
import _get from 'lodash/get';
import { Destination } from "@/types"

const MAX_RESULTS = 6;

function hrefFor(d: Destination) {
  return `/destinations/${_get(d, 'slug.current', d.id)}`;
}

export default function DestinationAutocomplete({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return destinations.slice(0, MAX_RESULTS);
    // Names that start with the query rank above partial/country matches.
    return destinations
      .filter((d) => `${d.name} ${d.country}`.toLowerCase().includes(q))
      .sort((a, b) => Number(!a.name.toLowerCase().startsWith(q)) - Number(!b.name.toLowerCase().startsWith(q)))
      .slice(0, MAX_RESULTS);
  }, [destinations, query]);

  const popular = useMemo(
    () => [...destinations].sort((a, b) => (b.muslimFriendlyScore ?? 0) - (a.muslimFriendlyScore ?? 0)).slice(0, 5),
    [destinations]
  );

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (d?: Destination) => {
    if (!d) return;
    setOpen(false);
    router.push(hrefFor(d));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === 'Escape') {
      if (query) setQuery('');
      else setOpen(false);
    }
  };

  const showList = open && (results.length > 0 || query.trim().length > 0);

  return (
    <div ref={rootRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(results[active]);
        }}
        className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pl-5 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.25)] transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 dark:border-slate-700 dark:bg-slate-900"
      >
        <Search className="h-5 w-5 shrink-0 text-slate-400 transition group-focus-within:text-primary" aria-hidden />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && results[active] ? `${listId}-${active}` : undefined}
          aria-label="Search destinations"
          placeholder="Where do you want to go? Try Dubai, Istanbul…"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-emerald-600 active:scale-[0.98] sm:px-6"
        >
          <span className="hidden sm:inline">Search</span>
          <ArrowRight className="h-4 w-4 sm:hidden" aria-hidden />
        </button>
      </form>

      {showList && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          {!query.trim() && (
            <p className="px-4 pt-3 pb-1 text-xs font-medium uppercase tracking-wider text-slate-400">Suggested</p>
          )}
          {results.length > 0 ? (
            <ul id={listId} role="listbox" className="max-h-80 overflow-y-auto p-1.5">
              {results.map((d, i) => {
                const img = _get(d, 'image.asset.url') as string | undefined;
                return (
                  <li
                    key={d._id}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => go(d)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 transition ${
                      i === active ? 'bg-brand-emerald-50 dark:bg-slate-800' : ''
                    }`}
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                      {img ? (
                        <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                      ) : (
                        <MapPin className="m-2.5 h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-900 dark:text-white">{d.name}</p>
                      <p className="truncate text-sm text-slate-500">{d.country}</p>
                    </div>
                    {d.muslimFriendlyScore ? (
                      <span className="flex items-center gap-1 rounded-full bg-brand-emerald-50 px-2 py-0.5 text-xs font-semibold text-brand-emerald-700 dark:bg-brand-emerald-900/40 dark:text-brand-emerald-300">
                        <Star className="h-3 w-3 fill-current" aria-hidden />
                        {d.muslimFriendlyScore}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-slate-500">
              No destinations match “{query.trim()}”.
            </p>
          )}
        </div>
      )}

      {popular.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-slate-500">Popular:</span>
          {popular.map((d) => (
            <button
              key={d._id}
              type="button"
              onClick={() => go(d)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 transition hover:border-primary hover:text-brand-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {d.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
