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
        <div className="flex flex-col sm:flex-row">
          {items.map((stat, i) => (
            <div
              key={i}
              className="flex-1 px-8 py-6 sm:py-4 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-white/10 last:border-r-0 last:border-b-0"
            >
              <div className="text-3xl font-bold text-[#1D6A5B]">{stat.number}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
