"use client"
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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
} from "@mui/material"
import {
  FlightTakeoff,
  Restaurant,
  Mosque,
  Luggage,
  Language,
  CheckCircleOutline,
  FamilyRestroom,
  AttachMoney,
  HealthAndSafety,
} from "@mui/icons-material"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/types"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`travel-tips-tabpanel-${index}`}
      aria-labelledby={`travel-tips-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

// Mock travel tips articles
const travelTips = [
  {
    id: 1,
    title: "Finding Halal Food While Traveling",
    category: "Food",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Discover strategies for finding authentic halal food options in any destination, from apps to local recommendations.",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Prayer Times and Qibla Direction on the Go",
    category: "Prayer",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Learn about the best apps and tools to help you maintain your prayer schedule and find the qibla direction while traveling.",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Packing Essentials for Muslim Travelers",
    category: "Packing",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "A comprehensive packing list for Muslim travelers, including modest clothing options and travel prayer mats.",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Navigating Ramadan While Traveling",
    category: "Ramadan",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Tips for maintaining your fast and finding iftar meals while exploring new destinations during Ramadan.",
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Muslim-Friendly Beach Destinations",
    category: "Destinations",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Discover beautiful beach destinations with private beaches, modest swimwear options, and halal dining.",
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "Traveling with Family: Muslim Parent Guide",
    category: "Family",
    image: "/placeholder.svg?height=300&width=500",
    excerpt:
      "Practical advice for Muslim parents traveling with children, including activities and accommodation tips.",
    readTime: "9 min read",
  },
]

export default function TravelTipsClient({ blogs }: { blogs: Blog[] }) {
    const [tabValue, setTabValue] = useState(0)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue)
    }
  
    return (
      <Box>
        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "30vh", md: "40vh" },
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
              opacity: 0.6,
            }}
          >
            <Image
              src="/placeholder.svg?height=600&width=1920"
              alt="Muslim-friendly travel tips"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Box>
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Travel Tips
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: "600px",
              }}
            >
              Expert advice and practical guidance for Muslim travelers exploring the world while maintaining their faith
              and values.
            </Typography>
          </Container>
        </Box>
  
        <Container maxWidth="lg">
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="travel tips categories"
            >
              <Tab icon={<FlightTakeoff />} label="All Tips" />
              <Tab icon={<Restaurant />} label="Food" />
              <Tab icon={<Mosque />} label="Prayer" />
              <Tab icon={<Luggage />} label="Packing" />
              <Tab icon={<FamilyRestroom />} label="Family" />
              <Tab icon={<Language />} label="Culture" />
              <Tab icon={<AttachMoney />} label="Budget" />
              <Tab icon={<HealthAndSafety />} label="Safety" />
            </Tabs>
          </Box>
  
          {/* Featured Tip */}
          <Box sx={{ mb: 6 }}>
            <Paper
              sx={{
                position: "relative",
                height: { xs: 300, md: 400 },
                borderRadius: 4,
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-end",
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
                }}
              >
                <Image
                  src="/placeholder.svg?height=800&width=1600"
                  alt="Essential Muslim Travel Tips"
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
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))",
                  }}
                />
              </Box>
              <Box sx={{ position: "relative", zIndex: 1, p: { xs: 3, md: 5 }, width: "100%" }}>
                <Chip label="Featured" color="secondary" sx={{ mb: 2 }} />
                <Typography variant="h3" component="h2" sx={{ color: "white", fontWeight: 700, mb: 2 }}>
                  Essential Muslim Travel Tips for 2023
                </Typography>
                <Typography variant="body1" sx={{ color: "white", mb: 3, maxWidth: "800px" }}>
                  Our comprehensive guide to navigating the world as a Muslim traveler, with updated information for 2023
                  including post-pandemic considerations and new Muslim-friendly destinations.
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                  <Typography variant="body2" sx={{ mr: 3 }}>
                    12 min read
                  </Typography>
                  <Typography variant="body2">Updated: May 10, 2023</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
  
          {/* Tab Panels */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              {travelTips.map((tip) => (
                <Grid key={tip.id} xs={12} md={4} sm={6} padding={1}>
                  <Card
                    className="destination-card"
                    sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                  >
                    <CardActionArea component={Link} href={`/travel-tips/${tip.id}`}>
                      <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                        <Image src={tip.image || "/placeholder.svg"} alt={tip.title} fill style={{ objectFit: "cover" }} />
                      </CardMedia>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Chip label={tip.category} size="small" color="primary" sx={{ mb: 1 }} />
                        <Typography gutterBottom variant="h6" component="h3">
                          {tip.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {tip.excerpt}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {tip.readTime}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
  
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
              Halal Food Travel Tips
            </Typography>
            <Typography variant="body1" paragraph>
              Finding halal food while traveling can be one of the biggest challenges for Muslim travelers. Here are some
              tips to help you navigate dining options around the world.
            </Typography>
  
            <Grid container spacing={4}>
              <Grid xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Research Before You Go
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Use Halal Food Apps"
                        secondary="Download apps like HalalTrip, Zabihah, or HappyCow to find verified halal restaurants at your destination."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Join Muslim Travel Groups"
                        secondary="Facebook groups and forums often have recommendations from fellow travelers who have visited your destination."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Check Certification Bodies"
                        secondary="Research the halal certification bodies in your destination country to understand what to look for on restaurant signage."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    When Halal Options Are Limited
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Vegetarian and Seafood Options"
                        secondary="When certified halal restaurants aren't available, vegetarian and seafood dishes are generally safe alternatives."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Self-Catering Accommodations"
                        secondary="Consider booking accommodations with kitchen facilities so you can prepare your own meals."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Pack Emergency Snacks"
                        secondary="Always carry non-perishable halal snacks like nuts, dried fruits, and energy bars for times when halal food is unavailable."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
  
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Related Food Articles
              </Typography>
              <Grid container spacing={3}>
                {travelTips
                  .filter((tip) => tip.category === "Food")
                  .map((tip) => (
                    <Grid key={tip.id} xs={12} md={6} sm={6}>
                      <Card
                        className="destination-card"
                        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                      >
                        <CardActionArea component={Link} href={`/travel-tips/${tip.id}`}>
                          <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                            <Image
                              src={tip.image || "/placeholder.svg"}
                              alt={tip.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </CardMedia>
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h6" component="h3">
                              {tip.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {tip.excerpt}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {tip.readTime}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </TabPanel>
  
          {/* Other tab panels would be implemented similarly */}
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
              Prayer Tips for Muslim Travelers
            </Typography>
            <Typography variant="body1" paragraph>
              Maintaining your prayer schedule while traveling across different time zones can be challenging. Here are some helpful tips.
            </Typography>
            
            <Grid container spacing={4}>
              <Grid xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Prayer Apps & Tools
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Prayer Time Apps"
                        secondary="Use apps like Muslim Pro, Athan, or IslamicFinder to get accurate prayer times for your current location."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Qibla Finder"
                        secondary="Most prayer apps include a qibla compass, or you can download a dedicated qibla finder app."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Portable Prayer Mat"
                        secondary="Invest in a compact, travel-friendly prayer mat that can easily fit in your bag."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
              <Grid xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Finding Prayer Spaces
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Airport Prayer Rooms"
                        secondary="Many international airports have dedicated prayer rooms or multi-faith spaces."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Hotel Room Prayer"
                        secondary="Your hotel room is usually a convenient place to pray. Just ensure you know the qibla direction."
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Quiet Public Spaces"
                        secondary="Parks, quiet corners of shopping malls, or even fitting rooms can serve as prayer spaces when necessary."
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </TabPanel>
  
          <Divider sx={{ my: 8 }} />
  
          {/* Quick Tips Section */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom textAlign="center">
              Quick Travel Tips
            </Typography>
            <Typography variant="body1" paragraph textAlign="center" sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
              Essential advice for Muslim travelers to make your journey smoother and more enjoyable.
            </Typography>
  
            <Grid container spacing={3}>
              {[
                {
                  title: "Research Local Customs",
                  description:
                    "Understand the local customs and dress codes of your destination, especially regarding modest dress.",
                  icon: <Language color="primary" sx={{ fontSize: 40 }} />,
                },
                {
                  title: "Pack Modestly",
                  description:
                    "Pack lightweight, modest clothing that's appropriate for different activities and weather conditions.",
                  icon: <Luggage color="primary" sx={{ fontSize: 40 }} />,
                },
                {
                  title: "Download Essential Apps",
                  description:
                    "Prayer times, qibla finder, halal food locator, and translation apps are must-haves for Muslim travelers.",
                  icon: <Mosque color="primary" sx={{ fontSize: 40 }} />,
                },
                {
                  title: "Carry Travel Documents",
                  description:
                    "Keep copies of important documents like passports, visas, and travel insurance in both digital and physical formats.",
                  icon: <HealthAndSafety color="primary" sx={{ fontSize: 40 }} />,
                },
                {
                  title: "Budget for Halal Options",
                  description:
                    "Halal restaurants might be more expensive in some destinations, so budget accordingly.",
                  icon: <AttachMoney color="primary" sx={{ fontSize: 40 }} />,
                },
                {
                  title: "Connect with Local Muslims",
                  description:
                    "Reach out to local Muslim communities for insider tips on halal food, prayer spaces, and attractions.",
                  icon: <FamilyRestroom color="primary" sx={{ fontSize: 40 }} />,
                },
              ].map((tip, index) => (
                <Grid key={index} xs={12} md={4} sm={6}>
                  <Paper sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{tip.icon}</Box>
                    <Typography variant="h6" component="h3" gutterBottom textAlign="center">
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      {tip.description}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    )
}
