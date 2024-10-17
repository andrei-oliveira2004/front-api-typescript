import { createTheme } from '@mui/material';
import { yellow, cyan } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    primary: {
      dark: yellow[800],
      light: yellow[500],
      main: yellow[700],
      contrastText: '#ffffff',  
    },
    secondary: {
      light: cyan[300],
      dark: cyan[400],
      main: cyan[500],
      contrastText: '#ffffff',  
    },
    background: {
      default: '#ffffff', 
      paper: '#f7f6f3',
    },
  },
});
