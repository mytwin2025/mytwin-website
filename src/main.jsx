import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './assets/fonts/Satoshi/css/satoshi.css'
import './assets/fonts/fonts.css'
import 'lenis/dist/lenis.css'
import App from './App.jsx'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
// const lenis = new Lenis({
//   duration: 1.2,
//   smoothWheel: true,
// });

// // function raf(time) {
// //   lenis.raf(time);
// //   requestAnimationFrame(raf);
// // }

// // requestAnimationFrame(raf);
// lenis.on('scroll', ScrollTrigger.update);
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);

// gsap.registerPlugin(ScrollTrigger, useGSAP);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
