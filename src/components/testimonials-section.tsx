"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"
import Rating from "@mui/material/Rating"
import { useTheme } from "@mui/material/styles"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    location: "London, UK",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The Halal Explorer made our family trip to Istanbul so much easier. We found amazing halal restaurants and never missed a prayer thanks to the mosque locator feature.",
  },
  {
    id: 2,
    name: "Fatima Khan",
    location: "Toronto, Canada",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I travel frequently for business and this website has been a game-changer. The prayer time notifications and qibla direction feature are incredibly helpful when I'm in unfamiliar cities.",
  },
  {
    id: 3,
    name: "Omar Abdullah",
    location: "Sydney, Australia",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4,
    text: "As a solo traveler, finding Muslim-friendly accommodations was always challenging until I discovered The Halal Explorer. Now I can focus on enjoying my trips without worrying about the basics.",
  },
]

export default function TestimonialsSection() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = testimonials.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps)
  }

  return (
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, mb: { xs: 6, md: 8 }, fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            What Our Travelers Say
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              sx={{
                maxWidth: 400,
                flexGrow: 1,
                bgcolor: "transparent",
                "& .MuiMobileStepper-dot": {
                  width: 10,
                  height: 10,
                  margin: "0 4px",
                  bgcolor: "rgba(94, 139, 126, 0.3)",
                },
                "& .MuiMobileStepper-dotActive": {
                  bgcolor: "#5e8b7e",
                },
              }}
              nextButton={
                <Button size="small" onClick={handleNext} sx={{ color: "#5e8b7e" }}>
                  Next
                  {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} sx={{ color: "#5e8b7e" }}>
                  {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </Box>
        </Container>
      </Box>
  )
}
