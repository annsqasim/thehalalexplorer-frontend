import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';
import type { AffiliateProductItem } from '@/components/affiliate';

const DEFAULT_PRODUCTS: AffiliateProductItem[] = [
  { emoji: '🧱', productName: 'Compact Travel Prayer Mat', description: 'Folds to paperback size', amazonUrl: '#' },
  { emoji: '🔋', productName: '20,000mAh Power Bank', description: 'Keep Athan app charged all day', amazonUrl: '#' },
  { emoji: '📦', productName: '6-Piece Packing Cube Set', description: 'One cube for prayer essentials', amazonUrl: '#' },
  { emoji: '🌴', productName: 'Premium Medjool Dates', description: 'Natural halal travel snack', amazonUrl: '#' },
];

/**
 * Amazon listing copy is often pasted in raw, with checkmark emoji and
 * shouty feature lists. Strip the symbols; the card clamps the length.
 */
function cleanBlurb(text?: string): string {
  if (!text) return '';
  return text
    .replace(/[\u2705\u2714\u2611\u{1F300}-\u{1FAFF}\uFE0F]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function AffiliateStrip({ products }: { products?: AffiliateProductItem[] }) {
  const items = products?.length ? products : DEFAULT_PRODUCTS;

  return (
    <section className="bg-[#0F1923] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-serif font-bold">Muslim Travel Essentials</h2>
            <p className="text-white/60 text-sm mt-1">Products we actually use and recommend</p>
          </div>
          <span className="bg-[#FF9900] text-white text-xs font-bold px-3 py-1.5 rounded-lg self-start">
            Amazon Associates
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {items.map((product, i) => {
            const imageUrl = typeof product.image === 'string'
              ? product.image
              : product.image?.asset?.url;
            const description = cleanBlurb(product.description);

            return (
              <div
                key={i}
                className="bg-[#1a2535] border border-white/10 rounded-2xl p-3 sm:p-5 flex flex-col hover:border-[#1D6A5B]/60 transition-all duration-300 shadow-md group"
              >
                {/* Full-width Product Image */}
                <div className="w-full h-32 sm:h-44 bg-white rounded-xl mb-3 sm:mb-4 p-3 flex items-center justify-center overflow-hidden border border-white/5 transition-colors">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.productName}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-6xl">{product.emoji || '🛒'}</span>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="text-white font-semibold text-sm sm:text-base leading-snug mb-2 line-clamp-2">
                  {product.productName}
                </h3>

                {/* Description (Max 200 Words) */}
                <p className="max-sm:hidden text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                  {description}
                </p>

                {/* View on Amazon Button */}
                <a
                  href={addAmazonTag(product.amazonUrl)}
                  {...AFFILIATE_LINK_PROPS}
                  className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl text-center transition-colors shadow-sm mt-auto flex items-center justify-center gap-2"
                >
                  <span className="max-sm:hidden">🛒</span> View on Amazon
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
