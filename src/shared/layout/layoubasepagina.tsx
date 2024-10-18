import { Box, Icon, IconButton, Typography, useTheme, useMediaQuery, Theme} from "@mui/material";
import { ReactNode } from "react";  
import { useDrawerContext } from "../contexts";

interface ILayoutBasePaginaProps {
  titulo:string;
  barradeferramentas: ReactNode;  
  children?: ReactNode;  
}

export const LayoutBasePagina: React.FC<ILayoutBasePaginaProps> = ({ children, titulo, barradeferramentas }) => {
  const down = useMediaQuery((theme:Theme)=> theme.breakpoints.down('sm')); 
  const mdDown = useMediaQuery((theme:Theme)=> theme.breakpoints.down('md')); 
  const theme = useTheme()
  const {toggleDrawerOpen} = useDrawerContext()
  return (
    <Box height="100%" display={"flex"} flexDirection={"column"} gap={1}>
      <Box padding={1} display={"flex"} alignItems={"center"} gap={1} height={theme.spacing(down ? 6 : mdDown ? 8 : 12 )} >
        {down  && (
        <IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>
        )}
        <Typography 
        variant={down ? 'h5': mdDown ? 'h4' : 'h3' } 
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        >
        {titulo}
        </Typography>
      </Box> 

      {barradeferramentas &&(
      <Box>
        {barradeferramentas}
      </Box>

      )}
      <Box flex={1} overflow="auto">
        {children} 
      </Box> 
    </Box>
  );
};
