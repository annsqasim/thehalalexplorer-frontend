"use client"

import type React from "react"

import { useState } from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import EmailIcon from "@mui/icons-material/Email"
import SendIcon from "@mui/icons-material/Send"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter your email address")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      setOpenSnackbar(true)
    }, 1000)
  }

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "rgba(226, 222, 213, 0.3)" }}>
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: "white",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.04)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              bgcolor: "rgba(94, 139, 126, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <EmailIcon sx={{ fontSize: 40, color: "#5e8b7e" }} />
          </Box>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, fontSize: { xs: "1.75rem", md: "2.25rem" } }}
          >
            Stay Updated with Travel Insights
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: "600px", mx: "auto", color: "text.secondary" }}>
            Subscribe to our newsletter for the latest Muslim-friendly travel tips, destination guides, and exclusive
            offers.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: "500px",
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              label="Your Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ flexGrow: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              endIcon={<SendIcon />}
              sx={{
                px: 4,
                height: { sm: "56px" },
                whiteSpace: "nowrap",
                alignSelf: { xs: "stretch", sm: "auto" },
              }}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
          Thank you for subscribing to our newsletter!
        </Alert>
      </Snackbar>
    </Box>
  )
}
