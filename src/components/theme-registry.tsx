"use client"

import type React from "react"

import createCache from "@emotion/cache"
import { useServerInsertedHTML } from "next/navigation"
import { CacheProvider } from "@emotion/react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useState } from "react"

// Create a custom theme with a modern, clean design
const theme = createTheme({
  palette: {
    primary: {
      main: "#5e8b7e", // Medium green
      light: "#a9b78a", // Light sage green
      dark: "#3a5a40", // Dark green
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a9b78a", // Light sage green
      light: "#e2ded5", // Light beige/cream
      dark: "#5e8b7e", // Medium green
      contrastText: "#2c3c2c",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3c2c", // Very dark green
      secondary: "#5e8b7e", // Medium green
    },
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.015em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.005em",
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: 0,
    },
    body1: {
      lineHeight: 1.7,
      letterSpacing: 0,
    },
    body2: {
      lineHeight: 1.6,
      letterSpacing: 0,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: "smooth",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow: "none",
          textTransform: "none",
          fontSize: "0.95rem",
          fontWeight: 500,
          transition: "all 0.2s ease",
        },
        containedPrimary: {
          backgroundColor: "#5e8b7e",
          "&:hover": {
            backgroundColor: "#3a5a40",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(94, 139, 126, 0.15)",
          },
        },
        outlinedPrimary: {
          borderColor: "#5e8b7e",
          borderWidth: 1.5,
          color: "#5e8b7e",
          "&:hover": {
            backgroundColor: "rgba(94, 139, 126, 0.04)",
            borderColor: "#5e8b7e",
            borderWidth: 1.5,
          },
        },
        textPrimary: {
          color: "#5e8b7e",
          "&:hover": {
            backgroundColor: "rgba(94, 139, 126, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.75rem",
        },
        colorPrimary: {
          backgroundColor: "rgba(94, 139, 126, 0.1)",
          color: "#5e8b7e",
        },
        colorSecondary: {
          backgroundColor: "rgba(169, 183, 138, 0.15)",
          color: "#3a5a40",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          "&.MuiMenu-paper": {
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          },
        },
        elevation1: {
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(94, 139, 126, 0.4)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5e8b7e",
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          "@media (min-width: 600px)": {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: "0.75em",
        },
      },
    },
  },
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ""
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
