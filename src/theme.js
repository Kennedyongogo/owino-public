import { createTheme } from "@mui/material/styles";

const BRAND_GOLD = "#f5c518";

const focusVisibleSx = {
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
  "&.Mui-focusVisible": {
    outline: `2px solid ${BRAND_GOLD}`,
    outlineOffset: 2,
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a5fb4",
      light: "#4a8fd4",
      dark: "#134a8c",
    },
    secondary: {
      main: "#f5c518",
      light: "#ffe066",
      dark: "#c9a012",
    },
    info: {
      main: "#2491cf",
      light: "#4fa7d9",
      dark: "#1b73a5",
    },
    background: {
      default: "#ffffff",
      paper: "#f9f9f9",
      dark: "#090909",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#555555",
    },
    success: {
      main: "#2e7d32",
      light: "#4caf50",
      dark: "#1b5e20",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: focusVisibleSx,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: focusVisibleSx,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: focusVisibleSx,
      },
    },
    MuiFab: {
      styleOverrides: {
        root: focusVisibleSx,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: focusVisibleSx,
      },
    },
  },
});

export { theme };
