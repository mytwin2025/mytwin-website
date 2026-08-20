import React, { useState, useEffect } from 'react';
import { Media } from '../utils/media';
import Footer from '../components/Footer';
import RazorpayButton from '../components/PaymentComponent';
import DiagnosisBookForm from '../components/DiagnosisBookForm';
import { useContactForm } from '../context/ContactFormContext';
import { card } from '../components/DiagnosisBookForm';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  BadgeCheck,
  FilePlus,
  Droplet,
  ArrowRightIcon as RightArrow,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  FileText,
} from 'lucide-react';
const diagnosticBanner = [
  {
    badge: 'LIMITED TIME OFFER',
    themeColor: '#f26522',
    title: 'Full Body Checkups',
    titleColor: '#000',
    highlight: 'With Expert Health Insights',
    highlightColor: '#f26522',
    subtitle:
      'Detect risks early with advanced diagnostics,\ndoctor consultations, and comprehensive\nbiomarker tracking.',
    featuresVariant: 'cards',
    features: [
      {
        icon: Media.diagnosticBanners.diagnoIco1,
        title: 'On-time',
        subtitle: 'sample collection',
      },
      {
        icon: Media.diagnosticBanners.diagnoIco2,
        title: 'FREE',
        subtitle: 'doctor consultation',
      },
      {
        icon: Media.diagnosticBanners.diagnoIco3,
        title: 'Full body &',
        subtitle: 'condition-specific tests',
      },
      {
        icon: Media.diagnosticBanners.diagnoIco4,
        title: 'Accurate reports',
        subtitle: 'with health insights',
      },
    ],
    btnText: 'Book Your Full Body Checkup',
    btnColor: '#f26522',
    showArrow: true,
    image: Media.diagnosticBanners.diagnostics,
  },
  {
    themeColor: '#9C1F52',
    title: 'PCOS/PCOD CARE',
    titleColor: '#701A41',
    highlight: 'Blood Tests Package',
    highlightColor: '#000',
    hasSeparator: true,
    separatorColor: '#701A41',
    subtitle: `Identify hormonal imbalances,\nmanage symptoms & support\nbetter reproductive health.`,
    featuresVariant: 'icons',
    features: [
      { icon: Media.diagnosticBanners.pcosIco1, title: 'Hormone\nProfile' },
      { icon: Media.diagnosticBanners.pcosIco2, title: 'Insulin\nResistance' },
      { icon: Media.diagnosticBanners.pcosIco3, title: 'Thyroid\nProfile' },
      { icon: Media.diagnosticBanners.pcosIco4, title: 'Vitamin D &\nB12' },
    ],
    btnText: 'KNOW MORE',
    btnColor: '#9C1F52',
    showArrow: false,
    image: Media.diagnosticBanners.pcos,
    slug: 'pcos-pcod-care',
  },
  {
    themeColor: '#005C61',
    title: 'DIABETES CARE',
    titleColor: '#005C61',
    highlight: 'Blood Tests Package',
    highlightColor: '#000',
    hasSeparator: true,
    separatorColor: '#005C61',
    subtitle: 'Track blood sugar, insulin\n& key markers to manage\ndiabetes better.',
    featuresVariant: 'icons',
    features: [
      { icon: Media.diagnosticBanners.diabetesIco1, title: 'Blood Sugar' },
      { icon: Media.diagnosticBanners.diabetesIco2, title: 'HbA1c' },
      { icon: Media.diagnosticBanners.diabetesIco3, title: 'Insulin\nResistance' },
    ],
    btnText: 'KNOW MORE',
    btnColor: '#006E73',
    showArrow: false,
    image: Media.diagnosticBanners.diabetes,
    slug: 'diabetes-care',
  },
  {
    themeColor: '#96003B',
    title: 'HEART CARE',
    titleColor: '#96003B',
    highlight: 'Blood Tests Package',
    highlightColor: '#000',
    hasSeparator: true,
    separatorColor: '#96003B',
    subtitle: 'Monitor heart health\nwith advanced blood\nbiomarkers.',
    featuresVariant: 'icons',
    features: [
      { icon: Media.diagnosticBanners.heartIco1, title: 'Lipid\nProfile' },
      { icon: Media.diagnosticBanners.heartIco2, title: 'hs-CRP' },
      { icon: Media.diagnosticBanners.heartIco3, title: 'ApoB' },
    ],
    btnText: 'KNOW MORE',
    btnColor: '#96003B',
    showArrow: false,
    image: Media.diagnosticBanners.heartDiag,
    slug: 'heart-care',
  },
  {
    themeColor: '#B84F00',
    title: 'BP & CHOLESTEROL CARE',
    titleColor: '#B84F00',
    highlight: 'Blood Tests Package',
    highlightColor: '#000',
    hasSeparator: true,
    separatorColor: '#B84F00',
    subtitle: 'Keep your blood pressure &\ncholesterol in check to reduce\nheart risks.',
    featuresVariant: 'icons',
    features: [
      { icon: Media.diagnosticBanners.bpIco1, title: 'Lipid\nProfile' },
      { icon: Media.diagnosticBanners.bpIco2, title: 'BP Risk\nMarkers' },
      { icon: Media.diagnosticBanners.bpIco3, title: 'Homocysteine' },
    ],
    btnText: 'KNOW MORE',
    btnColor: '#C75300',
    showArrow: false,
    image: Media.diagnosticBanners.bpCholesterol,
    slug: 'bp-cholesterol-care',
  },
  {
    themeColor: '#346227',
    title: 'FATTY LIVER CARE',
    titleColor: '#346227',
    highlight: 'Blood Tests Package',
    highlightColor: '#000',
    hasSeparator: true,
    separatorColor: '#346227',
    subtitle: 'Assess liver health & detect\nfatty liver early with key\nblood tests.',
    featuresVariant: 'icons',
    features: [
      { icon: Media.diagnosticBanners.liverIco1, title: 'Liver Function\nTests (LFT)' },
      { icon: Media.diagnosticBanners.liverIco2, title: 'GGT' },
      { icon: Media.diagnosticBanners.liverIco3, title: 'Lipid\nProfile' },
    ],
    btnText: 'KNOW MORE',
    btnColor: '#4C7D38',
    showArrow: false,
    image: Media.diagnosticBanners.fattyLiver,
    slug: 'fatty-liver-care',
  },
];

