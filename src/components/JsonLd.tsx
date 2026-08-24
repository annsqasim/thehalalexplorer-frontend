/**
 * Reusable JSON-LD structured data component.
 * Renders a <script type="application/ld+json"> tag safely.
 *
 * Usage:
 *   <JsonLd data={{ "@type": "Organization", ... }} />
 */

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
