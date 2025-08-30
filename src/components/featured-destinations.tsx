"use client"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CardActionArea from "@mui/material/CardActionArea"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Rating from "@mui/material/Rating"
import Chip from "@mui/material/Chip"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import MosqueIcon from "@mui/icons-material/Mosque"
import Link from "next/link"

interface Destination {
  id: string
  name: string
  country: string
  description: string
  image: string
  halalFoodRating: number
  prayerFacilities: number
  bestTimeToVisit: string
}

interface FeaturedDestinationsProps {
  destinations: Destination[]
}

export default function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  return (
    <Grid container spacing={4}>
      {destinations.map((destination) => (
        <Grid key={destination.id} size={{ xs: 12, md: 4, sm: 6 }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardActionArea component={Link} href={`/destinations/${destination.id}`} sx={{ flexGrow: 1 }}>
              <Box sx={{ position: "relative", height: 220 }}>
                <CardMedia
                  component="img"
                  height="220"
                  image={destination.image}
                  alt={destination.name}
                  sx={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    label={destination.country}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      color: "#2c3c2c",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {destination.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                  {destination.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "rgba(94, 139, 126, 0.1)",
                      mr: 1.5,
                    }}
                  >
                    <RestaurantIcon fontSize="small" sx={{ color: "#5e8b7e" }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" component="span" sx={{ mr: 1, fontWeight: 500 }}>
                      Halal Food:
                    </Typography>
                    <Rating value={destination.halalFoodRating} readOnly size="small" />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: "rgba(94, 139, 126, 0.1)",
                      mr: 1.5,
                    }}
                  >
                    <MosqueIcon fontSize="small" sx={{ color: "#5e8b7e" }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" component="span" sx={{ mr: 1, fontWeight: 500 }}>
                      Prayer Facilities:
                    </Typography>
                    <Rating value={destination.prayerFacilities} readOnly size="small" />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <strong>Best time to visit:</strong> {destination.bestTimeToVisit}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
