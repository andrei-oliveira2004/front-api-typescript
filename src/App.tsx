
import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import {Menulateral} from "./shared/components";


export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
      <BrowserRouter>

      <Menulateral>
        <AppRoutes />
      </Menulateral>
      
      </BrowserRouter>
      </DrawerProvider>
      </AppThemeProvider>

  );
}