export default function Diagnostics() {
  const location = useLocation();
  const navigate = useNavigate();
  const isBookingFlow = location.state?.isBookingFlow || false;
  console.log(location.state);
  const { handleOpenModal } = useContactForm();
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [selectedMemberCount, setSelectedMemberCount] = useState(1);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % diagnosticBanner.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, diagnosticBanner.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % diagnosticBanner.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + diagnosticBanner.length) % diagnosticBanner.length);
  };

  const handleOpenBooking = (pkgId, membersCount = 1) => {
    setSelectedPackageId(pkgId);
    setSelectedMemberCount(membersCount);
    setShowConsultationModal(true);
  };

  const highlight = [
    {
      title: 'Certified Phlebotomists',
      img: Media.icons.phlebo,
      ringColor: '#015C3E',
    },
    {
      title: 'CAP & NABL Accredited Labs',
      img: Media.icons.cap,
      ringColor: '#441FAF',
    },
    {
      title: 'Free Report Consultation',
      img: Media.icons.consult,
      ringColor: '#701C89',
    },
  ];

  return (
    <div className="flex min-h-screen w-full items-start justify-center bg-[#f0efed]">
      <div className="content mt-[84px] flex w-full flex-col items-center justify-start gap-5 pb-8 sm:mt-[100px] sm:gap-6 md:mt-[124px]">
        {/* Diagnostic Banners */}
        <div
          className="group relative w-[92%] overflow-hidden sm:w-[90%]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex flex-row transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {diagnosticBanner.map((banner, index) => (
              <div
                key={index}
                className="relative w-full shrink-0 overflow-hidden rounded-[8px] bg-[#fdfaf6] shadow-sm"
              >
                {/* Background Image (All screens) */}
                <img
                  src={banner.image}
                  alt="banner background"
                  className="block h-full w-full object-cover"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex w-[90%] flex-col items-start justify-center p-3 sm:w-[75%] sm:p-6 md:w-[65%] lg:w-[60%] lg:p-12">
                  {banner.badge && (
                    <div
                      className={`mb-0.5 inline-flex items-center justify-center rounded-full px-2 py-0 text-[6px] font-bold tracking-wide text-white sm:px-3 sm:py-1.5 sm:text-[10px] md:mb-4 md:px-4 md:text-xs`}
                      style={{ backgroundColor: banner.themeColor }}
                    >
                      {banner.badge}
                    </div>
                  )}

                  <h2
                    className="font-[Inter] text-sm font-extrabold leading-[1.1] sm:text-2xl md:text-5xl lg:text-[52px]"
                    style={{ color: banner.titleColor }}
                  >
                    {banner.title}
                  </h2>
                  <h2
                    className={`font-[Inter] text-[13px] font-extrabold leading-[1] md:text-5xl lg:text-[52px] ${banner.hasSeparator ? 'mb-0.5 md:mb-3' : 'mb-1 md:mb-4'}`}
                    style={{ color: banner.highlightColor }}
                  >
                    {banner.highlight}
                  </h2>

                  {banner.hasSeparator && (
                    <div
                      className="mb-0.5 h-[2px] w-6 md:mb-6 md:w-12 lg:w-16"
                      style={{ backgroundColor: banner.separatorColor }}
                    ></div>
                  )}

                  <p className="mb-1 max-w-[480px] whitespace-pre-line font-[Inter] text-[8px] font-medium leading-[1.5] text-[#4a4a4a] sm:mb-4 sm:text-xs md:mb-6 md:text-base lg:text-lg">
                    {banner.subtitle}
                  </p>

                  {banner.featuresVariant === 'cards' ? (
                    <div className="mb-1 grid w-full max-w-[250px] grid-cols-2 gap-1 sm:mb-6 sm:gap-3 md:mb-8 md:max-w-[780px] md:gap-4">
                      {banner.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="mx-auto flex w-[95%] items-center gap-1 rounded-lg border border-orange-100 bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1 sm:gap-3 sm:rounded-2xl sm:p-3 md:p-4"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12">
                            <img
                              src={feature.icon}
                              alt={feature.title}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-[Inter] text-[7px] font-bold leading-tight text-black sm:text-xs md:text-base">
                              {feature.title}
                            </span>
                            <span className="font-[Inter] text-[6px] font-medium leading-[1.1] text-gray-600 sm:text-[10px] md:text-xs">
                              {feature.subtitle}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="mb-2 flex w-full max-w-[480px] items-start justify-start sm:mb-6 sm:justify-between sm:gap-2 md:mb-8 md:justify-between md:gap-4 lg:justify-between"
                      style={{ display: 'flex', gap: index === 1 ? '6px' : '16px' }}
                    >
                      {banner.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center justify-start gap-1 text-center sm:gap-2"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14">
                            <img
                              src={feature.icon}
                              alt={feature.title}
                              style={{
                                marginRight: idx === 2 ? '6px' : '0px',
                              }}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="whitespace-pre-line font-[Inter] text-[7px] font-bold leading-tight text-black sm:text-[10px] md:text-[11px] lg:text-sm">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      // if (banner.slug) {
                      //   navigate(`/program-details/${banner.slug}`);
                      // } else {
                      handleOpenBooking(null);
                      // }
                    }}
                    className="flex items-center justify-center gap-1 rounded-md px-3 py-0 font-[Inter] text-[8px] font-bold text-white transition-all hover:shadow-md sm:gap-2 sm:rounded-xl sm:px-6 sm:py-3 sm:text-xs md:px-8 md:py-4 md:text-sm lg:text-base"
                    style={{ backgroundColor: banner.btnColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                  >
                    {banner.btnText}
                    {banner.showArrow && <RightArrow size={20} className="ml-1" />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {/* <button
            onClick={prevBanner}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:left-4 sm:h-12 sm:w-12"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 opacity-0 shadow-md backdrop-blur-sm transition-opacity group-hover:opacity-100 sm:right-4 sm:h-12 sm:w-12"
          >
            <ChevronRight size={24} />
          </button> */}

          {/* Pagination Dots */}
          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-6">
            {diagnosticBanner.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`h-2 rounded-full transition-all ${currentBanner === idx ? 'w-6 bg-orange-500' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <div className="flex h-full w-[92%] flex-col items-start justify-center gap-4 sm:w-[90%] sm:gap-6">
          <h2 className="mb-4 w-full font-[Arima] text-2xl font-bold leading-tight text-[#1E253A] sm:text-3xl md:text-[40px]">
            Find test by Organs
          </h2>
          <div className="grid w-full grid-cols-4 gap-x-3 gap-y-6 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-8 lg:flex lg:flex-nowrap lg:justify-between">
            {Object.entries(Media.vitalOrgans).map(([key, imgSrc], index) => {
              return (
                <div
                  key={key}
                  className="group flex w-full cursor-pointer flex-col items-center justify-start"
                >
                  <div className="mb-2 flex aspect-square w-[56px] items-end justify-center overflow-hidden rounded-b-[16px] rounded-t-[100px] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-lg sm:w-[70px] md:w-[86px] lg:w-[90px] xl:w-[100px]">
                    <img src={imgSrc} alt={key} className="h-full w-full object-cover" />
                  </div>
                  <span
                    className="text-center font-[Inter] text-[10px] font-medium capitalize leading-tight text-[#333] sm:text-xs lg:text-[13px]"
                    style={{ letterSpacing: '-0.3px' }}
                  >
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <CheckupChip />
        <div className="grid h-full w-[92%] grid-cols-1 gap-4 sm:w-[90%] sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {card.map((pkg) => (
            <CheckupCard
              key={pkg.packageId}
              title={pkg.name}
              description={pkg.description}
              testCount={pkg.sub}
              price={parseInt(pkg.finalPrice.replace(/[^0-9]/g, ''), 10)}
              originalPrice={parseInt(pkg.price.replace(/[^0-9]/g, ''), 10)}
              icon="🧪"
              tests={pkg.tests}
              members={1}
              offerText={pkg.discount + ' OFF'}
              isBookingFlow={isBookingFlow}
              onBook={(membersCount) => handleOpenBooking(pkg.packageId, membersCount)}
            />
          ))}
        </div>

        {/* Trust Section */}
        <div className="flex w-[92%] flex-col items-center justify-center gap-6 py-6 sm:w-[90%] md:py-10">
          <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            <div className="relative flex min-h-[140px] flex-col items-start justify-end rounded-[20px] bg-[#f5f5f7] p-4 pt-12 shadow-sm sm:min-h-[160px] sm:p-5 sm:pt-14">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#e8e4ff] text-[#6b4cff] sm:h-12 sm:w-12">
                <BadgeCheck size={28} />
              </div>
              <h3 className="font-[Inter] text-[20px] font-bold tracking-tight text-[#1c1c1c] sm:text-[24px]">
                Trusted
              </h3>
              <p className="font-[Inter] text-[13px] font-medium text-[#4a4a4a] sm:text-[14px]">
                labs. Accurate results
              </p>
            </div>
            <div className="relative flex min-h-[140px] flex-col items-start justify-end rounded-[20px] bg-[#f5f5f7] p-4 pt-12 shadow-sm sm:min-h-[160px] sm:p-5 sm:pt-14">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe8d6] text-[#ff7043] sm:h-12 sm:w-12">
                <Droplet size={28} />
              </div>
              <h3 className="font-[Inter] text-[20px] font-bold tracking-tight text-[#1c1c1c] sm:text-[24px]">
                Home
              </h3>
              <p className="font-[Inter] text-[13px] font-medium text-[#4a4a4a] sm:text-[14px]">
                Hassle-free sampling
              </p>
            </div>
            <div className="relative flex min-h-[140px] flex-col items-start justify-end rounded-[20px] bg-[#f5f5f7] p-4 pt-12 shadow-sm sm:min-h-[160px] sm:p-5 sm:pt-14">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#dcf2f1] text-[#00838f] sm:h-12 sm:w-12">
                <FilePlus size={28} />
              </div>
              <h3 className="font-[Inter] text-[20px] font-bold tracking-tight text-[#1c1c1c] sm:text-[24px]">
                Smart
              </h3>
              <p className="mb-4 font-[Inter] text-[13px] font-medium text-[#4a4a4a] sm:mb-0 sm:text-[14px]">
                & fast report
              </p>
            </div>
            <div className="relative flex min-h-[140px] flex-col items-start justify-end rounded-[20px] bg-[#f5f5f7] p-4 pt-12 shadow-sm sm:min-h-[160px] sm:p-5 sm:pt-14">
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#dcedc8] text-[#33691e] sm:h-12 sm:w-12">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-[Inter] text-[20px] font-bold tracking-tight text-[#1c1c1c] sm:mb-0 sm:text-[24px]">
                Safe
              </h3>
              <p className="mb-4 font-[Inter] text-[13px] font-medium text-[#4a4a4a] sm:mb-0 sm:text-[14px]">
                & secure data
              </p>
            </div>
          </div>

          <div className="mt-2 flex w-full items-center justify-center gap-3 rounded-[20px] bg-[#f5f5f7] py-4 shadow-sm sm:py-5">
            <ShieldCheck className="text-[#33691e]" size={24} />
            <span className="font-[Inter] text-[15px] font-medium text-[#1c1c1c] sm:text-[16px]">
              Built on Trust. Backed by Science.
            </span>
          </div>
          <span>Now offering lab tests across India</span>
          <div className="flex w-full items-start justify-between gap-2 py-6 sm:justify-center sm:gap-16">
            {highlight.map((item, index) => (
              <div
                key={index}
                className="flex w-1/3 flex-col items-center justify-start gap-3 sm:w-[140px]"
              >
                <div
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full sm:h-[88px] sm:w-[88px]"
                  style={{
                    border: `2px solid ${item.ringColor}`,
                    padding: '4px',
                  }}
                >
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                </div>
                <span className="text-center font-[Inter] text-[12px] font-semibold leading-snug text-[#1c1c1c] sm:text-[14px]">
                  {item.title}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 text-center font-[Inter] text-[15px] font-medium text-[#6b7280] sm:text-[16px] md:flex-row md:gap-12">
            <span className="font-[Inter] text-[18px] font-semibold leading-[24px] text-[#2F387F]">
              Still have a question?
            </span>
            {/* Healthians Section */}

            <button
              className="flex flex-row items-center justify-between gap-4 rounded-full bg-[#f3f3f4] p-2 pl-2 pl-6 pr-2 transition-transform hover:scale-105 sm:pl-2 md:pl-2 lg:pl-2"
              onClick={handleOpenModal}
            >
              <div className="relative hidden h-10 w-[136px] md:flex">
                {[
                  'https://randomuser.me/api/portraits/men/32.jpg',
                  'https://randomuser.me/api/portraits/women/44.jpg',
                  'https://randomuser.me/api/portraits/men/46.jpg',
                  'https://randomuser.me/api/portraits/women/68.jpg',
                  'https://randomuser.me/api/portraits/men/85.jpg',
                ].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    className="absolute top-0 h-10 w-10 rounded-full border-2 border-[#f3f3f4] object-cover"
                    style={{
                      transform: `translateX(${idx * 24}px)`,
                      zIndex: 10 + idx,
                    }}
                    alt="user"
                  />
                ))}
              </div>
              <span className="text-[14px] font-semibold text-gray-800 md:text-[16px]">
                Talk To Our Experts
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <RightArrow size={20} color="#000" />
              </div>
            </button>
          </div>
        </div>

        <Footer />
        <DiagnosisBookForm
          isOpen={showConsultationModal}
          onClose={() => setShowConsultationModal(false)}
          initialPackageId={selectedPackageId}
          initialMemberCount={selectedMemberCount}
          isBookingFlow={isBookingFlow}
        />
      </div>
    </div>
  );
}

const CheckupChip = ({
  data = [
    // 'Fever',
    'Full Body Checkup',
    'Heart Disease',
    'Kidney Disease',
    'Diabetes',
    'Hypertension',
    'Liver Disease',
    'Cancer',
  ],
}) => {
  return (
    <div className="flex h-full w-[92%] flex-col items-start justify-center gap-4 sm:w-[90%] sm:gap-6">
      <h2 className="font-[Arima] text-2xl font-bold leading-tight text-black sm:text-3xl md:text-4xl">
        Explore Checkups
      </h2>
      <div className="pill flex w-full items-start justify-start gap-3 overflow-x-scroll pb-2 sm:gap-4">
        {data.map((item, index) => (
          <button
            key={index}
            className="flex h-[42px] min-w-max items-center justify-center rounded-full bg-[#fff] px-3 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-[#333333] hover:text-white sm:h-[50px] sm:px-4 sm:text-sm"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

const CheckupCard = ({
  icon = '🧪',
  testCount = 54,
  tests = [],
  title = 'Comprehensive Male Health Screening Package',
  description = 'Comprehensive male health screening package including multiple body checkup tests for overall wellness.',
  offerText = 'Get upto 25% off on adding 6 member in plan',
  members = 2,
  price = 1500,
  originalPrice = 2000,
  isBookingFlow = false,
  onBook = () => {},
}) => {
  const [selectedMembers, setSelectedMembers] = React.useState(members);
  const [showTests, setShowTests] = React.useState(false);

  // Calculate scaled prices relative to the base members configuration
  const currentPrice = Math.round((price / members) * selectedMembers);
  const currentOriginalPrice = Math.round((originalPrice / members) * selectedMembers);

  return (
    <div className="flex w-full flex-col justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4">
        {/* Top row: icon + test count */}
        <div className="flex items-start justify-between">
          <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-[#fdf0eb] bg-cover bg-center text-[28px] sm:h-[72px] sm:w-[72px] sm:text-[32px]">
            <img src={Media.icons.labIcon} alt="labIcon" className="h-full w-full object-cover" />
          </div>
          <span
            onClick={() => {
              if (tests && tests.length > 0) setShowTests(true);
            }}
            className="cursor-pointer rounded-xl bg-[#e0f2f1] px-3 py-1.5 text-[12px] font-semibold text-teal-600 underline decoration-dotted underline-offset-4 hover:text-teal-700 sm:px-4 sm:py-2 sm:text-[14px]"
          >
            {testCount} Tests
          </span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-1">
          <h3 className="font-[Public Sans] text-[16px] font-bold leading-snug text-black sm:text-[18px]">
            {title}
          </h3>
          <p className="font-[Public Sans] text-[12px] leading-relaxed text-gray-500 sm:text-[13px]">
            {description}
          </p>
          <div className="mt-1 flex w-full flex-wrap items-center justify-start gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-gray-600">
              <Clock size={12} className="text-gray-500" />
              <span className="font-[Public Sans] text-[11px] font-medium leading-none sm:text-[12px]">
                12 hrs fasting
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-gray-600">
              <FileText size={12} className="text-gray-500" />
              <span className="font-[Public Sans] text-[11px] font-medium leading-none sm:text-[12px]">
                Report in 24-48 hrs
              </span>
            </div>
          </div>
        </div>

        {/* Offer Banner */}
        <div className="flex items-center justify-center rounded-lg bg-[#f0fdf4] px-4 py-2">
          <span className="font-[Public Sans] text-center text-[12px] font-medium text-green-600 sm:text-[13px]">
            {offerText}
          </span>
        </div>

        {/* Price and Action */}
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-bold text-black sm:text-[22px]">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            <span className="font-[Public Sans] text-[12px] text-gray-400 line-through sm:text-[14px]">
              ₹{currentOriginalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onBook(selectedMembers)}
            className="cursor-pointer rounded-xl bg-orange-500 px-5 py-2.5 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-orange-600 sm:px-6 sm:py-3 sm:text-[15px]"
          >
            {isBookingFlow ? 'Add To Cart' : 'Book Now'}
          </button>
        </div>
      </div>

      {/* Tests Modal */}
      {showTests && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-5">
              <h2 className="text-lg font-bold text-gray-900">{title} - Included Tests</h2>
              <button
                onClick={() => setShowTests(false)}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {tests.map((testGroup, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <h4 className="mb-2 text-sm font-bold text-gray-900">{testGroup.testName}</h4>
                    {testGroup.subTests && testGroup.subTests.length > 0 ? (
                      <ul className="flex list-disc flex-col gap-1.5 pl-4 text-xs text-gray-600">
                        {testGroup.subTests.map((sub, sIdx) => (
                          <li key={sIdx}>{sub}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
