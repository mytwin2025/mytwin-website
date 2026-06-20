import { useState } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import LandingPage from './routes/Landing';
import Plans from './routes/Plans';
import Diagnostics from './routes/Diagnostics';
import CorporateWelness from './routes/CorporateWelness';
import Coaches from './routes/Coaches';
import PlanDetails from './routes/PlanDetails';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CoachDetails from './routes/CoachDetails';
import AboutUs from './routes/AboutUs';
function App() {
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     smoothWheel: true,
  //   });
  //   const update = (time) => {
  //     lenis.raf(time * 1000);
  //   };

  //   lenis.on('scroll', ScrollTrigger.update);
  //   gsap.ticker.add(update);
  //   gsap.ticker.lagSmoothing(0);

  //   return () => {
  //     gsap.ticker.remove(update);
  //     lenis.destroy();
  //   };
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/corporate-wellness" element={<CorporateWelness />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/plan-details/:slug" element={<PlanDetails />} />
          <Route path="/coach-details" element={<CoachDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
