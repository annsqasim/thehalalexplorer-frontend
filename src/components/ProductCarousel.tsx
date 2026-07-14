'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';
import type { AffiliateProductField } from '@/types';

interface ProductCarouselProps {
  products: AffiliateProductField[];
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

            return (
              <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <div className="bg-white border border-gray-200 rounded-xl p-5 h-full flex flex-col hover:shadow-md transition">
                  <div className="bg-[#E8F5F1] rounded-lg h-36 flex items-center justify-center text-4xl mb-4 p-4 flex-shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.productName}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      product.emoji || '🛒'
                    )}
                  </div>

                  {product.label && (
                    <span className="text-[#F59E0B] text-[10px] uppercase tracking-wider font-semibold mb-1">
                      {product.label}
                    </span>
                  )}

                  <h4 className="text-gray-900 font-semibold text-sm line-clamp-1 mb-1">
                    {product.productName}
                  </h4>

                  <p className="text-gray-500 text-xs leading-relaxed flex-grow line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex flex-col gap-2 mt-auto">
                    <a
                      href={addAmazonTag(product.amazonUrl)}
                      {...AFFILIATE_LINK_PROPS}
                      className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white text-xs font-bold py-2 rounded-lg text-center transition-colors"
                    >
                      🛒 Buy on Amazon
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
