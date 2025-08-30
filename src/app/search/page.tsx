"use client"
import { useState } from "react"
import type React from "react"

import { useSearchParams } from "next/navigation"
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
  Stack,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  Divider,
  Rating,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Button,
  Paper,
} from "@mui/material"
import { Search as SearchIcon, FilterList as FilterListIcon } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import { allDestinations, regions } from "@/lib/mock-data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialRegion = searchParams.get("region") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedRegion, setSelectedRegion] = useState(initialRegion)
  const [currentPage, setCurrentPage] = useState(1)
  const [priceRange, setPriceRange] = useState<number[]>([0, 5])
  const [filters, setFilters] = useState({
    halalFood: false,
    prayerFacilities: false,
    familyFriendly: false,
    muslimFriendlyHotels: false,
  })

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    })
  }

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Filter destinations based on search and filters
  const filteredDestinations = allDestinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesRegion = selectedRegion ? destination.region === selectedRegion : true

    // Apply additional filters
    const matchesFilters =
      (!filters.halalFood || destination.features.includes("Halal Food")) &&
      (!filters.prayerFacilities || destination.features.includes("Prayer Facilities")) &&
      (!filters.familyFriendly || destination.features.includes("Family Friendly")) &&
      (!filters.muslimFriendlyHotels || destination.features.includes("Muslim-Friendly Hotels"))

    // Apply price range filter
    const matchesPriceRange = destination.priceLevel >= priceRange[0] && destination.priceLevel <= priceRange[1]

    return matchesSearch && matchesRegion && matchesFilters && matchesPriceRange
  })

  // Pagination
  const destinationsPerPage = 9
  const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage)
  const displayedDestinations = filteredDestinations.slice(
    (currentPage - 1) * destinationsPerPage,
    currentPage * destinationsPerPage,
  )

  return (
    <Box>
      {/* Search Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            Search Results
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "600px",
              mb: 4,
            }}
          >
            Find your perfect Muslim-friendly destination
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  placeholder="Search destinations, attractions, or experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <FormControl fullWidth>
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    value={selectedRegion}
                    label="Region"
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <MenuItem value="">All Regions</MenuItem>
                    {regions.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 2 }}>
                <Button variant="contained" color="primary" fullWidth size="large">
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ position: "sticky", top: "100px" }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <FilterListIcon sx={{ mr: 1 }} /> Filters
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Features
              </Typography>
              <FormGroup sx={{ mb: 3 }}>
                <FormControlLabel
                  control={<Checkbox checked={filters.halalFood} onChange={handleFilterChange} name="halalFood" />}
                  label="Halal Food Available"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.prayerFacilities}
                      onChange={handleFilterChange}
                      name="prayerFacilities"
                    />
                  }
                  label="Prayer Facilities"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={filters.familyFriendly} onChange={handleFilterChange} name="familyFriendly" />
                  }
                  label="Family Friendly"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.muslimFriendlyHotels}
                      onChange={handleFilterChange}
                      name="muslimFriendlyHotels"
                    />
                  }
                  label="Muslim-Friendly Hotels"
                />
              </FormGroup>

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Price Level
              </Typography>
              <Box sx={{ px: 1, mb: 4 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                  step={1}
                  marks={[
                    { value: 0, label: "$" },
                    { value: 5, label: "$$$$$" },
                  ]}
                />
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setSearchQuery(initialQuery)
                  setSelectedRegion(initialRegion)
                  setPriceRange([0, 5])
                  setFilters({
                    halalFood: false,
                    prayerFacilities: false,
                    familyFriendly: false,
                    muslimFriendlyHotels: false,
                  })
                }}
              >
                Reset Filters
              </Button>
            </Box>
          </Grid>

          {/* Search Results */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1">{filteredDestinations.length} destinations found</Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select labelId="sort-select-label" value="relevance" label="Sort By" size="small">
                  <MenuItem value="relevance">Relevance</MenuItem>
                  <MenuItem value="rating">Rating (High to Low)</MenuItem>
                  <MenuItem value="price-low">Price (Low to High)</MenuItem>
                  <MenuItem value="price-high">Price (High to Low)</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {displayedDestinations.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {displayedDestinations.map((destination) => (
                    <Grid key={destination.id} size={{ xs: 12, md: 6, sm: 6, lg: 4 }}>
                      <Card
                        className="destination-card"
                        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                      >
                        <CardActionArea component={Link} href={`/destinations/${destination.slug}`}>
                          <CardMedia component="div" sx={{ height: 200, position: "relative" }}>
                            <Image
                              src={destination.imageUrl || "/placeholder.svg"}
                              alt={destination.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                p: 1,
                              }}
                            >
                              <Typography variant="subtitle1" component="div">
                                {destination.name}
                              </Typography>
                              <Typography variant="body2" component="div">
                                {destination.country}
                              </Typography>
                            </Box>
                          </CardMedia>
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ mb: 2 }}>
                              <Rating value={destination.rating} precision={0.5} size="small" readOnly />
                              <Typography variant="body2" color="text.secondary">
                                {destination.reviewCount} reviews
                              </Typography>
                            </Box>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                              {destination.tags.slice(0, 3).map((tag) => (
                                <Chip key={tag} label={tag} size="small" sx={{ mb: 0.5 }} />
                              ))}
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                              {destination.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography variant="h6" gutterBottom>
                  No destinations found
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Try adjusting your filters or search query
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedRegion("")
                    setPriceRange([0, 5])
                    setFilters({
                      halalFood: false,
                      prayerFacilities: false,
                      familyFriendly: false,
                      muslimFriendlyHotels: false,
                    })
                  }}
                >
                  Clear All Filters
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
