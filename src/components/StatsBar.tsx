interface StatItem {
  number: string;
  label: string;
}

function defaultStats(destinationCount?: number): StatItem[] {
  return [
    // Real count of published destinations, so the number never goes stale
    { number: destinationCount ? String(destinationCount) : '50+', label: 'Destinations Covered' },
    { number: '$220B', label: 'Muslim Travel Market' },
    { number: '100%', label: 'Halal-Focused Content' },
  ];
}

const DESKTOP_COLS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export function StatsBar({
  stats,
  destinationCount,
}: {
  stats?: StatItem[];
  destinationCount?: number;
}) {
  const items = stats?.length ? stats : defaultStats(destinationCount);
  // Four stats wrap to 2x2 on phones; three or fewer stay on one row
  const phoneCols = items.length === 4 ? 'grid-cols-2' : items.length === 3 ? 'grid-cols-3' : 'grid-cols-2';
  const twoByTwo = items.length === 4;

  return (
    <section className="bg-[#0F1923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid ${phoneCols} ${DESKTOP_COLS[items.length] ?? 'lg:grid-cols-4'}`}>
          {items.map((stat, i) => (
            <div
              key={i}
              className={`px-3 py-5 text-center lg:px-8 lg:text-left border-white/10 ${
                twoByTwo
                  ? 'odd:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0'
                  : 'border-r last:border-r-0'
              }`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-[11px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
