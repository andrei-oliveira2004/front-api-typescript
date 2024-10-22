
import { Routes, Route, Navigate } from "react-router"
import React, { useEffect } from 'react';
import { useDrawerContext } from "../shared/contexts";
import { Dashboard,
   ListagemPessoas, } from "../pages";

export const AppRoutes = () => {
  const {setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      
      {
        icon: 'people',
        path: '/pessoas',
        label: 'Pessoas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard/>} />
      
      <Route path="/pessoas" element={<ListagemPessoas/>} />
     {/*  <Route path="/pessoas/detalhe:id" element={<Dashboard/>} /> */}
      
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      
    </Routes>
  );
};