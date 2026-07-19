import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';
import type { AffiliateProductItem } from '@/components/affiliate';

const DEFAULT_PRODUCTS: AffiliateProductItem[] = [
  { emoji: '🧱', productName: 'Compact Travel Prayer Mat', description: 'Folds to paperback size', amazonUrl: '#' },
  { emoji: '🔋', productName: '20,000mAh Power Bank', description: 'Keep Athan app charged all day', amazonUrl: '#' },
  { emoji: '📦', productName: '6-Piece Packing Cube Set', description: 'One cube for prayer essentials', amazonUrl: '#' },
  { emoji: '🌴', productName: 'Premium Medjool Dates', description: 'Natural halal travel snack', amazonUrl: '#' },
];

function truncateWords(text?: string, maxWords: number = 200): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

export function AffiliateStrip({ products }: { products?: AffiliateProductItem[] }) {
  const items = products?.length ? products : DEFAULT_PRODUCTS;

  return (
    <section className="bg-[#0F1923] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl font-bold">Muslim Travel Essentials</h2>
            <p className="text-white/60 text-sm mt-1">Products we actually use and recommend</p>
          </div>
          <span className="bg-[#FF9900] text-white text-xs font-bold px-3 py-1.5 rounded-lg self-start">
            Amazon Associates
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, i) => {
            const imageUrl = typeof product.image === 'string'
              ? product.image
              : product.image?.asset?.url;
            const description = truncateWords(product.description, 200);

            return (
              <div
                key={i}
                className="bg-[#1a2535] border border-white/10 rounded-2xl p-5 flex flex-col hover:border-[#1D6A5B]/60 transition-all duration-300 shadow-md group"
              >
                {/* Full-width Product Image */}
                <div className="w-full h-52 bg-white/5 rounded-xl mb-4 p-3 flex items-center justify-center overflow-hidden border border-white/5 group-hover:bg-white/10 transition-colors">
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
                <h3 className="text-white font-bold text-lg sm:text-xl leading-snug mb-2">
                  {product.productName}
                </h3>

                {/* Description (Max 200 Words) */}
                <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5 line-clamp-6">
                  {description}
                </p>

                {/* View on Amazon Button */}
                <a
                  href={addAmazonTag(product.amazonUrl)}
                  {...AFFILIATE_LINK_PROPS}
                  className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white text-sm font-bold py-3 px-4 rounded-xl text-center transition-colors shadow-sm mt-auto flex items-center justify-center gap-2"
                >
                  <span>🛒</span> View on Amazon
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
