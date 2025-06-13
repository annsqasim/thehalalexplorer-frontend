import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Chip from "@mui/material/Chip"
import Divider from "@mui/material/Divider"
import Rating from "@mui/material/Rating"
import Link from "next/link"
import Image from "next/image"
import RestaurantIcon from "@mui/icons-material/Restaurant"
import MosqueIcon from "@mui/icons-material/Mosque"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import LanguageIcon from "@mui/icons-material/Language"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import PrayerTimesSection from "@/components/prayer-times-section"
import HalalRestaurantsSection from "@/components/halal-restaurants-section"
import MosquesSection from "@/components/mosques-section"
import { notFound } from "next/navigation"

// Mock data - in a real app, this would come from Sanity
const destinations = {
  istanbul: {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    description:
      "Istanbul, formerly known as Constantinople, is a transcontinental city straddling the Bosphorus strait in Turkey. With its rich Islamic heritage, stunning Ottoman architecture, and vibrant culture, Istanbul offers an unforgettable experience for Muslim travelers. The city is home to numerous historic mosques, including the iconic Blue Mosque and Hagia Sophia.",
    image: "/placeholder.svg?height=500&width=1200",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "April to May, September to November",
    currency: "Turkish Lira (TRY)",
    language: "Turkish",
    timeZone: "GMT+3",
    localCustoms:
      "Turks are known for their hospitality. Remove shoes before entering mosques. Dress modestly when visiting religious sites. Tipping (bahşiş) is customary in restaurants and for services.",
    mustVisitPlaces: [
      "Blue Mosque (Sultan Ahmed Mosque)",
      "Hagia Sophia",
      "Topkapi Palace",
      "Grand Bazaar",
      "Suleymaniye Mosque",
      "Bosphorus Cruise",
      "Spice Bazaar",
    ],
    travelTips:
      "Istanbul has an excellent public transportation system including trams, metros, and ferries. Consider getting an Istanbul Card for easy travel. Many restaurants close during prayer times in more conservative areas.",
  },
  dubai: {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    description:
      "Dubai is a city of superlatives, known for its ultramodern architecture, luxury shopping, and vibrant nightlife. As part of the UAE, it offers an excellent environment for Muslim travelers with abundant halal food options, numerous mosques, and a culture rooted in Islamic traditions while embracing modernity and innovation.",
    image: "/placeholder.svg?height=500&width=1200",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "November to March",
    currency: "UAE Dirham (AED)",
    language: "Arabic (English widely spoken)",
    timeZone: "GMT+4",
    localCustoms:
      "Dress modestly in public places. Public displays of affection should be avoided. During Ramadan, eating, drinking, and smoking in public during daylight hours is prohibited for everyone.",
    mustVisitPlaces: [
      "Burj Khalifa",
      "Dubai Mall",
      "Jumeirah Mosque",
      "Palm Jumeirah",
      "Dubai Creek",
      "Dubai Museum",
      "Desert Safari",
    ],
    travelTips:
      "Taxis are abundant and relatively affordable. The Dubai Metro is clean, efficient, and has dedicated cars for women and children. Friday is the weekly holiday when many businesses operate with limited hours.",
  },
  "kuala-lumpur": {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    description:
      "Kuala Lumpur, the capital of Malaysia, is a bustling metropolis that perfectly blends modern architecture with rich cultural heritage. As the capital of a Muslim-majority country, it offers excellent facilities for Muslim travelers including abundant halal food options, beautiful mosques, and a culture that respects Islamic traditions.",
    image: "/placeholder.svg?height=500&width=1200",
    halalFoodRating: 5,
    prayerFacilities: 5,
    bestTimeToVisit: "May to July",
    currency: "Malaysian Ringgit (MYR)",
    language: "Malay (English widely spoken)",
    timeZone: "GMT+8",
    localCustoms:
      "Remove shoes before entering homes and places of worship. Dress modestly, especially when visiting religious sites. Use your right hand for eating and giving/receiving items.",
    mustVisitPlaces: [
      "Petronas Twin Towers",
      "National Mosque (Masjid Negara)",
      "Batu Caves",
      "Islamic Arts Museum",
      "Merdeka Square",
      "Central Market",
      "Jalan Alor (for food)",
    ],
    travelTips:
      "Public transportation is efficient and affordable. The LRT, MRT, and monorail systems connect most tourist attractions. Grab (similar to Uber) is widely used and often cheaper than taxis.",
  },
}

