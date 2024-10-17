
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from './routes';
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./shared/themes";
import { AppThemeProvider } from "./shared/contexts";


export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </AppThemeProvider>
  );
}