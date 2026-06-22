import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from '../utils/media';
import playstore from '../assets/images/playstore.png';
import apple from '../assets/images/apple.png';
const company = [
  {
    name: 'About Us',
    link: '/about-us',
  },
  {
    name: 'Help & Support',
    link: '/help-support',
  },
  {
    name: 'Contact us',
    link: '/contact-us',
  },
  {
    name: 'Become a Coach',
    link: '/become-a-coach',
  },
];
const offerings = [
  'Coaching',
  'My Plans',
  'Diagnostics',
  'Doctors Consultation',
  'Smart Ring',
  'Smart Scale',
  'Corporate Wellness',
];
const terms = ['Privacy Policy', 'Warranty Policy', 'Return & Refund'];

function LinkList({ heading, links }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-[Inter] text-sm font-bold text-black">{heading}</span>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.link}
          className="font-[Inter] text-xs text-gray-600 transition-colors hover:text-black md:text-sm"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default function Footer({ style }) {
  return (
    <footer style={style} className="w-full bg-[#F4F4F2] px-6 py-10 md:px-10">
      {/* Top row */}
      <div className="top-row flex w-full flex-col items-start justify-between md:flex-row">
        <div className="flex w-full flex-col items-start justify-between pb-8 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <img src={Media.header.mytwin} alt="MyTwin Logo" className="h-6 w-auto md:h-8" />
            <h2 className="mt-4 text-xl font-bold leading-tight text-black md:text-2xl">
              India's family first{' '}
              <span className="text-orange-500">fully integrated chronic care platform</span>{' '}
              supporting you & your parents between doctor visits
            </h2>
          </div>
          {/* App store buttons */}
          <div className="mt-5 inline-flex items-center rounded-full bg-black px-2 md:mt-0 py-1">
            <a
              href="#"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-2 py-1 text-white"
            >
              {/* <svg
                className="h-7 w-7 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 814 1000"
                fill="currentColor"
              >
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.4-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 71 0 130.5 46.4 174.9 46.4 42.7 0 109.2-49.9 188.2-49.9 30.3 0 130.9 2.6 198.3 99zM549.8 148.8c22.1-26 37.3-62.3 37.3-98.6 0-5.2-.4-10.5-1.3-14.7-34.9 1.3-76.1 23.3-100.8 51.7-20.1 23-38.7 59.3-38.7 96.2 0 5.8.9 11.7 1.3 13.6 2.2.4 5.8.9 9.4.9 31.3 0 70.1-21 92.8-49.1z" />
              </svg> */}
              <img className="w-1/4" src={apple} alt="Apple App Store" />

              <span className="text-sm font-semibold">App Store</span>
            </a>

            <div className="mx-1 h-6 w-px bg-white/30" />

            <a
              href="#"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap px-2 py-1 text-white"
            >
              {/* <svg
                className="h-7 w-7 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path fill="#4CAF50" d="M8 4l22 20L8 44V4z" />
                <path fill="#FFEB3B" d="M8 4l22 20 8-7.3L8 4z" />
                <path fill="#F44336" d="M8 44l22-20 8 7.3L8 44z" />
                <path fill="#2196F3" d="M30 24L8 4l30 13.3L30 24z" />
                <path fill="#2196F3" d="M30 24l8 7.3L38 17.3 30 24z" />
              </svg> */}

              <img className="w-1/4" src={playstore} alt="Google Play Store" />

              <span className="text-sm font-semibold">Google Play</span>
            </a>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="mb-4 flex flex-col gap-4 md:hidden">
        <span className="text-md font-[Inter] font-bold text-black">About MyTwin</span>
        <p className="text-sm leading-relaxed text-gray-600">
          MyTwin combines technology, health expertise, and real-time insights to help you take
          better control of your body, habits, and long-term health. From fitness and nutrition to
          glucose, sleep, activity, and vital tracking everything works together in one connected
          health system.
        </p>
        {/* Social icons */}
      </div>

      <hr className="mb-8 border-gray-300" />

      {/* Bottom grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="hidden flex-col gap-4 md:flex">
          <span className="text-sm font-bold text-black">About MyTwin</span>
          <p className="text-sm leading-relaxed text-gray-600">
            MyTwin combines technology, health expertise, and real-time insights to help you take
            better control of your body, habits, and long-term health. From fitness and nutrition to
            glucose, sleep, activity, and vital tracking everything works together in one connected
            health system.
          </p>
          {/* Social icons */}
          <div className="mt-2 flex items-center gap-4">
            {/* Twitter/X */}
            <a href="#" className="text-black transition-opacity hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="text-black transition-opacity hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-black transition-opacity hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* GitHub */}
            <a href="#" className="text-black transition-opacity hover:opacity-70">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
        <LinkList heading="Company" links={company} />
        <LinkList heading="MyTwin Offerings" links={offerings} />
        <LinkList heading="Terms & Conditions" links={terms} />
      </div>
      <div className="mt-2 flex items-center gap-4 md:hidden">
        {/* Twitter/X */}
        <a href="#" className="text-black transition-opacity hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        {/* Facebook */}
        <a href="#" className="text-black transition-opacity hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        {/* Instagram */}
        <a href="#" className="text-black transition-opacity hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>
        {/* GitHub */}
        <a href="#" className="text-black transition-opacity hover:opacity-70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
