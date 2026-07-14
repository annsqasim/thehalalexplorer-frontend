'use client';

import { useState } from 'react';
import { addAmazonTag, AFFILIATE_LINK_PROPS } from '@/lib/affiliate';

export interface AffiliateProductItem {
  emoji?: string;
  label?: string;
  productName: string;
  description?: string;
  amazonUrl: string;
  priceRange?: string;
  image?: string | { asset?: { url?: string } };
}

interface AffiliateProductCalloutProps {
  product: AffiliateProductItem;
}

export function AffiliateProductCallout({ product }: AffiliateProductCalloutProps) {
  const imageUrl = typeof product.image === 'string'
    ? product.image
    : product.image?.asset?.url;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.productName}
          className="w-12 h-12 object-contain flex-shrink-0 rounded-lg"
        />
      ) : (
        <span className="text-3xl flex-shrink-0">{product.emoji || '🛒'}</span>
      )}
      <div className="flex-1 min-w-0">
        {product.label && (
          <p className="text-[#F59E0B] text-[10px] uppercase tracking-wider font-semibold">
            {product.label}
          </p>
        )}
        <p className="text-gray-900 font-semibold text-sm">{product.productName}</p>
        {product.description && (
          <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{product.description}</p>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <a
          href={addAmazonTag(product.amazonUrl)}
          {...AFFILIATE_LINK_PROPS}
          className="bg-[#FF9900] text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap"
        >
          🛒 Amazon
        </a>
        {product.priceRange && (
          <span className="text-gray-400 text-[10px] text-center">{product.priceRange}</span>
        )}
      </div>
    </div>
  );
}

export interface AffiliateProductCardItem extends AffiliateProductItem {
  rank?: string;
  verdict?: string;
  pros?: string[];
  isBestPick?: boolean;
}

export function AffiliateProductCard({ product }: { product: AffiliateProductCardItem }) {
  const imageUrl = typeof product.image === 'string'
    ? product.image
    : product.image?.asset?.url;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
        <div className="bg-[#E8F5F1] flex items-center justify-center text-5xl min-h-[140px] p-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.productName}
              className="max-w-full max-h-[120px] object-contain"
            />
          ) : (
            product.emoji || '🛒'
          )}
        </div>
        <div className="p-5">
          {product.rank && (
            <p className="text-[#F59E0B] text-xs uppercase tracking-wider font-semibold mb-1">
              {product.rank}
            </p>
          )}
          <h3 className="text-gray-900 font-semibold text-lg mb-2">{product.productName}</h3>
          {product.verdict && (
            <p className="text-gray-500 text-sm leading-relaxed mb-3">{product.verdict}</p>
          )}
          {product.pros && product.pros.length > 0 && (
            <ul className="list-none space-y-1 mb-3">
              {product.pros.map((pro, i) => (
                <li key={i} className="text-gray-700 text-sm pl-4 relative before:absolute before:left-0 before:text-[#1D6A5B] before:content-['✓'] before:font-bold">
                  {pro}
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-center gap-3 flex-wrap mt-3">
            <a
              href={addAmazonTag(product.amazonUrl)}
              {...AFFILIATE_LINK_PROPS}
              className="bg-[#FF9900] text-white font-bold text-sm px-4 py-2 rounded-lg"
            >
              🛒 Check Price on Amazon
            </a>
            {product.priceRange && (
              <span className="text-gray-400 text-xs">{product.priceRange}</span>
            )}
            {product.isBestPick && (
              <span className="bg-[#1D6A5B] text-white text-xs px-2 py-1 rounded-full">
                Editor&apos;s Choice
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface EmailCaptureCardProps {
  title: string;
  description: string;
  perks: string[];
  ctaText: string;
  note: string;
}

export function EmailCaptureCard({
  title,
  description,
  perks,
  ctaText,
  note,
}: EmailCaptureCardProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
      <span className="inline-block bg-[#E8F5F1] text-[#1D6A5B] text-xs font-medium rounded-full px-3 py-1 mb-4">
        🎁 Free Download
      </span>
      <h2 className="font-semibold text-gray-900 text-lg mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-2 mb-5">
        {perks.map((perk, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-[#1D6A5B] font-bold">✓</span>
            {perk}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D6A5B]/30"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#1D6A5B] hover:bg-[#16574A] text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : ctaText}
        </button>
      </form>
      {status === 'success' && (
        <p className="text-[#1D6A5B] text-xs text-center mt-2">You&apos;re in! Check your inbox.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-xs text-center mt-2">Something went wrong. Try again.</p>
      )}
      <p className="text-xs text-gray-400 text-center mt-3">{note}</p>
    </div>
  );
}
