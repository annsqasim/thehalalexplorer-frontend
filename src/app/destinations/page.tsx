import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "next/link"
import FeaturedDestinations from "@/components/featured-destinations"
import { getAllDestinations } from "@/lib/sanity/queries"
import { Destination } from "@/types"

export const metadata = {
  title: "Muslim-Friendly Destinations | The Halal Explorer",
  description:
    "Explore our curated list of Muslim-friendly travel destinations with information on halal food, prayer facilities, and local customs.",
}

export default async function DestinationsPage() {
  const destinations: Destination[] = await getAllDestinations();
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
          <Typography color="text.primary">Destinations</Typography>
        </Breadcrumbs>

        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
          Muslim-Friendly Destinations
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 6, maxWidth: "800px" }}>
          Explore our curated collection of Muslim-friendly destinations around the world. Each destination features
          detailed information about halal food options, prayer facilities, local customs, and the best times to visit.
        </Typography>

        <FeaturedDestinations destinations={destinations} />
      </Container>
    </Box>
  )
}
