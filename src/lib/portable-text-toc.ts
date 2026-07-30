import type { PortableTextBlock } from '@portabletext/types';

export interface TocItem {
  id: string;
  label: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function getBlockText(block: PortableTextBlock): string {
  if (!block.children || !Array.isArray(block.children)) return '';
  return block.children
    .map((child) => ('text' in child ? child.text : ''))
    .join('')
    .trim();
}

export function extractTocFromBlocks(blocks: PortableTextBlock[]): TocItem[] {
  const items: TocItem[] = [];
  const usedIds = new Set<string>();

  for (const block of blocks) {
    if (block._type !== 'block') continue;
    const style = block.style;
    if (style !== 'h2' && style !== 'h3') continue;

    const label = getBlockText(block);
    if (!label) continue;

    let id = slugify(label);
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${slugify(label)}-${suffix++}`;
    }
    usedIds.add(id);
    items.push({ id, label });
  }

  return items;
}
