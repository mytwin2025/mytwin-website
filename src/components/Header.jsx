import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from '../utils/media';
import { Headphones, Mail, MapPin, Phone, X, User, ShoppingCart, LogOut } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useContactForm } from '../context/ContactFormContext';
import ContactFormModal from './ContactFormModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Care Programs', to: '/care-programs' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Diagnostics', to: '/diagnostics' },
  { label: 'Corporate Wellness', to: '/corporate-wellness' },
  // { label: 'Login', to: '/login' },
  // { label: 'Cart', to: '/cart'}
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);
  const mobileMenuRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const lastScrollYRef = React.useRef(0);

  const { handleOpenModal } = useContactForm();
  const { isAuthenticated, openLogin, logout, user } = useAuth();
  const { cartItems } = useCart();

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
      if (isOpen) {
        gsap.set(mobileMenuRef.current, { display: 'flex', pointerEvents: 'auto' });
        gsap.to(mobileMenuRef.current, {
          y: '0%',
          duration: 0.5,
          ease: 'power2.out',
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          y: '-100vh',
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(mobileMenuRef.current, { display: 'none', pointerEvents: 'none' });
          },
        });
      }
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
    <>
      <div
        ref={headerRef}
        className="header align-center fixed z-[999] flex w-full flex-col justify-center md:top-[24px] md:flex-row"
      >
        <div
          className={`content flex h-[70px] w-full items-center justify-between border border-gray-200 bg-white px-6 shadow-sm md:w-fit lg:min-w-[95%] lg:rounded-full`}
        >
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src={Media.header.mytwin} alt="My Twin" className="h-7" />
          </Link>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-5 md:hidden">
            {isAuthenticated ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-1 text-gray-800 transition-colors hover:text-orange-500"
                title="Profile"
              >
                <User size={22} />
              </button>
            ) : (
              <button
                onClick={() => {
                  openLogin();
                  setIsOpen(false);
                }}
                className="text-gray-800 transition-colors hover:text-orange-500"
              >
                <User size={22} />
              </button>
            )}
            {cartItems.length > 0 && (
              <Link
                to={'/cart'}
                className="relative text-gray-800 transition-colors hover:text-orange-500"
              >
                <ShoppingCart size={20} />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                  {cartItems.length}
                </span>
              </Link>
            )}
            <HamBerger setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>

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

          <div className="hidden flex-row items-center gap-6 md:flex">
            {/* login button */}
            {isAuthenticated ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-2 font-[Inter] text-sm font-semibold text-gray-800 transition-colors hover:text-orange-500"
                title="Profile"
              >
                <User size={22} />
              </button>
            ) : (
              <button
                onClick={() => openLogin()}
                className="flex items-center gap-2 font-[Inter] text-sm font-semibold text-gray-800 transition-colors hover:text-orange-500"
              >
                <User size={22} />
                <span>Login</span>
              </button>
            )}
            {cartItems.length > 0 && (
              <Link
                to={'/cart'}
                className="relative flex items-center gap-2 font-[Inter] text-sm text-gray-800 transition-colors hover:text-orange-500"
              >
                <div className="relative">
                  <ShoppingCart size={18} />
                  <span className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
                    {cartItems.length}
                  </span>
                </div>
                <span>Cart</span>
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Talk to Expert */}
            <button
              onClick={handleOpenModal}
              className="flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-5 py-1.5 font-[Inter] text-[14px] text-white transition-colors hover:bg-orange-600"
            >
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
          style={{ display: 'none', pointerEvents: 'none' }}
          className={`z-[-999] flex h-screen w-full translate-y-[-100vh] flex-col gap-4 bg-white px-6 py-8 pt-10 md:hidden`}
        >
          {[...navLinks, { label: 'About Us', to: '/about-us' }].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className="text-md font-[Satoshi-Medium] text-gray-800 transition-colors hover:text-orange-500"
            >
              {label}
            </Link>
          ))}
          <div className="space-y-3 font-[Inter] md:hidden">
            {/* <span className="font-[Inter] text-sm font-bold text-black">Contact</span> */}

            {/* Phone */}
            <div className="flex items-center gap-3">
              {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"> */}
              <Phone className="text-orange-500" size={17} />
              {/* </div> */}
              <div>
                {/* <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Phone Number
                </h4> */}
                <p className="mt-1 text-xs text-gray-600 transition-colors hover:text-orange-600 sm:text-sm">
                  <a href="tel:+918369255417">+91 8369255417</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"> */}
              <Mail className="text-orange-500" size={17} />
              {/* </div> */}
              <div>
                {/* <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</h4> */}
                <p className="mt-1 text-xs text-gray-600 transition-colors hover:text-orange-600 sm:text-sm">
                  <a href="mailto:info@mytwinlab.com">info@mytwinlab.com</a>
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-3">
              {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600"> */}
              <MapPin className="text-orange-500" size={17} />
              {/* </div> */}
              <div>
                {/* <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Office Address
                </h4> */}
                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                  Plot 230,Ghansoli, Navi Mumbai,400701
                </p>
              </div>
            </div>
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex flex-row items-center gap-2 text-gray-800 transition-colors hover:text-orange-500"
              title="Profile"
            >
              <User size={22} />
            </button>
          ) : (
            <button
              onClick={() => {
                openLogin();
                setIsOpen(false);
              }}
              className="flex flex-row items-center gap-2 text-gray-800 transition-colors hover:text-orange-500"
            >
              <User size={22} />
              <span>Login</span>
            </button>
          )}
          <div className="grid w-full grid-cols-1 gap-3">
            <button
              onClick={() => {
                setIsOpen(false);
                handleOpenModal();
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 font-[Inter] text-sm text-white transition-colors hover:bg-orange-600"
            >
              <Headphones size={15} /> Talk to Expert
            </button>
            {/* <button
              onClick={() => {
                setIsOpen(false);
                handleOpenModal();
              }}
              className="flex items-center justify-center gap-2 rounded-full bg-gray-200 px-5 py-2.5 font-[Inter] text-sm text-gray-800 transition-colors hover:bg-gray-300"
            >
              <Mail size={15} /> Contact Us
            </button> */}
          </div>
          <div className="flex items-center justify-around gap-3 rounded-full bg-black px-5 py-2.5 text-white">
            {/* Apple / App Store */}
            <a
              href="https://apps.apple.com/in/app/mytwin-parents-diabetes-care/id6763519090"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <img src={Media.header.apple} alt="App Store" className="h-7 w-7" />
              <span className="font-[Satoshi-Bold] text-sm">App Store</span>
            </a>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-600" />

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.mytwinlab.mytwin&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
            >
              <img src={Media.header.playstore} alt="Google Play" className="h-7 w-7" />
              <span className="font-[Satoshi-Bold] text-sm">Google Play</span>
            </a>
          </div>
        </div>
      </div>

      <ContactFormModal />

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
            >
              <X size={20} />
            </button>
            <h2 className="mb-2 font-[Arima] text-2xl font-bold text-gray-900">Log Out</h2>
            <p className="mb-8 font-[Inter] text-sm text-gray-500">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-xl bg-gray-100 py-3 font-[Inter] font-semibold text-gray-700 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowLogoutModal(false);
                  setIsOpen(false);
                }}
                className="flex-1 rounded-xl bg-orange-500 py-3 font-[Inter] font-semibold text-white transition-colors hover:bg-orange-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const HamBerger = ({ className, isOpen, setIsOpen }) => {
  return (
    <button
      className={`flex h-[40px] w-[40px] cursor-pointer flex-col items-center justify-center rounded-full bg-transparent ${className} `}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <X className="text-black" size={24} />
      ) : (
        <div className="align-center flex w-full flex-col items-center justify-center gap-1">
          <div className="h-0.5 w-6 rounded-full bg-black" />
          <div className="h-0.5 w-6 rounded-full bg-black" />
          <div className="h-0.5 w-6 rounded-full bg-black" />
        </div>
      )}
    </button>
  );
};
