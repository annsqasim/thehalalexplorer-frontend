import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/components/theme-registry"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from "next/script"
import { AdBanner } from "@/components/AdBanner"

const inter = Inter({ subsets: ["latin"] })

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          id="adsbygoogle-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-5911518106581623'}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeRegistry>
          <Navbar />
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
          {/* <Footer /> */}
        </ThemeRegistry>
      </body>
    </html>
  )
}
