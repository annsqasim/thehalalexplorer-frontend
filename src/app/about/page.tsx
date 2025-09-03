"use client"
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { CheckCircleOutline, ExploreOutlined } from "@mui/icons-material"
import Image from "next/image"
import AboutBg from '../images/about_bg.png'
import AboutSection from '../images/about-section.jpg'
import CoreValues from '../images/core_values.jpg'

export default function AboutPage() {
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
            src={AboutBg}
            alt="About The Halal Explorer"
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
            About Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "600px",
            }}
          >
            Discover the story behind The Halal Explorer and our mission to make travel easier for Muslims worldwide.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          <Grid xs={12} md={6} component="div">
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              The Halal Explorer was founded in 2023 with a simple mission: to make travel easier and more enjoyable for
              Muslims around the world. We recognized that Muslim travelers have unique needs that aren't always
              addressed by mainstream travel resources.
            </Typography>
            <Typography variant="body1" paragraph>
              Our team of passionate travelers and tech enthusiasts came together to create a comprehensive platform
              that provides detailed information on halal food options, prayer facilities, Muslim-friendly
              accommodations, and cultural insights for destinations worldwide.
            </Typography>
            <Typography variant="body1">
              What started as a small project has grown into a trusted resource for thousands of Muslim travelers
              seeking authentic experiences without compromising their faith and values.
            </Typography>
          </Grid>
          <Grid xs={12} md={6} component="div">
            <Box sx={{ position: "relative", height: "100%", minHeight: 300 }}>
              <Image
                src={AboutSection}
                alt="The Halal Explorer team"
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
            We're on a mission to empower Muslim travelers with the information and resources they need to explore the
            world confidently, while maintaining their Islamic values and practices.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid xs={12} md={4} component="div">
            <Paper sx={{ p: 4, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>1</Avatar>
                <Typography variant="h6" fontWeight={600}>
                  Comprehensive Information
                </Typography>
              </Box>
              <Typography variant="body2">
                Provide detailed, accurate, and up-to-date information about Muslim-friendly travel options worldwide,
                including halal food, prayer spaces, and accommodations.
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={4} component="div">
            <Paper sx={{ p: 4, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>2</Avatar>
                <Typography variant="h6" fontWeight={600}>
                  Community Building
                </Typography>
              </Box>
              <Typography variant="body2">
                Foster a global community of Muslim travelers who can share experiences, tips, and recommendations to
                help each other navigate the world.
              </Typography>
            </Paper>
          </Grid>
          <Grid xs={12} md={4} component="div">
            <Paper sx={{ p: 4, height: "100%" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>3</Avatar>
                <Typography variant="h6" fontWeight={600}>
                  Cultural Bridge
                </Typography>
              </Box>
              <Typography variant="body2">
                Promote cultural understanding and highlight the diversity of Muslim travelers and communities around
                the world.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        <Grid container spacing={6} alignItems="center">
          <Grid xs={12} md={6} component="div">
            <Box sx={{ position: "relative", height: 400 }}>
              <Image
                src={CoreValues}
                alt="Our values"
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6} component="div">
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
              Our Values
            </Typography>
            <List>
              <ListItem disableGutters>
                <ListItemIcon>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Authenticity"
                  secondary="We provide honest, verified information that Muslim travelers can trust."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Inclusivity"
                  secondary="We welcome and respect Muslims of all backgrounds, cultures, and practices."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Excellence"
                  secondary="We strive for excellence in all aspects of our platform and services."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Innovation"
                  secondary="We continuously improve our platform to better serve the needs of Muslim travelers."
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <CheckCircleOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Community"
                  secondary="We believe in the power of community and shared experiences."
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
            Meet Our Team
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
            The Halal Explorer is powered by a diverse team of Muslim travelers, tech enthusiasts, and industry experts
            who are passionate about making travel accessible for all Muslims.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((member) => (
            <Grid key={member} size={{ xs: 12, md: 6, sm: 3 }}>
              <Card sx={{ height: "100%" }}>
                <Box sx={{ position: "relative", height: 250 }}>
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt={`Team member ${member}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Team Member {member}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {["Founder & CEO", "Travel Expert", "Tech Lead", "Content Manager"][member - 1]}
                  </Typography>
                  <Typography variant="body2">
                    Passionate about travel and technology with experience in the travel industry and a deep
                    understanding of Muslim travelers' needs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}

        <Divider sx={{ my: 8 }} />

        <Box sx={{ textAlign: "center" }}>
          <ExploreOutlined sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
            Join Us on This Journey
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}>
            The Halal Explorer is more than just a travel website—it's a community of like-minded travelers who share a
            passion for exploring the world while staying true to their faith. We invite you to join us on this journey
            of discovery, connection, and growth.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
