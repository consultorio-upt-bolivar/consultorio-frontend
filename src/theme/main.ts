import { createTheme as createThemeV4 } from '@material-ui/core/styles';
import { createTheme as createThemeV5 } from '@mui/material/styles';
import { grey } from "@mui/material/colors";

const rawTheme = createThemeV5({
  palette: {
    primary: {
      main: '#5eaab1',
      light: '#E2E4E4',
      dark: '#2d7979',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4cc7ea',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    error: {
      main: 'rgb(232, 59, 70)',
      contrastText: 'rgba(255,255,255,0.87)',
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: 'uppercase',
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 20,
      fontWeight: rawTheme.typography.fontWeightLight,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 14,
    },
    a: {
      fontSize: 14,
      textDecoration: "none"
    },
  },
};

export const themeV4 = createThemeV4({
  palette: {
    primary: {
      main: '#5eaab1',
      light: '#E2E4E4',
      dark: '#2d7979',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4cc7ea',
      contrastText: 'rgba(255,255,255,0.87)',
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
  },
});


export default theme;