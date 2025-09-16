import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  direction: "rtl",
 palette: {
  primary: { main: "#2575fc" }, // כחול עדין
  secondary: { main: "#6a11cb" }, // סגול עדין
  error: { main: "#ff6b6b" },
  background: { default: "#f5f6fa" },
},
  typography: {
    fontFamily: "Heebo, Rubik, Arial, sans-serif",
    h2: { fontWeight: 700 },
    h4: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;