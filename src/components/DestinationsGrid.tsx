'use client';

import { useMemo, useState } from 'react';
import { DestinationCard } from '@/components/DestinationCard';
import { getDestinationExcerpt } from '@/lib/destination-content';
import type { Destination } from '@/types';
import _get from 'lodash/get';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

const REGIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'middle-east', label: 'Middle East' },
  { value: 'southeast-asia', label: 'Southeast Asia' },
  { value: 'south-asia', label: 'South Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'africa', label: 'Africa' },
  { value: 'east-asia', label: 'East Asia' },
  { value: 'americas', label: 'Americas' },
  { value: 'central-asia', label: 'Central Asia' },
  { value: 'oceania', label: 'Oceania' },
];

type SortKey = 'default' | 'az' | 'rating';

export function DestinationsGrid({ destinations }: { destinations: Destination[] }) {
  const [region, setRegion] = useState('all');
  const [sort, setSort] = useState<SortKey>('default');

  const filtered = useMemo(() => {
    let list = [...destinations];
    if (region !== 'all') {
      list = list.filter((d) => d.region === region);
    }
    if (sort === 'az') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'rating') {
      list.sort((a, b) => (b.muslimFriendlyScore || 0) - (a.muslimFriendlyScore || 0));
    }
    return list;
  }, [destinations, region, sort]);

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
          >
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white"
          >
            <option value="default">Default</option>
            <option value="az">A–Z</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No destinations found for this region. Try a different filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((destination, index) => (
            <DestinationCard
              key={destination._id}
              name={destination.name}
              country={destination.country}
              description={getDestinationExcerpt(destination)}
              imageUrl={_get(destination, 'image.asset.url', PLACEHOLDER_IMAGE)}
              slug={destination.slug.current}
              score={destination.muslimFriendlyScore}
              index={index}
            />
          ))}
        </div>
      )}
    </>
  );
}
