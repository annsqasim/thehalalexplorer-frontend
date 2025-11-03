"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // Basic inline image support; customize if needed
      const url = value?.asset?.url;
      if (!url) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={value?.alt || ""} className="my-6 rounded-md" />
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-3">{children}</h3>,
    normal: ({ children }) => <p className="leading-7 my-3">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic my-4 text-muted-foreground">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm">{children}</code>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-3">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-3">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
};

export default function RichText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}


