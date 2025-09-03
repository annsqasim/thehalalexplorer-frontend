"use client"

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import ExploreIcon from "@mui/icons-material/Explore"
import SearchIcon from "@mui/icons-material/Search"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const pages = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Explore", path: "/explore" },
  { name: "Travel Tips", path: "/travel-tips" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: { xs: 1.5, md: 1 }, px: { xs: 1, md: 2 } }}>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <ExploreIcon sx={{ fontSize: 28, color: "#5e8b7e", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                color: "#2c3c2c",
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              The Halal Explorer
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#2c3c2c" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: 3,
                  mt: 1.5,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  minWidth: 200,
                  overflow: "hidden",
                },
              }}
              disableScrollLock
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.path}
                  selected={pathname === page.path}
                  sx={{
                    py: 1.5,
                    px: 2.5,
                    "&.Mui-selected": {
                      bgcolor: "rgba(94, 139, 126, 0.08)",
                    },
                    "&:hover": {
                      bgcolor: "rgba(94, 139, 126, 0.04)",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: pathname === page.path ? 600 : 400,
                      color: pathname === page.path ? "#5e8b7e" : "#2c3c2c",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems: "center", justifyContent: "center" }}
          >
            <ExploreIcon sx={{ fontSize: 24, color: "#5e8b7e", mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                color: "#2c3c2c",
                textDecoration: "none",
                fontSize: "1.1rem",
                letterSpacing: "-0.01em",
              }}
            >
              The Halal Explorer
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              ml: 4,
            }}
          >
            {pages.map((page) => {
              const isActive = pathname === page.path

              return (
                <Button
                  key={page.name}
                  component={Link}
                  href={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0.5,
                    px: 2,
                    py: 1,
                    color: isActive ? "#5e8b7e" : "#2c3c2c",
                    fontWeight: isActive ? 600 : 400,
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#5e8b7e",
                    },
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 8,
                          left: "50%",
                          width: "20px",
                          height: "2px",
                          bgcolor: "#5e8b7e",
                          borderRadius: "2px",
                          transform: "translateX(-50%)",
                        }
                      : {},
                  }}
                >
                  {page.name}
                </Button>
              )
            })}
          </Box>

          {/* Search Button */}
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/search"
              startIcon={<SearchIcon />}
              sx={{
                display: { xs: "none", md: "flex" },
                borderRadius: "12px",
                py: 1,
                px: 2.5,
                boxShadow: "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(94, 139, 126, 0.15)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
