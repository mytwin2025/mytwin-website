import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from '../utils/media';
import { Headphones } from 'lucide-react';

const navLinks = [
  { label: 'Plans', to: '/plans' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Diagnostics', to: '/diagnostics' },
  { label: 'Corporate Wellness', to: '/corporate-wellness' },
];
export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-[24px] z-[999] w-full">
      <div className="mx-auto flex h-[70px] max-w-[95%] items-center justify-between rounded-full border border-gray-200 bg-white px-6 shadow-sm">
        {/* Logo */}
        <Link to="/">
          <img src={Media.header.mytwin} alt="My Twin" className="h-7" />
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-8">
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
        <div className="flex items-center gap-3">
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
    </div>
  );
}
