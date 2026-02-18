"use client";

import React, { useState } from "react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a custom theme
const customShadows: Shadows = Array(25).fill("none") as unknown as Shadows;

const theme = createTheme({
  palette: {
    primary: { main: "#10B981", light: "#34d399", dark: "#059669", contrastText: "#ffffff" },
    secondary: { main: "#0F172A", light: "#334155", dark: "#020617", contrastText: "#ffffff" },
    background: { default: "#F8FAFC", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#64748b" },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h2: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
    h3: { fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  shadows: customShadows,
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
