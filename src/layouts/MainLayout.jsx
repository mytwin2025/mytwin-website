import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

import React from 'react';
import { Toaster } from 'sonner';
export default function MainLayout() {
  return (
    <div className="main-layout relative flex min-h-screen w-full ">
      <Header />
      <main className="flex flex-1 w-full flex-col">
        <Outlet />
      </main>
      <Toaster richColors  />
    </div>
  );
}
