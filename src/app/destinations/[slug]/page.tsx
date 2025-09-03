import Box from "@mui/material/Box"
import { Container, CardContent, Card, Chip, Divider } from "@mui/material"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "next/link"
import FeaturedDestinations from "@/components/featured-destinations"
import { AdBanner } from "@/components/AdBanner"
import { MosqueIcon, RestaurantIcon, CalendarIcon, InfoIcon } from "@/components/Icons"
import { Destination } from "@/types"
import { getDestinationBySlug } from "@/lib/sanity/queries"
import Image from "next/image"
import _get from "lodash/get"
import { PageProps } from "@/types"


export const metadata = {
  title: "Muslim-Friendly Destinations | The Halal Explorer",
  description:
    "Explore our curated list of Muslim-friendly travel destinations with information on halal food, prayer facilities, and local customs.",
}

export default async function DestinationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination: Destination = await getDestinationBySlug(slug);
  const imageUrl = _get(destination, 'image.asset.url', '/placeholder.svg');
  if (!destination) {
    return <Box sx={{ py: 4, textAlign: "center" }}>Destination not found.</Box>;
  }
  return (
    <>
      <Box sx={{ position: "relative", height: 500, overflow: "hidden", mb: 4 }}>
        <div className="destination-image-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
        <Image
          src={imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 4,
            zIndex: 2,
            color: "white",
          }}
        >
          <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
            {destination.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {destination.country}
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} {...({} as any)}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <InfoIcon /> About {destination.name}
                </Typography>
                <Typography variant="body1" component={"p"} paragraph sx={{ mb: 2 }}>
                  {destination.description}
                </Typography>
              </CardContent>
            </Card>

            {/* Ad between content blocks */}
            <AdBanner slot="destination-content" format="banner" />

            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RestaurantIcon /> Halal Food Scene
                </Typography>
                <Typography variant="body1" paragraph>
                  {destination.halalFoodInfo}
                </Typography>
                {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {destination.foodTypes.map((type) => (
                    <Chip key={type} label={type} color="primary" variant="outlined" />
                  ))}
                </Box> */}
              </CardContent>
            </Card>

            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MosqueIcon /> Prayer Facilities
                </Typography>
                <Typography variant="body1">{destination.prayerFacilities}</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarIcon /> Best Time to Visit
                </Typography>
                <Typography variant="body1">{destination.bestTimeToVisit}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} {...({} as any)}>
            {/* Use rectangle format for sidebar - more reliable */}
            <AdBanner slot="destination-sidebar" format="rectangle" />

            <Card sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Quick Facts
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Country
                    </Typography>
                    <Typography variant="body2">{destination.country}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Muslim Population
                    </Typography>
                    <Typography variant="body2">{destination.prayerFacilities}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Primary Language
                    </Typography>
                    {/* <Typography variant="body2">{destination.language}</Typography> */}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Currency
                    </Typography>
                    {/* <Typography variant="body2">{destination.currency}</Typography> */}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="primary">
                      Best Time to Visit
                    </Typography>
                    {/* <Typography variant="body2">{destination.bestTimeToVisit}</Typography> */}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
