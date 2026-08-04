import React, { useState } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { Media } from '../utils/media';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PlanInclusionPricing from '../components/PlanInclusionPricing';
import AddOnCards from '../components/AddOnCards';
import { ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { handlePayment, createOrder, verifyPayment } from '../utils/handlePayment';
// import TestimonialModal from '../components/TestimonialModal';
import { useCart } from '../context/CartContext';
import Dialog from '../components/Dialog';
import Input from '../components/Input';
import { showToast } from '../components/Toast';
import { useRazorpay } from 'react-razorpay';
import orangeBg from '../assets/images/sectionBg.png';
import BookConsultationModal from '../components/BookConsultationModal';
import axios from 'axios';
import { BASE_URL_APP } from '../constants/constants';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);
// - Obesity & Weight Related Issues
// - Diabetes & Prediabetes
// - Heart Health & Hypertension
// - High Cholesterol
// - Muscle & Strength Related Issues
// - Fatty Liver Related Issues
// - PCOS/PCOD

export const plansData = [
  {
    index: '01',
    title: 'Obesity &\nWeight\nManagement',
    forText: 'Obesity &\nWeight\nManagement',
    consultTitle: 'Obesity & Weight Related Issues',
    icon: Media.plans.icons.obesityWeightIcon,
    slug: 'obesity-weight-management',
    video: Media.plans.videos.obesityWeightManagementVideo,
    heading: `Fat Loss That Actually \nLasts`,
    subHeading: `No crash diets. No guesswork.  Just structured guidance, smarter habits, and real progress.`,
    buttonText: 'Start Now',
    scrollCards: [
      'Obesity\nManagement Program',
      Media.plans.scrollCards.one,
      Media.plans.scrollCards.two,
      Media.plans.scrollCards.obesityManagementCardThree,
      Media.plans.scrollCards.obesityManagementCardFour,
    ],
    memPerks: [
      'Personalised nutrition',
      'Habit-building system',
      'Real-time tracking (food, activity, progress)',
      '24/7 access to expert',
    ],
    includes: [
      '5–12% weight reduction',
      'Fat loss with Muscle Preservation',
      'Comprehensive Obesity & Metabolic Health Panel',
      'Medical Review of Reports and Doctor Consultation',
      'Personalized & Sustainable Programs',
      'End-to-End Support and Guidance',
    ],
    weeklyPrice: 1000,
    pricing: [
      { id: 1, name: '12 Weeks', week: 12, price: 12499 },
      { id: 2, name: '24 Weeks', week: 24, price: 24499 },
      { id: 3, name: '52 Weeks', week: 52, price: 47499 },
    ]
  },
  {
    index: '02',
    title: 'Diabetes &\nMetabolic Health',
    forText: 'Diabetes &\nMetabolic Health',
    consultTitle: 'Diabetes & Prediabetes',
    icon: Media.plans.icons.diabetesIcon,
    slug: 'diabetes-metabolic-health',
    video: Media.plans.videos.diabetesMetabolicHealthVideo,
    heading: `Control your sugar. \nBefore it controls you.`,
    subHeading: `Personalised metabolic care designed to help you manage glucose levels, improve energy,  and \nreduce long-term health risks.`,
    buttonText: 'Take Control',
    scrollCards: [
      'Diabetes &\nMetabolic Health Programs',
      Media.plans.scrollCards.one,
      Media.plans.scrollCards.two,
      Media.plans.scrollCards.diabetesManagementCardThree,
      Media.plans.scrollCards.diabetesManagementCardFour,
    ],
    memPerks: [
      'Smart glucose tracking',
      'Personalised nutrition therapy',
      'Lifestyle interventions',
      'Real-time guidance',
      '24/7 access to experts',
    ],
    includes: [
      'Reduce HbA1C ( 0.5-2 %)',
      'Stabilise Glucose Levels',
      'Reduce Medications Dependency (Doctor -Guided)',
      'Comprehensive Diabetes & Metabolic Health Panel',
      'Medical Review of Reports and Doctor Consultation',
      'Personalized & Sustainable Programs',
      'End-to-End Support and Guidance',
    ],
    weeklyPrice: 980,
    pricing: [
      { id: 1, name: '12 Weeks', week: 12, price: 14499 },
      { id: 2, name: '24 Weeks', week: 24, price: 27499 },
      { id: 3, name: '52 Weeks', week: 52, price: 47400 },
    ]
  },
  {
    index: '03',
    title: 'PCOS / PCOD\nCare',
    forText: 'PCOS / PCOD\nCare',
    icon: Media.plans.icons.pcosIcon,
    consultTitle: 'PCOS/PCOD',
    slug: 'pcos-pcod-care',
    video: Media.plans.videos.pcosPcodCareVideo,
    heading: `Balance Your Hormones. \nFeel Like Yourself Again.`,
    subHeading: `Personalised PCOS/PCOD care designed to help you manage weight, regulate cycles,  improve energy, and \nbuild healthier long-term habits.`,
    buttonText: 'Start Your Care',
    scrollCards: [
      'PCOS / PCOD\nCare Programs',
      Media.plans.scrollCards.one,
      Media.plans.scrollCards.two,
      Media.plans.scrollCards.pcosPcodCareCardThree,
      Media.plans.scrollCards.pcosPcodCareCardFour,
    ],
    memPerks: [
      'Hormonal biomarkers monitoring',
      'Hormone supportive programs',
      'Stress & sleep optimisation',
      'Real-time guidance',
      '24/7 access to experts',
    ],
    includes: [
      'Hormonal Balance',
      'Cycle Regulation',
      'Advanced Hormonal, Weight & Metabolic Health Panel',
      'Medical Review of Reports and Doctor Consultation',
      'Personalized & Sustainable Programs',
      'End-to-End Support and Guidance',
    ],
    weeklyPrice: 1250,
    pricing: [
      { id: 1, name: '12 Weeks', week: 12, price: 12499 },
      { id: 2, name: '24 Weeks', week: 24, price: 21499 },
      { id: 3, name: '52 Weeks', week: 52, price: 39499 },
    ]
  },
  {
    index: '04',
    title: 'Heart Health &\nHypertension',
    forText: "Heart Health, Blood Pressure & Cholesterol Care",
    consultTitle: 'Heart Health, Blood Pressure & Cholesterol Care',
    icon: Media.plans.icons.heartIcon,
    slug: 'heart-health-hypertension',
    video: Media.plans.videos.heartHealthHypertensionVideo,
    heading: `Support Your Heart. \nReduce Your Cholesterol. Manage Your Blood Pressure`,
    subHeading: `Personalised care designed to help you improve blood pressure, reduce health risks, and  build heart-healthy \nhabits that last.`,
    buttonText: 'Start Your Care',
    scrollCards: [
      'Heart Health, Blood Pressure & Cholesterol Care',
      Media.plans.scrollCards.one,
      Media.plans.scrollCards.two,
      Media.plans.scrollCards.heartHealthCardThree,
      Media.plans.scrollCards.heartHealthCardFour,
    ],
    memPerks: [
      'Health, Cholesterol & BP markers monitoring',
      'Heart-healthy programs',
      'Stress and cortisol recovery',
      'Real-time guidance',
      '24/7 access to experts',
    ],
    includes: [
      'Reduce BP ( 5-15 mmHg)',
      'Improve Heart & Vascular Health',
      'Support Long-term Cardiovascular Health',
      'Advanced Cardio Health & Metabolic Health Panel',
      'Medical Review of Reports and Doctor Consultation',
      'Personalized & Sustainable Programs',
      'End-to-End Support and Guidance',
    ],
    weeklyPrice: 950,
    pricing: [
      { id: 1, name: '12 Weeks', week: 12, price: 17499 },
      { id: 2, name: '24 Weeks', week: 24, price: 29499 },
      { id: 3, name: '52 Weeks', week: 52, price: 49400 },
    ]
  },
  {
    index: '05',
    title: 'Muscle, Strength & \nMobility Care',
    forText: 'Muscle, Strength & \nMobility Care',
    consultTitle: 'Muscle, Strength & Mobility Related Issues',
    icon: Media.plans.icons.muscleIcon,
    slug: 'muscle-gain-strength',
    video: Media.plans.videos.muscleGainStrengthVideo,
    heading: `Build Strength. Build Confidence.`,
    subHeading: `Structured muscle-building programs designed to help you gain lean muscle, improve strength,  and \nrecover smarter without unnecessary fat gain.`,
    buttonText: 'Start Your Journey',
    scrollCards: [
      'Muscle, Strength & \nMobility Care',
      Media.plans.scrollCards.one,
      Media.plans.scrollCards.two,
      Media.plans.scrollCards.muscleGainCardThree,
      Media.plans.scrollCards.muscleGainCardFour,
    ],
    memPerks: [
      'Structured training guidance',
      'High-protein nutrition',
      'Recovery & sleep optimisation',
      'Progress tracking',
      '24/7 access to experts',
    ],
    includes: [
      'Lean Muscle Gain & Strength Improvement',
      'Minimal Fat Gain',
      'Comprehensive Metabolic Health Panel',
      'Medical Review of Reports and Doctor Consultation',
      'Personalized & Sustainable Programs',
      'End-to-End Support and Guidance',
    ],
    weeklyPrice: 1200,
    pricing: [
      { id: 1, name: '12 Weeks', week: 12, price: 12499 },
      { id: 2, name: '24 Weeks', week: 24, price: 24400 },
      { id: 3, name: '52 Weeks', week: 52, price: 47400 },
    ]
  },
  // {
  //   index: '06',
  //   title: 'High\nCholestrol',
  //   consultTitle: 'High Cholesterol',
  //   icon: Media.plans.icons.cholesterolIcon,
  //   slug: 'high-cholesterol',
  //   video: Media.plans.videos.highCholesterolVideo,
  //   heading: `Fix your numbers. Fix \nyour risk.`,
  //   subHeading: `Personalised care designed to help you improve cholesterol levels, reduce health risks, and  \nbuild healthier long-term habits.`,
  //   buttonText: 'Start Your Journey',
  //   scrollCards: [
  //     'HIGH\nCHOLESTEROL Plans',
  //     Media.plans.scrollCards.one,
  //     Media.plans.scrollCards.two,
  //     Media.plans.scrollCards.highCholesterolCardThree,
  //     Media.plans.scrollCards.highCholesterolCardFour,
  //   ],
  //   memPerks: [
  //     'Lipid markers monitoring',
  //     'Personalised plan to reduce LDL,TG,TC',
  //     'Habits based interventions',
  //     'Real-time guidance',
  //     '24/7 access to experts',
  //   ],
  //   includes: [
  //     'Reduce LDL & Triglycerides',
  //     'Increase HDL',
  //     'Advanced Lipids & Metabolic Health Panel',
  //     'Medical Review of Reports and Doctor Consultation',
  //     'Personalized & Sustainable Plans',
  //     'End-to-End Support and Guidance',
  //   ],
  //   weeklyPrice: 900,
  // },
  {
    index: '07',
    title: 'FATTY LIVER \n Programs',
    forText: 'Fatty Liver \n Programs',
    consultTitle: 'Fatty Liver Related Issues',
    icon: Media.plans.icons.fattyLiverIcon,
    slug: 'fatty-liver',
    video: Media.plans.videos.fattyLiverVideo,
    heading: `Your liver needs \nattention. Not neglect.`,
    subHeading: `Personalised care designed to help you improve liver health, reduce health risks, and  \nbuild healthier long-term habits.`,
    buttonText: 'Start Your Journey',
    scrollCards: [
      'Fatty Liver',
      Media.plans.scrollCards.one,
      Media.plans.scrollCards.two,
      Media.plans.scrollCards.fattyLiverCardThree,
      Media.plans.scrollCards.fattyLiverCardFour,
    ],
    memPerks: [
      'Liver biomarkers monitoring',
      'Liver-friendly program to reduce liver fat',
      'Habits based interventions',
      'Real-time guidance',
      '24/7 access to experts',
    ],
    includes: [
      'Reduce Liver Fat',
      'Improve Enzymes & Restore Liver Health',
      'Advanced Liver & Metabolic Health Panel',
      'Medical Review of Reports and Doctor Consultation',
      'Personalized & Sustainable Programs',
      'End-to-End Support and Guidance',
    ],
    weeklyPrice: 1100,
    pricing: [
      { id: 2, name: '24 Weeks', week: 24, price: 24499 },
      { id: 3, name: '52 Weeks', week: 52, price: 47499 },
    ]
  },
];

