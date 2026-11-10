interface StatItem {
  number: string;
  label: string;
}

const DEFAULT_STATS: StatItem[] = [
  { number: '53', label: 'Destinations Covered' },
  { number: '$220B', label: 'Muslim Travel Market' },
  { number: '3.2K', label: 'Newsletter Subscribers' },
  { number: '100%', label: 'Halal-Focused Content' },
];

export function StatsBar({ stats }: { stats?: StatItem[] }) {
  const items = stats?.length ? stats : DEFAULT_STATS;

  return (
    <section className="bg-[#0F1923]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((stat, i) => (
            <div
              key={i}
              className="px-4 py-5 text-center lg:px-8 lg:text-left border-white/10 odd:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
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
