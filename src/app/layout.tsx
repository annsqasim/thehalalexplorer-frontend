import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeRegistry from "@/components/theme-registry"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Halal Explorer - Muslim-Friendly Travel Destinations",
  description:
    "Discover Muslim-friendly travel destinations around the world with information on halal food, mosques, prayer timings, and local customs.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Analytics />
          {/* <Footer /> */}
        </ThemeRegistry>
      </body>
    </html>
  )
}
