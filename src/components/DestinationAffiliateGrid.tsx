'use client';

import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';
import type { AffiliateProductField } from '@/types';

interface DestinationAffiliateGridProps {
  products: AffiliateProductField[];
}

function truncateWords(text?: string, maxWords: number = 200): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

export function DestinationAffiliateGrid({ products }: DestinationAffiliateGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 my-6">
      {products.map((product, i) => {
        const imageUrl = typeof product.image === 'string'
          ? product.image
          : product.image?.asset?.url;
        const description = truncateWords(product.description || product.verdict, 200);

        return (
          <a
            key={i}
            href={addAmazonTag(product.amazonUrl)}
            {...AFFILIATE_LINK_PROPS}
            className="group bg-white border border-gray-200 hover:border-[#1D6A5B]/40 rounded-2xl p-4 sm:p-5 flex items-center gap-4 sm:gap-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Square Image/Logo Container on Left */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-50 border border-gray-100 rounded-xl p-2 flex items-center justify-center overflow-hidden group-hover:bg-[#E8F5F1]/50 transition-colors">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-contain transition-transform group-hover:scale-105"
                />
              ) : (
                <span className="text-3xl sm:text-4xl">{product.emoji || '🛒'}</span>
              )}
            </div>

            {/* Content on Right */}
            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 font-bold text-base sm:text-lg mb-1 group-hover:text-[#1D6A5B] transition-colors line-clamp-1">
                {product.productName}
              </h3>
              {description && (
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-2">
                  {description}
                </p>
              )}
              <span className="inline-flex items-center text-xs font-bold text-[#FF9900] group-hover:underline">
                🛒 View on Amazon →
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
