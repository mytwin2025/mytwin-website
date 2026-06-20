import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from '../utils/media';
import { Headphones } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
const navLinks = [
  { label: 'Plans', to: '/plans' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Diagnostics', to: '/diagnostics' },
  { label: 'Corporate Wellness', to: '/corporate-wellness' },
];
export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const mobileMenuRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const lastScrollYRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isOpen) {
        setIsHeaderVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 24) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollYRef.current + 4) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollYRef.current - 4) {
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen) {
      setIsHeaderVisible(true);
    }
  }, [isOpen]);

  useGSAP(
    () => {
      gsap.to(mobileMenuRef.current, {
        y: isOpen ? '0%' : '-100vh',
        duration: 0.5,
        ease: 'power2.out',
      });
    },
    { dependencies: [isOpen] }
  );

  useGSAP(
    () => {
      gsap.to(headerRef.current, {
        y: isHeaderVisible ? '0%' : '-110%',
        autoAlpha: isHeaderVisible ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
    { dependencies: [isHeaderVisible] }
  );

  return (
    <div
      ref={headerRef}
      className="header align-center fixed z-[999] flex w-full flex-col justify-center md:top-[24px] md:flex-row"
    >
      {/* <div className={`mx-auto flex h-[70px] max-w-[95%] items-center justify-between rounded-full border border-gray-200 bg-white px-6 shadow-sm`}> */}
      <div
        className={`content flex h-[70px] w-full items-center justify-between border border-gray-200 bg-white px-6 shadow-sm md:w-fit lg:min-w-[95%] lg:rounded-full`}
      >
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={Media.header.mytwin} alt="My Twin" className="h-70 lg:h-7" />
        </Link>

        <HamBerger className={`md:hidden lg:hidden`} setIsOpen={setIsOpen} isOpen={isOpen} />

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="font-[Satoshi-Medium] text-sm text-gray-800 transition-colors hover:text-orange-500"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Talk to Expert */}
          <button className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 font-[Inter] text-sm text-white transition-colors hover:bg-orange-600">
            <Headphones size={15} />
            Talk to Expert
          </button>

          {/* App Store + Google Play */}
          <div className="flex items-center gap-3 rounded-full bg-black px-5 py-2.5 text-white">
            {/* Apple / App Store */}
            <a
              href="https://apps.apple.com/in/app/mytwin-parents-diabetes-care/id6763519090"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <img src={Media.header.apple} alt="App Store" className="h-4 w-4" />
              <span className="font-[Satoshi-Bold] text-xs">App Store</span>
            </a>

            {/* Divider */}
            <div className="h-4 w-px bg-gray-600" />

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.mytwinlab.mytwin&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <img src={Media.header.playstore} alt="Google Play" className="h-4 w-4" />
              <span className="font-[Satoshi-Bold] text-xs">Google Play</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`z-[-999] flex h-screen w-full translate-y-[-100vh] flex-col gap-8 bg-white px-6 py-8 pt-14 md:hidden`}
      >
        {navLinks.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className="text-md font-[Satoshi-Medium] text-gray-800 transition-colors hover:text-orange-500"
          >
            {label}
          </Link>
        ))}
        <Link
          to="/coaches"
          className="flex w-fit items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 font-[Inter] text-sm text-white transition-colors hover:bg-orange-600"
        >
          <Headphones size={15} /> Talk To Coaches
        </Link>
        <div className="flex items-center justify-around gap-3 rounded-full bg-black px-5 py-2.5 text-white">
          {/* Apple / App Store */}
          <a
            href="https://apps.apple.com/in/app/mytwin-parents-diabetes-care/id6763519090"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <img src={Media.header.apple} alt="App Store" className="h-4 w-4" />
            <span className="font-[Satoshi-Bold] text-xs">App Store</span>
          </a>

          {/* Divider */}
          <div className="h-4 w-px bg-gray-600" />

          {/* Google Play */}
          <a
            href="https://play.google.com/store/apps/details?id=com.mytwinlab.mytwin&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            <img src={Media.header.playstore} alt="Google Play" className="h-4 w-4" />
            <span className="font-[Satoshi-Bold] text-xs">Google Play</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const HamBerger = ({ className, isOpen, setIsOpen }) => {
  return (
    <button
      className={`flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full border bg-transparent ${className} `}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="align-center flex w-full flex-col items-center justify-center gap-1">
        <div className="w-5 rounded-md border-2 border-black" />
        <div className="w-5 rounded-md border-2 border-black" />
      </div>
    </button>
  );
};
