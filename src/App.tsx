import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/route-guard";
import { ThemeProvider, CssBaseline, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
