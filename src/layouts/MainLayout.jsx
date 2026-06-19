import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

import React from 'react';
// import Toast from "../components/Toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function MainLayout() {
  return (
    <div className="main-layout relative flex min-h-screen w-full flex-col items-center justify-start">
      <Header />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <ToastContainer />
    </div>
  );
}
