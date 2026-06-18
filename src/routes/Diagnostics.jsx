import React from 'react';
import { Media } from '../utils/media';
import Footer from '../components/Footer';
import RazorpayButton from '../components/PaymentComponent';
export default function Diagnostics() {
  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#f0efed]">
      <div className="content mt-[124px] flex h-full w-full flex-col items-center justify-start gap-6">
        <div className="relative flex h-full w-[90%] items-start justify-center gap-6">
          <img src={Media.diagnosticsBanner} alt="diagnostics banner" className="h-auto w-full" />
          <button
            className="absolute bottom-8 left-16 h-[50px] w-[19vw] rounded-full bg-[transparent] px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#00000010]"
            onClick={() => alert('Contact us for more information')}
          >
            {/* Contact Us */}
          </button>
        </div>
        <div className="flex h-full w-[90%] flex-col items-start justify-center gap-6">
          <h2 className="font-[Arima] text-4xl font-bold">Checkups based on Vital Organs</h2>
          <img src={Media.vitalOrgans} alt="vital organs" className="h-auto w-[100%]" />
        </div>
        <CheckupChip />
        <div className="grid h-full w-[90%] grid-cols-3 gap-6">
          {DUMMY_CHECKUP_PACKAGES.map((pkg) => (
            <CheckupCard key={pkg.Pid} {...pkg} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

const CheckupChip = ({
  data = [
    'Fever',
    'Full Body Checkup',
    'Heart Disease',
    'Kidney Disease',
    'Diabetes',
    'Hypertension',
    'Liver Disease',
  ],
}) => {
  return (
    <div className="flex h-full w-[90%] flex-col items-start justify-center gap-6">
      <h2 className="font-[Arima] text-4xl font-bold">Explore Checkups</h2>
      <div className="flex h-full w-full items-start justify-start gap-4 overflow-x-auto">
        {data.map((item, index) => (
          <button
            key={index}
            className="flex h-[50px] min-w-max items-center justify-center rounded-full bg-[#fff] px-4 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#333333]"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const DUMMY_CHECKUP_PACKAGES = [
  {
    id: 1,
    icon: '🧪',
    testCount: 54,
    title: 'Comprehensive Male Health Screening Package',
    description:
      'Comprehensive male health screening package including multiple body checkup tests for overall wellness.',
    offerText: 'Get upto 25% off on adding 6 member in plan',
    members: 2,
    price: 1500,
    originalPrice: 2000,
  },
  {
    id: 2,
    icon: '❤️',
    testCount: 38,
    title: 'Heart Health & Cardiac Risk Package',
    description:
      'Complete cardiac risk assessment with lipid profile, ECG, and advanced heart markers for early detection.',
    offerText: 'Get upto 20% off on adding 4 member in plan',
    members: 1,
    price: 1200,
    originalPrice: 1800,
  },
  {
    id: 3,
    icon: '🩸',
    testCount: 72,
    title: 'Full Body Diabetes & Metabolic Panel',
    description:
      'Detailed diabetes screening and metabolic panel covering HbA1c, insulin resistance, thyroid and liver function.',
    offerText: 'Get upto 30% off on adding 6 member in plan',
    members: 2,
    price: 2100,
    originalPrice: 3000,
  },
  {
    id: 4,
    icon: '🌸',
    testCount: 45,
    title: 'Women Wellness & Hormonal Checkup',
    description:
      'Holistic womens health package covering hormonal balance, thyroid, bone density, and reproductive health markers.',
    offerText: 'Get upto 15% off on adding 3 member in plan',
    members: 1,
    price: 1750,
    originalPrice: 2200,
  },
];

const CheckupCard = ({
  icon = '🧪',
  testCount = 54,
  title = 'Comprehensive Male Health Screening Package',
  description = 'Comprehensive male health screening package including multiple body checkup tests for overall wellness.',
  offerText = 'Get upto 25% off on adding 6 member in plan',
  members = 2,
  price = 1500,
  originalPrice = 2000,
  onBook = () => {},
}) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
      {/* Top row: icon + test count */}
      <div className="flex items-start justify-between">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#fdf0eb] text-[32px]">
          {icon}
        </div>
        <span className="rounded-xl bg-[#e0f2f1] px-4 py-2 text-[14px] font-semibold text-teal-600">
          {testCount} Tests
        </span>
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-1">
        <h3 className="font-[Public Sans] text-[18px] font-bold leading-snug text-black">
          {title}
        </h3>
        <p className="font-[Public Sans] text-[13px] leading-relaxed text-gray-500">
          {description}
        </p>
      </div>

      {/* Offer Banner */}
      <div className="flex items-center justify-center rounded-lg bg-[#f0fdf4] px-4 py-2">
        <span className="font-[Public Sans] text-center text-[13px] font-medium text-green-600">
          {offerText}
        </span>
      </div>

      {/* Members selector + Price */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-[13px] font-medium text-black">
          {members} Member{members > 1 ? 's' : ''}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[20px] font-bold text-black">₹{price.toLocaleString('en-IN')}</span>
          <span className="font-[Public Sans] text-[14px] text-gray-400 line-through">
            ₹{originalPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Book Now Button */}
      {/* <button
        onClick={onBook}
        className="w-full rounded-xl bg-orange-500 py-3 text-[15px] font-bold text-white transition-colors duration-200 hover:bg-orange-600"
      >
        Book Now
      </button> */}
      <RazorpayButton
        amount={price} // Convert to paise
        description={title}
        onSuccess={() => alert('Payment Successful!')}
        onError={() => alert('Payment Failed. Please try again.')}
        style={{ width: '100%', borderRadius: '0.75rem', backgroundColor: '#f97316', color: '#fff', fontSize: '15px', fontWeight: 'bold', padding: '0.75rem', border: 'none', cursor: 'pointer' }}
      />
    </div>
  );
};
