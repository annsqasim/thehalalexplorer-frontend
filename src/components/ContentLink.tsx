// components/ContentLink.tsx
// Link renderer for Sanity rich text. Internal links stay in the tab and pass
// link equity; affiliate links get rel="sponsored"; other external links open
// in a new tab without nofollow.

import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/constants/site";
import { AFFILIATE_HOSTS } from "@/lib/travel-data";

const SITE_HOST = new URL(SITE_URL).hostname.replace(/^www\./, "");

type LinkKind = "internal" | "affiliate" | "external";

export function classifyHref(href: string): { kind: LinkKind; href: string } {
  if (href.startsWith("/") || href.startsWith("#")) return { kind: "internal", href };
  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");
    if (host === SITE_HOST) return { kind: "internal", href: `${url.pathname}${url.search}${url.hash}` };
    if (AFFILIATE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`) || (h.endsWith(".") && host.includes(h)))) {
      return { kind: "affiliate", href };
    }
  } catch {
    // Not an absolute URL (e.g. mailto:); treat as external
  }
  return { kind: "external", href };
}

const CLASS = "underline hover:no-underline";

export function ContentLink({ href, children }: { href?: string; children: ReactNode }) {
  if (!href) return <>{children}</>;
  const link = classifyHref(href);

  if (link.kind === "internal") {
    return (
      <Link href={link.href} className={CLASS}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className={CLASS}
      target="_blank"
      rel={link.kind === "affiliate" ? "noopener noreferrer nofollow sponsored" : "noopener noreferrer"}
    >
      {children}
    </a>
  );
}
