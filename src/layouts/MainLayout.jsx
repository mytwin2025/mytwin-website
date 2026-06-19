import { Outlet } from "react-router-dom";
import Header from "../components/Header";

import React from "react";
// import Toast from "../components/Toast";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function MainLayout() {
  return (
    <div className="main-layout w-full min-h-screen relative flex flex-col items-center justify-start">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
