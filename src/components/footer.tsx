import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/the-logo.svg"
                alt="The Halal Explorer"
                width={140}
                height={32}
                className="h-8 w-auto opacity-90"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your comprehensive guide to Muslim-friendly travel destinations around the world. Discover places with halal food, prayer facilities, and cultural insights.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-800 hover:border-primary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-800 hover:border-primary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <span className="text-lg">𝕏</span>
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-800 hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Explore</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-primary transition-colors">Destinations</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">Travel Blog</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-primary transition-colors">Search</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Resources</h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/travel-tips" className="hover:text-primary transition-colors">Travel Tips</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6">Newsletter</h5>
            <p className="text-xs mb-4">Get the latest travel guides delivered to your inbox.</p>
            <form className="relative" action="#" method="post">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                aria-label="Subscribe"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs">© {currentYear} The Halal Explorer. All rights reserved.</p>
          <div className="flex gap-8 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
