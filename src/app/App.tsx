import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SolodkoProvider } from './context/SolodkoContext';

export default function App() {
  return (
    <SolodkoProvider>
      <RouterProvider router={router} />
    </SolodkoProvider>
  );
}