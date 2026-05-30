interface PortableTextSpan {
  _type: 'span';
  _key?: string;
  text: string;
  marks: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  _key?: string;
  style: 'normal' | 'h2' | 'h3' | 'blockquote';
  children: PortableTextSpan[];
  markDefs: unknown[];
}

export function attachPortableTextKeys(
  blocks: Omit<PortableTextBlock, '_key'>[]
): PortableTextBlock[] {
  const ts = Date.now();
  return blocks.map((block, bi) => ({
    ...block,
    _key: `block-${bi}-${ts}`,
    markDefs: block.markDefs ?? [],
    children: block.children.map((span, si) => ({
      ...span,
      _key: `span-${bi}-${si}-${ts}`,
      marks: span.marks ?? [],
    })),
  }));
}
