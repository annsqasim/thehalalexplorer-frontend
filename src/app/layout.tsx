import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/components/theme-registry"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from "next/script"
import { AdBanner } from "@/components/AdBanner"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Halal Explorer - Muslim-Friendly Travel Destinations",
  description:
    "Discover Muslim-friendly travel destinations around the world with information on halal food, mosques, prayer timings, and local customs.",
  generator: "Next.js",
  applicationName: "The Halal Explorer",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Halal Travel",
    "Muslim-Friendly Destinations",
    "Halal Food",
    "Mosques",
    "Prayer Timings",
    "Travel Tips",
    "Cultural Insights",
    "Islamic Travel Guide",
    "Halal Tourism",
    "Family Travel",
  ],
  authors: [{ name: "Anns Qasim", url: "https://annsqasim.com" }],
  creator: "Your Name",
  publisher: "Your Name or Company",
  openGraph: {
    title: "The Halal Explorer - Muslim-Friendly Travel Destinations",
    description:
      "Discover Muslim-friendly travel destinations around the world with information on halal food, mosques, prayer timings, and local customs.",
    url: "https://thehalalexplorer.com",
    siteName: "The Halal Explorer",
    images: ['https://thehalalexplorer.com/og-image.jpg'],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Halal Explorer - Muslim-Friendly Travel Destinations",
    description:
      "Discover Muslim-friendly travel destinations around the world with information on halal food, mosques, prayer timings, and local customs.",
    images: ['https://thehalalexplorer.com/twitter-image.jpg'],
    creator: "@yourtwitterhandle",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT; // ca-pub-...
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION; // the exact token Google gave you

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,700;1,700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
        {GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content="qkD-WldpRfqgjVToUTfSI3jILgKRb8YpVFMf2H0LGbE" />
        )}
      </head>
      <body className={`${plusJakarta.className} antialiased text-slate-800`}>
        <ThemeRegistry>
          <Navbar />
            {/* Load AdSense script only in production */}
            {ADSENSE_CLIENT && process.env.NODE_ENV === "production" && (
              <Script
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
                strategy="afterInteractive"
                crossOrigin="anonymous"
              />
            )}
          {process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP && (
            <div className="container mx-auto px-4">
              <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP as string} format="fluid" />
            </div>
          )}
          <main className="min-h-screen">{children}</main>
          {process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM && (
            <div className="container mx-auto px-4">
              <AdBanner slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM as string} format="banner" />
            </div>
          )}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  )
}
