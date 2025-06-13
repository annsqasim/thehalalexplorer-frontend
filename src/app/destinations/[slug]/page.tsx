import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "next/link"
import FeaturedDestinations from "@/components/featured-destinations"

// Mock data - in a real app, this would come from Sanity
const destinations = [
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    description: "A city where East meets West, with stunning mosques and rich Islamic heritage.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "April to May, September to November",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Modern metropolis with luxury shopping, ultramodern architecture, and vibrant nightlife.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "November to March",
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    description: "A cultural melting pot with iconic skyscrapers and delicious halal cuisine.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "May to July",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    description: "A vibrant city known for its markets, gardens, palaces, and mosques.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 4,
    prayerFacilities: 5,
    bestTimeToVisit: "March to May, September to November",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    description: "Home to the Pyramids of Giza and the iconic Nile River with rich Islamic history.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 4,
    prayerFacilities: 5,
    bestTimeToVisit: "October to April",
  },
  {
    id: "doha",
    name: "Doha",
    country: "Qatar",
    description: "A rapidly developing city with modern architecture and traditional Islamic values.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "November to April",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    description: "Paradise islands with crystal clear waters and Muslim-friendly resorts.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 4,
    prayerFacilities: 4,
    bestTimeToVisit: "November to April",
  },
  {
    id: "amman",
    name: "Amman",
    country: "Jordan",
    description: "A city with ancient ruins and a gateway to Petra and the Dead Sea.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 4,
    prayerFacilities: 5,
    bestTimeToVisit: "March to May, September to November",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    description: "A modern city-state with excellent halal food options and Muslim-friendly attractions.",
    image: "/placeholder.svg?height=300&width=500",
    halalFoodRating: 5,
    prayerFacilities: 4,
    bestTimeToVisit: "February to April",
  },
]

export const metadata = {
  title: "Muslim-Friendly Destinations | The Halal Explorer",
  description:
    "Explore our curated list of Muslim-friendly travel destinations with information on halal food, prayer facilities, and local customs.",
}

export default function DestinationsPage() {
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
