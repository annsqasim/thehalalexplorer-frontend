import Link from "next/link";
import { Section } from "@/components/Section";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Section className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-brand-emerald-500" />
              <h3 className="text-xl font-bold text-white">The Halal Explorer</h3>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your comprehensive guide to Muslim-friendly travel destinations around the world. Discover places with halal food, prayer facilities, and cultural insights.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-emerald-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-emerald-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-emerald-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-brand-emerald-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/travel-tips"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-brand-emerald-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} The Halal Explorer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-brand-emerald-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-brand-emerald-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
}
