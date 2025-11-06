import { Box, Container, Typography, Button, Paper } from "@mui/material"
import Link from "next/link"
import HomeIcon from "@mui/icons-material/Home"
import ExploreIcon from "@mui/icons-material/Explore"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found | The Halal Explorer",
  description: "The page you're looking for doesn't exist or has been moved.",
}

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            border: "1px solid rgba(0,0,0,0.10)",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "4rem", md: "6rem" },
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              component={Link}
              href="/"
              variant="contained"
              color="primary"
              startIcon={<HomeIcon />}
              sx={{ borderRadius: 2 }}
            >
              Go Home
            </Button>
            <Button
              component={Link}
              href="/destinations"
              variant="outlined"
              color="primary"
              startIcon={<ExploreIcon />}
              sx={{ borderRadius: 2 }}
            >
              Browse Destinations
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

