"use client"
import { Box, Paper, Typography } from "@mui/material"
import { useEffect, useRef } from "react"

interface Props {
  slot: string
  format?: "auto" | "rectangle" | "banner" | "fluid"
}

export function AdBanner({ slot, format = "fluid" }: Props) {
  const adRef = useRef<HTMLDivElement | null>(null)
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-5911518106581623"

  useEffect(() => {
    if (!adRef.current) return

    // Observe when the ad container is in the viewport AND has sufficient width
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const containerWidth = adRef.current?.offsetWidth ?? 0

        // For fluid ads, ensure minimum width of 250px
        const minWidth = format === "fluid" ? 250 : 100

        if (entry.isIntersecting && containerWidth >= minWidth) {
          try {
            // @ts-ignore – injected by AdSense
            ;(window.adsbygoogle = window.adsbygoogle || []).push({})
            observer.disconnect()
          } catch (err) {
            console.error("AdSense error:", err)
          }
        }
      },
      { threshold: 0 },
    )

    // Add a small delay to ensure layout is complete
    const timer = setTimeout(() => {
      if (adRef.current) {
        observer.observe(adRef.current)
      }
    }, 100)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [format])

  // Determine minimum width based on format
  const getMinWidth = () => {
    switch (format) {
      case "fluid":
        return 250
      case "banner":
        return 320
      case "rectangle":
        return 300
      default:
        return 250
    }
  }

  // Always render; clientId falls back to your provided publisher ID

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        my: 3,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        minHeight: format === "banner" ? 90 : format === "rectangle" ? 250 : 200,
        minWidth: getMinWidth(),
        alignItems: "center",
        justifyContent: "center",
        // Hide on very small screens where width would be insufficient
        display: { xs: format === "fluid" ? "none" : "flex", sm: "flex" },
      }}
      ref={adRef}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minWidth: `${getMinWidth()}px`,
        }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />

      {/* Fallback content for development */}
      <Box sx={{ opacity: 0.6, pointerEvents: "none", position: "absolute" }}>
        <Typography variant="body2" color="text.secondary">
          Advertisement Space
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {slot} • {format} • Min: {getMinWidth()}px
        </Typography>
      </Box>
    </Paper>
  )
}
