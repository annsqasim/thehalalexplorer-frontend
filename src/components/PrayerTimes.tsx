"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, Typography, Box, Divider, Chip } from "@mui/material"

type Props = {
  city: string
  country: string
  method?: number
}

type Timings = Record<string, string>

export default function PrayerTimes({ city, country, method = 2 }: Props) {
  const [timings, setTimings] = useState<Timings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const url = new URL("https://api.aladhan.com/v1/timingsByCity")
        url.searchParams.set("city", city)
        url.searchParams.set("country", country)
        url.searchParams.set("method", String(method))
        const res = await fetch(url.toString())
        const json = await res.json()
        if (!cancelled) {
          if (json?.code === 200 && json?.data?.timings) {
            setTimings(json.data.timings as Timings)
          } else {
            setError("Unable to load prayer times")
          }
        }
      } catch (e) {
        if (!cancelled) setError("Failed to fetch prayer times")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [city, country, method])

  const order = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"]

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Prayer Times
          </Typography>
          <Chip size="small" label={`${city}, ${country}`} />
        </Box>
        <Divider sx={{ mb: 2 }} />
        {loading && <Typography variant="body2">Loading timings...</Typography>}
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        {!loading && !error && timings && (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
            {order.map((name) => (
              <Box key={name} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {name}
                </Typography>
                <Typography variant="body2">{timings[name]}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}


