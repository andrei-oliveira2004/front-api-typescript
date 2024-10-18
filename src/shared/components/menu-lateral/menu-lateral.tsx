import { Avatar, Drawer, Box, Divider, ListItemButton, ListItemIcon, ListItemText, List, Icon, CssBaseline } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router";


interface ListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, icon, onClick, label }) => {
  const navigate = useNavigate();
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const Menulateral: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const down = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext(); 
  const {toggleTheme}= useAppThemeContext()

  return (
    <>
      <Drawer open={isDrawerOpen} variant={down ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src="https://images.tcdn.com.br/img/img_prod/1025867/ima_logo_cbf_brasil_911_variacao_3087_1_39e5867d3b377846b6d6b9824bd19077.jpg"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={down ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
          <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar Tema" />
              </ListItemButton>
            </List>
        </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={down ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
