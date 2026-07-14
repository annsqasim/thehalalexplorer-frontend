export interface FoodItemData {
  emoji?: string;
  name: string;
  description?: string;
}

export function FoodItem({ item }: { item: FoodItemData }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3 items-start">
      <span className="text-xl flex-shrink-0">{item.emoji || '🍽️'}</span>
      <div>
        <p className="text-gray-900 font-semibold text-sm mb-0.5">{item.name}</p>
        {item.description && (
          <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export interface MosqueItemData {
  name: string;
  description?: string;
  isLandmark?: boolean;
}

export function MosqueItem({ item }: { item: MosqueItemData }) {
  return (
    <div className="bg-[#E8F5F1] rounded-xl p-4 flex gap-3 items-start">
      <span className="w-2 h-2 bg-[#1D6A5B] rounded-full mt-1.5 flex-shrink-0" />
      <div>
        <p className="text-[#1D6A5B] font-semibold text-sm mb-0.5">
          {item.name}
          {item.isLandmark && (
            <span className="ml-2 text-[10px] uppercase tracking-wider text-[#F59E0B]">Landmark</span>
          )}
        </p>
        {item.description && (
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
}

interface DestinationRatings {
  halalFood?: number;
  mosques?: number;
  modestDress?: number;
  safety?: number;
}

const RATING_CONFIG = [
  { key: 'halalFood' as const, emoji: '🥩', label: 'Halal Food' },
  { key: 'mosques' as const, emoji: '🕌', label: 'Mosques' },
  { key: 'modestDress' as const, emoji: '👗', label: 'Modest Dress' },
  { key: 'safety' as const, emoji: '🛡', label: 'Safety' },
];

function renderStars(value: number) {
  const filled = Math.round(Math.min(5, Math.max(0, value)));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
}

export function RatingRow({ ratings }: { ratings?: DestinationRatings }) {
  if (!ratings) return null;
  const hasAny = RATING_CONFIG.some((c) => ratings[c.key]);
  if (!hasAny) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {RATING_CONFIG.map(({ key, emoji, label }) => {
        const value = ratings[key];
        if (!value) return null;
        return (
          <div key={key} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{emoji}</div>
            <p className="text-gray-400 text-[10px] uppercase tracking-wider font-semibold">{label}</p>
            <p className="text-[#F59E0B] text-xs mt-1">{renderStars(value)}</p>
            <p className="text-gray-700 text-xs font-semibold mt-0.5">{value}/5</p>
          </div>
        );
      })}
    </div>
  );
}
