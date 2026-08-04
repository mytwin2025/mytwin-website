import { useState, useEffect } from 'react';
import './App.css';
import MainLayout from './layouts/MainLayout';
import LandingPage from './routes/Landing';
import Plans from './routes/Plans';
import Diagnostics from './routes/Diagnostics';
import CorporateWelness from './routes/CorporateWelness';
import Coaches from './routes/Coaches';
import PlanDetails from './routes/PlanDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CoachDetails from './routes/CoachDetails';
import AboutUs from './routes/AboutUs';
import Cart from './routes/Cart';
import { ContactFormProvider } from './context/ContactFormContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoginModal from './components/LoginModal';
import Support from './routes/Support';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './routes/PrivacyPolicy';
import Terms from './routes/Terms';
import Refund from './routes/Refund';
import Faq from './routes/Faq';

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
      <ScrollToTop />
      <AuthProvider>
      <CartProvider>
      <ContactFormProvider>
        <LoginModal />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="/care-programs" element={<Plans />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/corporate-wellness" element={<CorporateWelness />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/program-details/:slug" element={<PlanDetails />} />
            <Route path="/coach-details" element={<CoachDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/return-refund" element={<Refund />} />
            <Route path="/faq" element={<Faq />} />
          </Route>
        </Routes>
      </ContactFormProvider>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
