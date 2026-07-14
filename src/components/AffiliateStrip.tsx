import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';
import type { AffiliateProductItem } from '@/components/affiliate';

const DEFAULT_PRODUCTS: AffiliateProductItem[] = [
  { emoji: '🧱', productName: 'Compact Travel Prayer Mat', description: 'Folds to paperback size', amazonUrl: '#' },
  { emoji: '🔋', productName: '20,000mAh Power Bank', description: 'Keep Athan app charged all day', amazonUrl: '#' },
  { emoji: '📦', productName: '6-Piece Packing Cube Set', description: 'One cube for prayer essentials', amazonUrl: '#' },
  { emoji: '🌴', productName: 'Premium Medjool Dates', description: 'Natural halal travel snack', amazonUrl: '#' },
];

export function AffiliateStrip({ products }: { products?: AffiliateProductItem[] }) {
  const items = products?.length ? products : DEFAULT_PRODUCTS;

  return (
    <section className="bg-[#0F1923] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white text-2xl font-semibold">Muslim Travel Essentials</h2>
            <p className="text-white/50 text-sm mt-1">Products we actually use and recommend</p>
          </div>
          <span className="bg-[#FF9900] text-white text-xs font-bold px-2 py-1 rounded self-start">
            Amazon Associates
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map((product, i) => (
            <div
              key={i}
              className="bg-[#1a2535] border border-white/10 rounded-xl p-5 flex flex-col hover:border-[#1D6A5B]/50 transition"
            >
              <span className="text-3xl mb-3">{product.emoji}</span>
              <p className="text-white font-semibold text-sm mb-1">{product.productName}</p>
              <p className="text-white/50 text-xs leading-relaxed flex-1 mb-4">{product.description}</p>
              <a
                href={addAmazonTag(product.amazonUrl)}
                {...AFFILIATE_LINK_PROPS}
                className="bg-[#FF9900] text-white text-xs font-bold px-3 py-2 rounded-md text-center"
              >
                🛒 View on Amazon
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
