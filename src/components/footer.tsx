import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import YouTubeIcon from "@mui/icons-material/YouTube"
import ExploreIcon from "@mui/icons-material/Explore"

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 6,
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <ExploreIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" color="primary.main" fontWeight={700}>
                The Halal Explorer
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your comprehensive guide to Muslim-friendly travel destinations around the world. Discover places with
              halal food, prayer facilities, and cultural insights.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Link href="#" color="inherit">
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit">
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit">
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <YouTubeIcon />
              </Link>
            </Stack>
          </Grid>

          <Grid xs={12} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Explore
            </Typography>
            <Stack>
              <Link href="/" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link href="/destinations" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Destinations
              </Link>
              <Link href="/search" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Search
              </Link>
              <Link href="/blog" color="text.secondary" underline="hover">
                Travel Blog
              </Link>
            </Stack>
          </Grid>

          <Grid xs={12} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Resources
            </Typography>
            <Stack>
              <Link href="/prayer-times" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Prayer Times
              </Link>
              <Link href="/halal-food-guide" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Halal Food Guide
              </Link>
              <Link href="/travel-tips" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Travel Tips
              </Link>
              <Link href="/faq" color="text.secondary" underline="hover">
                FAQ
              </Link>
            </Stack>
          </Grid>

          <Grid xs={12} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Company
            </Typography>
            <Stack>
              <Link href="/about" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link href="/contact" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Contact
              </Link>
              <Link href="/privacy" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="/terms" color="text.secondary" underline="hover">
                Terms of Service
              </Link>
            </Stack>
          </Grid>

          <Grid xs={12} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight={600}>
              Support
            </Typography>
            <Stack>
              <Link href="/help" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Help Center
              </Link>
              <Link href="/feedback" color="text.secondary" underline="hover" sx={{ mb: 1 }}>
                Feedback
              </Link>
              <Link href="/contribute" color="text.secondary" underline="hover">
                Contribute
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            {new Date().getFullYear()}
            {" The Halal Explorer. All rights reserved."}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
