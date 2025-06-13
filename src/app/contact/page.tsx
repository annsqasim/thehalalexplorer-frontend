"use client"
import { useState } from "react"
import type React from "react"

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material"
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.message || !formData.inquiryType) {
      setError(true)
      return
    }

    // In a real application, you would send the form data to your backend
    console.log("Form submitted:", formData)

    // Show success message
    setSubmitted(true)

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      inquiryType: "",
    })
  }

  const handleCloseSnackbar = () => {
    setSubmitted(false)
    setError(false)
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
            alt="Contact The Halal Explorer"
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
            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "600px",
            }}
          >
            Have questions or feedback? We'd love to hear from you. Get in touch with our team.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
              Get In Touch
            </Typography>
            <Typography variant="body1" paragraph>
              We're here to help with any questions about Muslim-friendly travel, our website, or potential
              partnerships. Fill out the form or use our contact information below.
            </Typography>

            <List sx={{ mt: 4 }}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary="info@thehalalexplorer.com" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Phone" secondary="+1 (555) 123-4567" />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Address" secondary="123 Travel Street, Suite 456, New York, NY 10001, USA" />
              </ListItem>
            </List>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                  <Box
                    key={social}
                    component="a"
                    href={`https://${social}.com/thehalalexplorer`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "primary.dark",
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    <Image src={`/placeholder.svg?height=24&width=24`} alt={social} width={24} height={24} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      select
                      label="Inquiry Type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <MenuItem value="general">General Inquiry</MenuItem>
                      <MenuItem value="support">Customer Support</MenuItem>
                      <MenuItem value="feedback">Feedback</MenuItem>
                      <MenuItem value="partnership">Partnership Opportunity</MenuItem>
                      <MenuItem value="media">Media Inquiry</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" size="large" endIcon={<SendIcon />}>
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom textAlign="center">
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              {
                question: "How do you verify halal food information?",
                answer:
                  "We verify halal food information through a combination of official certifications, owner confirmations, and community reviews. We prioritize restaurants with official halal certification but also include Muslim-owned establishments and those with halal menu options.",
              },
              {
                question: "Can I contribute to The Halal Explorer?",
                answer:
                  "Yes! We welcome contributions from our community. You can submit reviews, photos, and information about destinations you've visited. Contact us through the form above to learn more about becoming a contributor.",
              },
              {
                question: "Do you offer travel planning services?",
                answer:
                  "Currently, we focus on providing information rather than direct travel planning services. However, our detailed guides and resources are designed to help you plan your own Muslim-friendly trips with confidence.",
              },
              {
                question: "How often is the information updated?",
                answer:
                  "We strive to keep our information as up-to-date as possible. Our team regularly reviews and updates destination information, and we also rely on community feedback to alert us to any changes.",
              },
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {faq.question}
                  </Typography>
                  <Typography variant="body2">{faq.answer}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Success/Error Snackbar */}
      <Snackbar open={submitted} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          Please fill in all required fields.
        </Alert>
      </Snackbar>
    </Box>
  )
}
