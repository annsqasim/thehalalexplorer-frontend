"use client"
import { useState } from "react"
import type React from "react"

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
  Paper,
  Rating,
  Divider,
} from "@mui/material"
import {
  Search as SearchIcon,
  TravelExplore,
  Restaurant,
  Mosque,
  Hotel,
  BeachAccess,
  Museum,
  Nature,
  Hiking,
} from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import { allDestinations } from "@/lib/mock-data"
import { PLACEHOLDER_IMAGE } from "@/lib/constants"

// Mock experiences data
const experiences = [
  {
    id: 1,
    title: "Desert Safari with Halal BBQ",
    location: "Dubai, UAE",
    category: "Adventure",
    image: "/placeholder.svg?height=300&width=500",
    rating: 4.8,
    reviewCount: 156,
    price: "$85",
    description: "Experience the thrill of dune bashing followed by a halal BBQ dinner under the stars.",
    tags: ["Family-Friendly", "Prayer Facilities", "Halal Food"],
  },
  {
    id: 2,
    title: "Islamic Heritage Tour",
    location: "Istanbul, Turkey",
    category: "Cultural",
    image: "/placeholder.svg?height=300&width=500",
    rating: 4.9,
    reviewCount: 203,
    price: "$45",
    description: "Explore Istanbul's rich Islamic heritage with visits to historic mosques and museums.",
    tags: ["Educational", "Prayer Breaks", "Guided Tour"],
  },
  {
    id: 3,
    title: "Halal Food Walking Tour",
    location: "Kuala Lumpur, Malaysia",
    category: "Food",
    image: "/placeholder.svg?height=300&width=500",
    rating: 4.7,
    reviewCount: 178,
    price: "$35",
    description: "Sample the best halal street food and local delicacies with a knowledgeable local guide.",
    tags: ["Halal Certified", "Small Groups", "Local Experience"],
  },
  {
    id: 4,
    title: "Private Beach Resort Day",
    location: "Maldives",
    category: "Beach",
    image: "/placeholder.svg?height=300&width=500",
    rating: 4.9,
    reviewCount: 124,
    price: "$120",
    description: "Enjoy a day at a private beach resort with separate facilities for families and women.",
    tags: ["Privacy", "Halal Food", "Prayer Facilities"],
  },
  {
    id: 5,
    title: "Modest Fashion Shopping Tour",
    location: "London, UK",
    category: "Shopping",
    image: "/placeholder.svg?height=300&width=500",
    rating: 4.6,
    reviewCount: 98,
    price: "$40",
    description: "Discover the best modest fashion boutiques and designers in London's fashion districts.",
    tags: ["Female Guide", "Prayer Breaks", "Small Groups"],
  },
  {
    id: 6,
    title: "Rainforest Eco Adventure",
    location: "Langkawi, Malaysia",
    category: "Nature",
    image: "/placeholder.svg?height=300&width=500",
    rating: 4.8,
    reviewCount: 145,
    price: "$65",
    description: "Explore the lush rainforest with Muslim-friendly facilities and halal lunch included.",
    tags: ["Eco-Friendly", "Halal Food", "Prayer Facilities"],
  },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  // Filter experiences based on tab and search
  const getFilteredExperiences = () => {
    let filtered = experiences

    // Apply tab filter
    if (tabValue === 1) {
      filtered = experiences.filter((exp) => exp.category === "Adventure")
    } else if (tabValue === 2) {
      filtered = experiences.filter((exp) => exp.category === "Food")
    } else if (tabValue === 3) {
      filtered = experiences.filter((exp) => exp.category === "Cultural")
    } else if (tabValue === 4) {
      filtered = experiences.filter((exp) => exp.category === "Beach")
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          exp.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }

  const filteredExperiences = getFilteredExperiences()

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "50vh", md: "60vh" },
          display: "flex",
          alignItems: "center",
          bgcolor: "primary.dark",
          color: "white",
          mb: 6,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 0.7,
          }}
        >
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Explore Muslim-friendly experiences"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
            }}
          />
        </Box>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Explore Experiences
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              fontWeight: 400,
              maxWidth: "700px",
            }}
          >
            Discover Muslim-friendly tours, activities, and experiences around the world that respect your values and
            enhance your travel journey.
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: "700px",
              bgcolor: "white",
              borderRadius: 2,
              p: 1,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search experiences, activities, or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 4, whiteSpace: "nowrap", height: { sm: "56px" } }}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="experience categories"
          >
            <Tab icon={<TravelExplore />} label="All Experiences" />
            <Tab icon={<Hiking />} label="Adventure" />
            <Tab icon={<Restaurant />} label="Food" />
            <Tab icon={<Museum />} label="Cultural" />
            <Tab icon={<BeachAccess />} label="Beach" />
            <Tab icon={<Mosque />} label="Religious" />
            <Tab icon={<Hotel />} label="Stays" />
            <Tab icon={<Nature />} label="Nature" />
          </Tabs>
        </Box>

        {/* Featured Experience */}
        {tabValue === 0 && (
          <Box sx={{ mb: 6 }}>
            <Paper
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                height: { md: 400 },
              }}
            >
              <Box sx={{ position: "relative", width: { xs: "100%", md: "50%" }, height: { xs: 250, md: "auto" } }}>
                <Image
                  src="/placeholder.svg?height=800&width=800"
                  alt="Featured Muslim-friendly experience"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ p: { xs: 3, md: 5 }, width: { xs: "100%", md: "50%" } }}>
                <Chip label="Featured" color="secondary" sx={{ mb: 2 }} />
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                  Exclusive: Private Mosque Tour with Scholar
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rating value={5} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    (48 reviews)
                  </Typography>
                  <Chip
                    label="Istanbul, Turkey"
                    size="small"
                    sx={{ ml: 2, bgcolor: "primary.light", color: "white" }}
                  />
                </Box>
                <Typography variant="body1" paragraph>
                  Gain exclusive access to Istanbul's most beautiful mosques with a knowledgeable Islamic scholar who
                  will explain the historical and spiritual significance of each site. Includes prayer breaks and a
                  halal lunch at a local restaurant.
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
                  <Typography variant="h5" color="primary.main" fontWeight={600}>
                    $75 per person
                  </Typography>
                  <Button variant="contained" color="primary" size="large">
                    Book Now
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Experiences Grid */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="h2" fontWeight={600}>
              {tabValue === 0
                ? "Recommended Experiences"
                : `${["All Experiences", "Adventure", "Food", "Cultural", "Beach"][tabValue]} Experiences`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredExperiences.length} experiences found
            </Typography>
          </Box>

          {filteredExperiences.length > 0 ? (
            <Grid container spacing={3}>
              {filteredExperiences.map((experience) => (
                <Grid item key={experience.id} xs={12} sm={6} md={4}>
                  <Card className="destination-card" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <CardActionArea component={Link} href={`/explore/${experience.id}`}>
                      <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                        <Image
                          src={experience.image || PLACEHOLDER_IMAGE}
                          alt={experience.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            bgcolor: "primary.main",
                            color: "white",
                            py: 0.5,
                            px: 1.5,
                            borderRadius: 1,
                            fontWeight: 500,
                          }}
                        >
                          {experience.price}
                        </Box>
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ mb: 1 }}>
                          <Chip
                            label={experience.category}
                            size="small"
                            sx={{ bgcolor: "primary.light", color: "white", mb: 1 }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {experience.location}
                          </Typography>
                        </Box>
                        <Typography gutterBottom variant="h6" component="h3">
                          {experience.title}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Rating value={experience.rating} precision={0.5} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                            ({experience.reviewCount})
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {experience.description}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {experience.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
                          ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" gutterBottom>
                No experiences found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search or browse different categories
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 8 }} />

        {/* Popular Destinations Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom textAlign="center">
            Popular Destinations for Experiences
          </Typography>
          <Typography variant="body1" paragraph textAlign="center" sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
            Discover destinations known for their Muslim-friendly experiences and activities
          </Typography>

          <Grid container spacing={3}>
            {allDestinations.slice(0, 6).map((destination) => (
              <Grid key={destination.id} xs={12} sm={6} md={4} item>
                <Card
                  sx={{
                    position: "relative",
                    height: 200,
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <CardActionArea component={Link} href={`/destinations/${destination.slug}`}>
                    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image
                        src={destination.imageUrl || PLACEHOLDER_IMAGE}
                        alt={destination.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        p: 2,
                        color: "white",
                      }}
                    >
                      <Typography variant="h6" component="h3" fontWeight={600}>
                        {destination.name}
                      </Typography>
                      <Typography variant="body2">{destination.country}</Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
