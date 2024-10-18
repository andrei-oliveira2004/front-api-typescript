import { Button } from "@mui/material"
import { Routes, Route, Navigate } from "react-router"
import React, { useEffect } from 'react';
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle drawer</Button>} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      
    </Routes>
  );
};