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
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

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

  const handleStepChange = (step: number) => {
    setActiveStep(step)
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

        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={6000}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Card
                  sx={{
                    bgcolor: "white",
                    borderRadius: 4,
                    position: "relative",
                    maxWidth: "900px",
                    mx: "auto",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.05)",
                    overflow: "visible",
                  }}
                >
                  <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: -20,
                        left: { xs: "50%", md: 40 },
                        transform: { xs: "translateX(-50%)", md: "none" },
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        bgcolor: "#5e8b7e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 8px 20px rgba(94, 139, 126, 0.3)",
                      }}
                    >
                      <FormatQuoteIcon sx={{ color: "white", fontSize: 30 }} />
                    </Box>

                    <Box sx={{ mt: { xs: 4, md: 1 } }}>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{
                          fontSize: { xs: "1.1rem", md: "1.25rem" },
                          lineHeight: 1.6,
                          fontWeight: 400,
                          color: "text.primary",
                          mb: 4,
                          fontStyle: "italic",
                        }}
                      >
                        "{testimonial.text}"
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          sx={{ width: 60, height: 60, mr: 2, border: "2px solid #e2ded5" }}
                        />
                        <Box>
                          <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.location}
                          </Typography>
                          <Rating value={testimonial.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>

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