interface PageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: PageProps) {
  const destination = destinations[params.slug as keyof typeof destinations]

  if (!destination) {
    return {
      title: "Destination Not Found | The Halal Explorer",
      description: "The requested destination could not be found.",
    }
  }

  return {
    title: `${destination.name}, ${destination.country} | The Halal Explorer`,
    description: `Explore ${destination.name} with our Muslim-friendly travel guide. Find halal food, mosques, prayer times, and local customs in ${destination.name}, ${destination.country}.`,
  }
}

export default function DestinationPage({ params }: PageProps) {
  const destination = destinations[params.slug as keyof typeof destinations];
  
  if (!destination) {
    notFound();
  }
  
  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '300px', md: '500px' },
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={`${destination.name}, ${destination.country}`}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <Container 
          maxWidth="lg"
          sx={{ 
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            pb: 6,
            zIndex: 2,
          }}
        >
          <Chip 
            label={destination.country} 
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              fontWeight: 500,
              mb: 2,
            }} 
          />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'white',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {destination.name}
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/destinations" style={{ color: 'inherit', textDecoration: 'none' }}>
            Destinations
          </Link>
          <Typography color="text.primary">{destination.name}</Typography>
        </Breadcrumbs>
        
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
              About {destination.name}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {destination.description}
            </Typography>
            
            <Box sx={{ my: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Local Customs & Etiquette
              </Typography>
              <Typography variant="body1" paragraph>
                {destination.localCustoms}
              </Typography>
            </Box>
            
            <Box sx={{ my: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Must-Visit Places
              </Typography>
              <ul>
                {destination.mustVisitPlaces.map((place, index) => (
                  <Typography component="li" variant="body1" key={index} sx={{ mb: 1 }}>
                    {place}
                  </Typography>
                ))}
              </ul>
            </Box>
            
            <Box sx={{ my: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Travel Tips
              </Typography>
              <Typography variant="body1" paragraph>
                {destination.travelTips}
              </Typography>
            </Box>
            
            <Divider sx={{ my: 6 }} />
            
            {/* Prayer Times Section */}
            <PrayerTimesSection city={destination.name} country={destination.country} />
            
            <Divider sx={{ my: 6 }} />
            
            {/* Halal Restaurants Section */}
            <HalalRestaurantsSection city={destination.name} />
            
            <Divider sx={{ my: 6 }} />
            
            {/* Mosques Section */}
            <MosquesSection city={destination.name} />
          </Grid>
          
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Destination Overview
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RestaurantIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Halal Food Availability
                  </Typography>
                  <Rating value={destination.halalFoodRating} readOnly size="small" />
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MosqueIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Prayer Facilities
                  </Typography>
                  <Rating value={destination.prayerFacilities} readOnly size="small" />
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <WbSunnyIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Best Time to Visit
                  </Typography>
                  <Typography variant="body1">
                    {destination.bestTimeToVisit}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <AttachMoneyIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Currency
                  </Typography>
                  <Typography variant="body1">
                    {destination.currency}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <LanguageIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Language
                  </Typography>
                  <Typography variant="body1">
                    {destination.language}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <AccessTimeIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Time Zone
                  </Typography>
                  <Typography variant="body1">
                    {destination.timeZone}
                  </Typography>
                </Box>
              </Box>
            </Paper>
            
            {/* Weather Widget Placeholder */}
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Current Weather
              </Typography>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Weather data would be fetched from an API in a real application
                </Typography>
              </Box>
            </Paper>

            {/* Related Destinations */}
            <Paper elevation={0} sx={{ p: 3, border:
\
