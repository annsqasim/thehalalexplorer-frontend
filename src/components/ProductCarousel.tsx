'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';
import type { AffiliateProductField } from '@/types';

interface ProductCarouselProps {
  products: AffiliateProductField[];
}

function truncateWords(text?: string, maxWords: number = 200): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '…';
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="relative px-6">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, i) => {
            const imageUrl = typeof product.image === 'string'
              ? product.image
              : product.image?.asset?.url;
            const description = truncateWords(product.description, 200);

            return (
              <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 h-full flex flex-col hover:shadow-lg transition-all duration-300 group">
                  {/* Full-width Product Image Container */}
                  <div className="w-full h-52 bg-[#E8F5F1] rounded-xl mb-4 p-3 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.productName}
                        className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-5xl">{product.emoji || '🛒'}</span>
                    )}
                  </div>

                  {product.label && (
                    <span className="text-[#F59E0B] text-[10px] uppercase tracking-wider font-semibold mb-1">
                      {product.label}
                    </span>
                  )}

                  {/* Product Name */}
                  <h3 className="text-gray-900 font-bold text-lg leading-snug mb-2">
                    {product.productName}
                  </h3>

                  {/* Truncated Description */}
                  <p className="text-gray-600 text-xs leading-relaxed flex-grow line-clamp-4 mb-4">
                    {description}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={addAmazonTag(product.amazonUrl)}
                      {...AFFILIATE_LINK_PROPS}
                      className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white text-xs font-bold py-2.5 px-4 rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>🛒</span> Buy on Amazon
                    </a>
                    {product.priceRange && (
                      <span className="text-gray-400 text-[10px] text-center">{product.priceRange}</span>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="-left-4 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm" />
        <CarouselNext className="-right-4 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm" />
      </Carousel>
    </div>
  );
}
