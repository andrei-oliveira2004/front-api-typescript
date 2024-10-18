import { createTheme } from '@mui/material';
import { yellow, cyan } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode:"dark",
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
      default: '#202124', 
      paper: '#303134',
    },
  },
  typography:{
    allVariants:{
      color:'#ffffff',
    }
  }
});