export default function PlanDetails() {
  const { Razorpay } = useRazorpay();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { slug } = useParams() || { slug: 'obesity-weight-management' };
  const contentRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const [showBookConForm, setShowBookConForm] = useState(false);
  const scrollContentRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const trackWrapper = React.useRef(null);
  const plan = plansData.find((p) => p.slug === slug);
  const defaultPricing = plan?.pricing || [
    { id: 1, name: '12 Weeks', week: 12, price: 999 },
    { id: 2, name: '24 Weeks', week: 24, price: 1799 },
    { id: 3, name: '52 Weeks', week: 52, price: 2999 },
  ];

  const addOnData = [
    {
      title: 'Add Full Body Checkup - Male',
      description: `Lab tests to evaluate key biomarkers, identify metabolic risks early, and optimise your plan with real data.`,
      price: 5046,
      image: Media.addOnIcons.labTest,
      gstExempt: true,
      pinCodeRequired: true,
      quantifiable: false,
    },
    {
      title: 'Add Full Body Checkup - Female',
      description: `Lab tests to evaluate key biomarkers, identify metabolic risks early, and optimise your plan with real data.`,
      price: 5046,
      image: Media.addOnIcons.labTest,
      gstExempt: true,
      pinCodeRequired: true,
      quantifiable: false
    },
    {
      title: 'Doctor Consultation',
      description: `Personalized doctor consultation to review reports,address concerns, and guide your health journey `,
      price: 1000,
      image: Media.addOnIcons.doctorConsult,
      gstExempt: true,
      pinCodeRequired: false,
      quantifiable: false
    },
    // {
    //   title: 'Family Partner Plan (2 Members)',
    //   description: `Stay consistent together.  Shared goals, better accountability, and support that actually sticks.`,
    //   price: 14500,
    //   image: Media.addOnIcons.familyIcon,
    //   gstExempt: false,
    // },
    {
      title: 'Smart Ring',
      description: `Track sleep, recovery, and readiness.  Because what you do at night impacts everything the next day.`,
      price: 7099,
      image: Media.addOnIcons.smartRing,
      gstExempt: false,
      pinCodeRequired: false,
      quantifiable: true,
    },
    {
      title: 'Smart CGM (Continuous Glucose Monitor)',
      description: `See your glucose in real time.  Understand how your body reacts to food, stress, and lifestyle—instantly.`,
      price: 3500,
      image: Media.addOnIcons.smartCgm,
      gstExempt: false,
      pinCodeRequired: false,
      quantifiable: true,
    },
    {
      title: 'Smart Scale',
      description: `Go beyond weight.  Track body fat, muscle mass, and progress that actually matters.`,
      price: 10500,
      image: Media.addOnIcons.smartScale,
      gstExempt: false,
      pinCodeRequired: false,
      quantifiable: true,
    },
    {
      title: 'Smart BP Monitor',
      description: `Manage,monitor and improve your blood pressure naturally.Undertand how your BP reacts to sleep, stress and lifestyle habits instantly.`,
      price: 2749,
      image: Media.addOnIcons.familyIcon,
      gstExempt: false,
      pinCodeRequired: false,
      quantifiable: true,
    },
  ];

  const steps = [
    {
      title: 'RESET',
      subtitle: 'Build awareness and understand \nyour body better.',
      tableList: [
        'Establish baseline health\nmarkers',
        'Track food, glucose, activity & \nlifestyle patterns',
        'Identify metabolic risks and \nhabit triggers',
        'Create a personalised health \nfoundation',
      ],
    },
    {
      title: 'REBALANCE',
      subtitle: 'Improve energy, habits, and metabolic function.',
      tableList: [
        'Reduce cravings and improven\nconsistency',
        'Support fat loss and waist\nreduction',
        'Improve sleep, activity, and\nrecovery',
        'Enhance insulin sensitivity &\noverall health markers',
      ],
    },
    {
      title: 'RENEW',
      subtitle: 'Turn healthy changes into a sustainable lifestyle.',
      tableList: [
        'Maintain long-term metabolic\nhealth',
        'Improve strength, energy, and\ndaily performance',
        'Build habits designed to\nlast',
        'Reduce future lifestyle health\nrisks',
      ],
    },
  ];

  const gridPlans = [
    {
      title: 'Type-2 Diabetes &\nPre-Diabetes Care',
      description: `Regulate blood sugar levels and reduce or eliminate medications, including insulin, through our diabetes reversal program.`,
      slug: 'diabetes-metabolic-health',
    },
    {
      title: 'Heart Health, Blood Pressure & Cholesterol Care',
      description: `Manage blood pressure naturally and support long-term heart health without medications.`,
      slug: 'heart-health-hypertension',
    },
    {
      title: 'Liver Health (Fatty \nLiver)',
      description: `Reverse fatty liver and improve liver function with clinically proven lifestyle and nutrition strategies.`,
      slug: 'fatty-liver',
    },
    {
      title: 'Muscle, Strength & \nMobility Care',
      description: `Build lean muscle, boost strength, and move better with science-backed fitness and nutrition designed to help you perform at your best.`,
      slug: 'muscle-gain-strength',
    },
    {
      title: 'PCOS & Hormonal Disbalance',
      description: `Address PCOS, thyroid concerns, and other hormonal disbalances for better overall well-being.`,
      slug: 'pcos-pcod-care',
    },
    {
      title: 'Weight Loss & Healthy Living',
      description: `Achieve sustainable fat loss with personalized plans that protect muscle and support long-term weight management.`,
      slug: 'obesity-weight-management',
    },
  ];

  const firstBorderStyleMapping = {
    0: {
      borderBottomWidth: '1px',
      borderRightWidth: '1px',
      borderImage: 'linear-gradient(0deg, #000000, #00000010) 1',
    },
    1: {
      borderBottomWidth: '1px',
      borderRightWidth: '1px',
      borderImage: 'linear-gradient(0deg, #000000, #00000010) 1',
    },
    2: { borderBottomWidth: '1px', borderImage: 'linear-gradient(0deg, #000000, #00000010) 1' },
  };

  const secondBorderStyleMapping = {
    0: { borderRightWidth: '1px', borderImage: 'linear-gradient(180deg, #000000, #00000010) 1' },
    1: { borderRightWidth: '1px', borderImage: 'linear-gradient(180deg, #000000, #00000010) 1' },
  };

  const [selectedAddOns, setSelectedAddOns] = React.useState([]);
  const [isPincodeDialogOpen, setIsPincodeDialogOpen] = React.useState(false);
  const [tempAddOn, setTempAddOn] = React.useState(null);
  const [pincode, setPincode] = React.useState('');
  const [pincodeError, setPincodeError] = React.useState('');
  const [pincodeLoading, setPincodeLoading] = React.useState(false);

  const handlePincodeCheck = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError('Please enter a valid 6-digit pincode.');
      return;
    }
    setPincodeLoading(true);
    setPincodeError('');
    try {
      const response = await axios.post(`${BASE_URL_APP}/healtians/pincode-servicable`, {
        pincode: pincode,
      });

      console.log(response)

      if (response.data.data?.serviceable) {
        showToast('Pincode is serviceable!', 'success');
        setSelectedAddOns((prev) => [...prev, tempAddOn]);
        setIsPincodeDialogOpen(false);
      } else {
        const errorMsg = response.data?.message || 'Pincode is not serviceable for this location.';
        setPincodeError(errorMsg);
        showToast(errorMsg, 'error');
      }
    } catch (error) {
      console.error('Error verifying pincode availability:', error);
      setPincodeError('Failed to check pincode. Please try again.');
      showToast('Error checking pincode availability.', 'error');
    } finally {
      setPincodeLoading(false);
    }
  };

  const [selectedWeeklyPlan, setSelectedWeeklyPlan] = React.useState(defaultPricing[0]);
  const [payMentLoading, setPayMentLoading] = React.useState(false);
  const [userDialogOpen, setUserDialogOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    name: '',
    email: '',
    contact: '',
  });
  const payment = React.useCallback(() => {
    console.log('Selected Add Ons:', selectedAddOns);
    const GST = 0.18; // 18% GST
    const weekDuration = selectedWeeklyPlan.week;
    const planPriceWithoutGST = selectedWeeklyPlan.price || (plan.weeklyPrice * weekDuration);
    const planPriceWithGST = planPriceWithoutGST;

    let addOnPrice = 0;
    let addOnPriceWithGST = 0;
    selectedAddOns.forEach((addOn) => {
      const price = addOn.price;
      addOnPrice += price;
      addOnPriceWithGST += price;
    });

    const totalAmount = Math.round(planPriceWithGST + addOnPriceWithGST);
    return {
      weekDuration,
      planPriceWithoutGST,
      planPriceWithGST,
      addOnPrice,
      addOnPriceWithGST,
      totalAmount,
    };
  }, [plan, selectedAddOns, selectedWeeklyPlan]);

  // console.log('Payment Details:', payment());
  const paymentDetails = payment();

  const paymentHandler = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.contact) {
      showToast('Please fill in all user details', 'error');
      return;
    }
    const payload = {
      name: userDetails.name,
      phoneNumber: userDetails.contact,
      amount: paymentDetails.totalAmount,
      additionalData: {
        planDetails: {
          title: plan.title,
          slug: plan.slug,
          weeklyPlan: selectedWeeklyPlan,
          addOns: selectedAddOns.map((addOn) => ({
            title: addOn.title,
            price: addOn.price,
            gstExempt: addOn.gstExempt,
          })),
        },
        paymentDetails,
      },
    };
    try {
      setPayMentLoading(true);
      setUserDialogOpen(false);
      const orderData = await createOrder(paymentDetails.totalAmount, 'INR', payload);
      const amount = orderData?.data?.amount;
      const orderId = orderData?.data?.orderId;
      const paymentRecordId = orderData?.data?.paymentRecordId;
      await handlePayment({
        Razorpay: Razorpay,
        amount: amount,
        currency: 'INR',
        order_id: orderId,
        name: userDetails.name,
        userName: userDetails.name,
        userEmail: userDetails.email,
        userContact: `+91${userDetails.contact}`,
        handlePayment: async (response) => {
          try {
            console.log('Verifying payment with response:', response);
            const rzOrderId = response.razorpay_order_id;
            const rzPaymentId = response.razorpay_payment_id;
            const rzSignature = response.razorpay_signature;
            const verifyRes = await verifyPayment(rzOrderId, rzPaymentId, rzSignature);
            console.log('Payment verification response:', verifyRes);
          } catch (error) {}
        },
      });

      showToast('Order created successfully. proceed to payment.', 'success');
      console.log('Order Data:', orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      showToast('Error creating order. Please try again.', 'error');
      throw error;
    } finally {
      setPayMentLoading(false);
    }
  };

  const processedHeading = plan.heading.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  const processedSubHeading = plan.subHeading.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  useGSAP(
    () => {
      const container = scrollContentRef.current;
      const track = trackRef.current;

      if (!container || !track) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // Calculate the exact distance to move horizontally.
        // It is the total width of all cards combined MINUS the width of the screen.
        // I added 80px to account for the padding on the right side.
        const getScrollAmount = () => track.scrollWidth - window.innerWidth + 80;

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: 'none', // Must be "none" so the scroll speed remains constant
          scrollTrigger: {
            trigger: container,
            start: 'top top', // Starts when the top of the section hits the top of the viewport
            end: () => `+=${getScrollAmount()}`, // The scroll duration matches the horizontal width exactly
            pin: true, // Locks the screen in place
            pinSpacing: true, // IMPORTANT: This pushes the next section down so it waits its turn!
            scrub: 1, // Smooth 1-second catch-up effect
            invalidateOnRefresh: true, // Recalculates if the user resizes their window
          },
        });
      });

      return () => mm.revert();
    },
    { scope: scrollContentRef }
  );

  return (
    <>
      <SEO title={`${plan.title.replace(/\n/g, ' ')} Program`} description={plan.subHeading.replace(/\n/g, ' ')} />
      <div
        ref={sectionRef}
        className="plan-details relative flex min-h-screen w-full flex-col items-start justify-center bg-[#f0efed]"
    >
      <div
        ref={contentRef}
        className="relative flex h-screen w-full items-start justify-center overflow-hidden bg-[#0b0A07]"
      >
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50" />
        <video
          ref={(el) => {
            if (el) el.muted = true;
          }}
          src={plan.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        <img
          src={Media.plans.graph}
          alt="Graph"
          className="absolute bottom-0 left-0 right-0 z-20 w-full scale-105 object-cover"
        />
        <div className="content z-20 flex h-full w-full flex-col items-center justify-center gap-5">
          <div className="flex w-[90%] flex-col items-center justify-center gap-3 text-center md:-mt-10 md:w-[60%]">
            <h1 className="text-center font-[Arima] text-3xl font-bold text-white md:text-5xl md:leading-tight">
              {processedHeading}
            </h1>
            <p className="text-center font-[Inter] text-sm font-light leading-relaxed text-white">
              {processedSubHeading}
            </p>
            <button
              onClick={() => setShowBookConForm(true)}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100"
            >
              {plan.buttonText}
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContentRef}
        className="flex h-auto w-full overflow-visible md:h-screen md:w-[99.9%] md:overflow-hidden"
      >
        <div
          ref={trackWrapper}
          className="flex h-auto w-full flex-col items-center justify-center md:h-full md:items-start"
        >
          <div
            ref={trackRef}
            className="scroll-cards flex h-auto w-full flex-col items-center justify-start gap-10 px-4 py-16 md:h-max md:w-max md:flex-row md:items-start md:gap-4 md:p-10"
          >
            {plan.scrollCards.map((card, index) => (
              <div
                className={`shrink-0 overflow-hidden rounded-lg bg-transparent ${
                  index === 0
                    ? 'w-full md:w-[350px] lg:w-[400px]'
                    : 'w-full max-w-[647px] md:w-[647px]'
                }`}
                key={index}
              >
                {index === 0 ? (
                  <div className="h-full w-full rounded-lg bg-transparent">
                    <h2 className="text-lg font-thin text-gray-800">HOW WE WORKS</h2>
                    <h3 className="whitespace-pre-line font-[Arima] text-4xl font-bold text-gray-600">
                      {card}
                    </h3>
                  </div>
                ) : (
                  <img
                    src={card}
                    alt={`Scroll Card ${index + 1}`}
                    style={{
                      borderRadius: '12px',
                      objectFit: 'contain',
                      height: '100%',
                      width: '100%',
                      flexShrink: 0,
                    }}
                    // className="w-full flex-shrink-0 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="item-center relative z-10 w-full overflow-hidden rounded-bl-[32px] rounded-br-[32px]">
        <video
          ref={(el) => {
            if (el) el.muted = true;
          }}
          src={Media.plans.videos.scrollCardBgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full rounded-bl-[32px] rounded-br-[32px] object-cover"
        />
        <div className="overlay absolute inset-0 z-0 bg-black opacity-50" />

        <div className="membership-content w-full overflow-hidden rounded-bl-[32px] rounded-br-[32px] px-4 py-10">
          <div className="content relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-between gap-10 md:flex-row">
            <div className="w-full">
              <div className="mb-6 flex flex-col items-start justify-start">
                <h2 className="text-center font-[Arima] text-2xl font-bold text-white md:text-left md:text-4xl">
                  What's included in your membership
                </h2>
                <p className="text-center font-[Inter] text-sm font-thin text-white md:text-left">
                  Your data, your guidance, your progress — all in one intelligent platform.
                </p>
              </div>
              <div className="grid h-fit w-full flex-col items-start justify-center gap-6 md:justify-start">
                {plan.memPerks.map((perk, index) => (
                  <span
                    key={index}
                    className="flex cursor-pointer items-start gap-4 rounded-full bg-white px-6 py-4 text-sm text-black transition-colors hover:bg-[#ff6b01] hover:text-white"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full justify-center md:flex md:justify-end">
              <img
                src={Media.plans.memberShipPhone}
                alt="Membership Phone"
                className="mx-auto h-auto w-[50%] object-contain md:m-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="planpricing-section mx-auto mt-12 flex w-full max-w-5xl flex-col items-center justify-center px-4 md:px-0">
        <h2 className="font-[Arima] text-2xl font-bold text-black md:text-4xl">The {plan.title}</h2>
        <PlanInclusionPricing
          pricing={plan.pricing || defaultPricing}
          inclusions={plan.includes}
          style={{ marginTop: '2.5rem' }}
          buttonText={`Proceed with ${selectedWeeklyPlan?.week} weeks Program`}
          setSelectedWeeklyPlan={setSelectedWeeklyPlan}
          selectedWeeklyPlan={selectedWeeklyPlan}
          addOnPrice={paymentDetails.addOnPrice}
          totalPrice={paymentDetails.totalAmount}
          forText={plan.forText}
          paymentLoading={payMentLoading}
          paymentHandler={() => {
            addToCart({
              id: plan._id || plan.slug,
              plan,
              selectedWeeklyPlan,
              selectedAddOns,
            });
            navigate('/cart');
          }}
        />
      </div>

      <div className="addon-section mx-auto flex w-full max-w-5xl flex-col justify-center px-4 pt-4 md:px-0">
        <div className="flex h-full w-full flex-col items-center justify-start">
          <div className="flex items-center justify-start gap-4 pt-12 text-left">
            <div className="flex flex-row items-center gap-4">
              <h2 className="text-2xl font-bold text-black"> Add-Ons</h2>
              <span className="text-sm font-thin text-black">(Optional)</span>
            </div>
          </div>
          <div className="justify-items-between mb-20 grid w-full grid-cols-1 items-start justify-center gap-4 pt-8 sm:grid-cols-2">
            {addOnData.map((addOn, index) => (
              <AddOnCards
                key={index}
                name={addOn.title}
                description={addOn.description}
                price={addOn.price}
                // price={`₹${(addOn.gstExempt ? addOn.price : addOn.price * 1.18).toLocaleString()}`}
                image={addOn.image}
                onClick={() => {
                  const exists = selectedAddOns.some((item) => item.title === addOn.title);
                  if (exists) {
                    setSelectedAddOns((prev) => prev.filter((item) => item.title !== addOn.title));
                  } else {
                    if (addOn.pinCodeRequired) {
                      setTempAddOn(addOn);
                      setPincode('');
                      setPincodeError('');
                      setIsPincodeDialogOpen(true);
                    } else {
                      setSelectedAddOns((prev) => [...prev, { ...addOn, pinCode: '' }]);
                    }
                  }
                }}
                gstIncludedText={`${addOn.gstExempt ? '' : `(incl. GST )`}`}
                isActive={selectedAddOns.some((item) => item.title === addOn.title)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="transformation-section mb-20 flex w-full items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center rounded-lg bg-[#fff] px-4 py-10">
          <h2 className="text-center font-[Inter] text-[28px] font-semibold leading-snug tracking-wider text-black md:text-[40px] lg:text-[48px]">
            See Your Health Transformation
          </h2>
          <p className="mt-6 text-center font-[Inter] text-[18px] text-gray-600">
            A structured path toward better metabolic health.
          </p>
          <button
            onClick={() => setShowBookConForm(true)}
            className="mt-4 rounded-full bg-[#ff6b01] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e65a00]"
          >
            Start your Transformation
          </button>

          <div className="my-8 mb-12 flex h-[2px] w-full flex-shrink-0 items-center justify-between bg-[#E5E7EB] md:w-[60%]">
            {['Phase 1', 'Phase 2', 'Phase 3'].map((phase, index) => (
              <div
                className="relative flex w-fit items-center justify-center"
                style={{
                  justifyContent: index === 0 ? 'flex-start' : index === 1 ? 'center' : 'flex-end',
                }}
                key={index}
              >
                <div className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-[#FFF0E5] text-center">
                  <div className="h-[1rem] w-[1rem] rounded-full bg-[#FF6B01]"> </div>
                </div>
                <span
                  className="absolute top-[2rem] font-[Inter] text-[14px] text-gray-600"
                  style={{
                    transform:
                      index === 0
                        ? 'translateX(-10%)'
                        : index === 1
                          ? 'translateX(0)'
                          : 'translateX(15%)',
                  }}
                >
                  {phase}
                </span>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-wrap items-stretch justify-center gap-4 pt-6">
            {steps.map((step, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full flex-col items-start justify-start rounded-[14px] border border-gray-300 bg-[#fff] sm:w-[calc(50%-8px)] lg:w-[25%]"
                >
                  <div className="mb-2 flex w-full flex-col items-start rounded-t-[14px] bg-[#FFF0E5] px-4 py-4">
                    <h3 className="font-[Inter] text-[18px] font-semibold text-black">
                      {step.title}
                    </h3>
                    <p className="whitespace-pre-line font-[Inter] text-[14px] text-gray-600">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="flex h-full w-full rounded-b-[14px] pb-4 pl-4">
                    <ul className="list-disc px-2 font-[Inter] text-[14px] text-gray-600 marker:text-[#FF6B01]">
                      {step.tableList.map((item, idx) => (
                        <li key={idx} className="whitespace-pre-line leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="more-plans-section mb-20 flex w-full items-center justify-center px-4">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-center rounded-[24px] py-6">
          <h2 className="font-[Inter] text-[22px] font-semibold tracking-wider text-black md:text-[32px]">
            Discover more plans, designed by experts.
          </h2>

          <div className="mt-12 flex flex-col items-start justify-start">
            <div className="flex w-full flex-col items-stretch justify-start gap-0 md:flex-row">
              {gridPlans.slice(0, 3).map((plan, index) => (
                <PlansItem
                  key={index}
                  title={plan.title}
                  description={plan.description}
                  route={`/program-details/${plan.slug}`}
                  className="more-plans-item"
                  style={{
                    borderStyle: 'solid',
                    padding: '1.5rem',
                    ...firstBorderStyleMapping[index],
                  }}
                />
              ))}
            </div>

            <div className="flex w-full flex-col items-stretch justify-center gap-0 md:flex-row">
              {gridPlans.slice(3).map((plan, index) => (
                <PlansItem
                  key={index}
                  title={plan.title}
                  description={plan.description}
                  route={`/program-details/${plan.slug}`}
                  className="more-plans-item"
                  style={{
                    ...secondBorderStyleMapping[index],
                    borderStyle: 'solid',
                    padding: '1.5rem',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${orangeBg})` }}
        className="relative flex w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-16 md:py-8"
      >
        <div className="footer-banner-overlay z-2 absolute inset-0 h-full w-full" />

        <div className="z-10 flex flex-col items-center justify-center">
          <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[50px]">
            Need help finding the right coach?
          </h2>
          {/* <div className="flex items-center justify-center">
                          <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[63px]">
                            Your
                          </h2>
                          <img
                            src={Media.header.mytwinWhite}
                            alt="MyTwin Logo"
                            className="mx h-12 w-auto translate-y-1"
                          />
                          <h2 className="text-center font-[Arima] text-[40px] font-semibold leading-tight text-white md:text-[63px]">
                            Health
                          </h2>
                        </div> */}
          <p className="max-w-2xl text-center font-[Inter] text-[14px] font-extralight leading-[28px] text-white md:text-lg">
            Request a callback to get your queries answered
          </p>

          <button
            onClick={() => setShowBookConForm(true)}
            className="mt-4 rounded-full border-2 border-[#ffffff40] bg-white px-6 py-2 font-[Inter] font-bold text-[#2F387F] transition-colors hover:border-[#ffffffcc] hover:bg-gray-200 md:text-sm"
          >
            Talk to MyTwin Expert
          </button>
        </div>
      </div>

      <BookConsultationModal isOpen={showBookConForm} onClose={() => setShowBookConForm(false)} />

      <Dialog isOpen={isPincodeDialogOpen} onClose={() => setIsPincodeDialogOpen(false)}>
        <div className="flex w-[90vw] max-w-[450px] flex-col items-center justify-center rounded-lg bg-white p-6">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="font-[Arima] text-xl font-bold text-black">Check Serviceability</h3>
            <button
              onClick={() => setIsPincodeDialogOpen(false)}
              className="text-gray-500 transition-colors hover:text-black"
            >
              ✕
            </button>
          </div>

          <p className="mb-6 text-center font-[Inter] text-sm text-gray-600">
            Enter your pincode to check if{' '}
            <span className="font-semibold text-[#FF6B01]">{tempAddOn?.title}</span> is available in
            your location.
          </p>

          <div className="flex w-full flex-col gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter 6-digit pincode"
                value={pincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  if (val.length <= 6) {
                    setPincode(val);
                    setPincodeError('');
                  }
                }}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 font-[Inter] text-black outline-none focus:border-[#FF6B01] focus:ring-1 focus:ring-[#FF6B01]"
                maxLength={6}
              />
            </div>

            {pincodeError && (
              <p className="w-full text-left font-[Inter] text-xs text-red-500">{pincodeError}</p>
            )}

            <button
              onClick={handlePincodeCheck}
              disabled={pincodeLoading || pincode.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B01] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e65a00] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {pincodeLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Checking...
                </>
              ) : (
                'Check Availability'
              )}
            </button>
          </div>
        </div>
      </Dialog>

      <Footer />

      <Dialog isOpen={userDialogOpen} onClose={() => setUserDialogOpen(false)}>
        <div className="flex w-[95vw] flex-col items-center justify-center md:h-[50vh] md:w-[70vw] md:flex-row">
          <div className="flex h-full w-full flex-col items-start justify-start gap-2 rounded-t-lg bg-white px-6 py-4 md:w-1/2 md:rounded-l-lg md:rounded-tr-none">
            <h3 className="text-md font-semibold text-[#FF6B01]">Order Details</h3>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <div className="flex w-full items-center justify-between">
                <span className="shrink-0 text-sm font-medium text-gray-500">Plan:</span>
                <span className="text-sm font-semibold text-gray-800">{plan.title}</span>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="shrink-0 text-sm font-medium text-gray-500">Duration:</span>
                <span className="text-sm font-semibold text-gray-800">
                  {paymentDetails.weekDuration} weeks
                </span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="flex w-full flex-col gap-1">
                  <span className="shrink-0 text-sm font-medium text-gray-500">Add-Ons:</span>
                  <div className="flex flex-col gap-1 pl-4">
                    {selectedAddOns.map((addOn, idx) => (
                      <span key={idx} className="text-sm font-semibold text-gray-800">
                        • {addOn.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <hr className="my-2 w-full border-t border-gray-300" />
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <h3 className="text-md font-semibold text-[#FF6B01]">Price Breakdown</h3>
                <div className="flex w-full items-center justify-between">
                  <span className="shrink-0 text-sm font-medium text-gray-500">
                    Plan Price (incl. GST):
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    ₹{paymentDetails.planPriceWithGST.toLocaleString()}
                  </span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex w-full items-center justify-between">
                    <span className="shrink-0 text-sm font-medium text-gray-500">
                      Add-Ons Price (incl. GST):
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      ₹{paymentDetails.addOnPriceWithGST.toLocaleString()}
                    </span>
                  </div>
                )}
                <hr className="my-2 w-full border-t border-gray-300" />
                <div className="flex w-full items-center justify-between">
                  <span className="shrink-0 text-sm font-medium text-gray-500">Total Amount:</span>
                  <span className="text-sm font-semibold text-gray-800">
                    ₹{paymentDetails.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-around gap-2 rounded-b-lg bg-[#FF6B01] px-6 py-4 md:w-1/2 md:rounded-r-lg md:rounded-bl-none">
            <div className="align-center flex h-full w-full flex-col items-start justify-start gap-2">
              <h2 className="text-md mb-4 text-center font-semibold text-white">
                Enter Your Details
              </h2>
              <Input
                style={{ backgroundColor: 'transparent', color: '#fff' }}
                type="text"
                placeholder="Name"
                onChange={(e) => {
                  const nameValue = e.target.value.replace(/[^A-Za-z ]/g, ''); // Remove any non-alphabetic characters
                  setUserDetails({ ...userDetails, name: nameValue });
                }}
                value={userDetails.name}
                className="mb-4"
                pattern="[A-Za-z ]+"
                required={true}
                maxLength={50}
              />
              <Input
                style={{ backgroundColor: 'transparent', color: '#fff' }}
                type="email"
                placeholder="Email"
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                value={userDetails.email}
                className="mb-4"
                maxLength={100}
              />
              <div className="align-center flex w-full items-center justify-start gap-2">
                <span className="border-b border-white py-1 pl-2 text-white">+91</span>
                <Input
                  style={{ backgroundColor: 'transparent', color: '#fff' }}
                  type="text"
                  placeholder="Contact"
                  onChange={(e) => {
                    const contactValue = e.target.value.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
                    setUserDetails({ ...userDetails, contact: contactValue });
                  }}
                  value={userDetails.contact}
                  // className="mb-4"
                  pattern="[0-9]{10}"
                  required={true}
                  maxLength={10}
                />
              </div>
            </div>
            <Button
              style={{
                backgroundColor: '#fff',
                color: '#FF6B01',
                borderRadius: '9999px',
                padding: '0.75rem 2.5rem',
              }}
              onClick={paymentHandler}
              className="mb-4 mt-4 px-6 text-sm font-semibold transition-colors hover:bg-gray-100"
              text="Continue to Payment"
            />
          </div>
        </div>
      </Dialog>
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918369255417"
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 z-[999] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          className="h-7 w-7"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 496l133.9-35.1c32.7 17.8 69.4 27.2 107 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 445.2c-33.2 0-65.7-8.9-94-25.7l-6.7-4-79.8 20.9 21.3-77.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.7-186.6 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-16 origin-right scale-0 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl transition-all duration-300 group-hover:scale-100">
          Chat with us!
        </span>
      </a>
    </div>
    </>
  );
}

const PlansItem = ({ title = '', description = '', route = '', style, className = '' }) => {
  return (
    <div
      className={`flex-items-stretch flex w-full flex-col items-stretch justify-start gap-4 py-4 pr-2 ${className}`}
      style={style}
    >
      <div className="h-full w-full gap-4">
        <h3 className="whitespace-pre-line font-[Inter] text-base font-semibold text-black">
          {title}
        </h3>
        <p className="whitespace-pre-line font-[Inter] text-xs text-[#00000090]">{description}</p>
      </div>
      <a
        href={route}
        className="w-fit rounded-full border-[2px] border-[#fff44] bg-[#dbd8d7] px-4 py-2 font-[Inter] text-xs text-[#000]"
      >
        Check Now <ChevronRight className="inline-block" />
      </a>
      {/* <Link
        to={route}
        // onClick={(e) => {
        //   window.scrollTo({ top: 0, behavior: 'smooth' });
        // }}
        className="w-fit rounded-full border-[2px] border-[#fff44] bg-[#dbd8d7] px-4 py-2 font-[Inter] text-[14px] text-[#000]"
      >
        Check Now <ChevronRight className="inline-block" />
      </Link> */}
    </div>
  );
};
