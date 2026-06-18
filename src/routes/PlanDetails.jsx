import React from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { Media } from '../utils/media';
import { useParams } from 'react-router-dom';
import PlanInclusionPricing from '../components/PlanInclusionPricing';
import AddOnCards from '../components/AddOnCards';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { handlePayment, createOrder, verifyPayment } from '../utils/handlePayment';
import Dialog from '../components/Dialog';
import Input from '../components/Input';
import { showToast } from '../components/Toast';
import { useRazorpay } from 'react-razorpay';
export default function PlanDetails() {
  const { Razorpay } = useRazorpay();
  const { slug } = useParams() || { slug: 'obesity-weight-management' };
  const contentRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const scrollContentRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const trackWrapper = React.useRef(null);
  const pricing = {
    weekPlans: [
      {
        id: 1,
        name: '12 weeks',
        week: 12,
        price: 999,
      },
      {
        id: 2,
        name: '24 weeks',
        week: 24,
        price: 1799,
      },
      { id: 3, name: '52 weeks', week: 52, price: 2999 },
    ],
  };

  const plansData = [
    {
      index: '01',
      title: 'Obesity &\nWeight\nManagement',
      icon: Media.plans.icons.obesityWeightIcon,
      slug: 'obesity-weight-management',
      video: Media.plans.videos.obesityWeightManagementVideo,
      heading: `Fat Loss That Actually \nLasts`,
      subHeading: `No crash diets. No guesswork.  Just structured guidance, smarter habits, and real progress.`,
      buttonText: 'Start Now',
      scrollCards: [
        'Obesity\nManagement Plan',
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
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 1000,
    },
    {
      index: '02',
      title: 'Diabetes &\nMetabolic Health',
      icon: Media.plans.icons.diabetesIcon,
      slug: 'diabetes-metabolic-health',
      video: Media.plans.videos.diabetesMetabolicHealthVideo,
      heading: `Control your sugar. \nBefore it controls you.`,
      subHeading: `Personalised metabolic care designed to help you manage glucose levels, improve energy,  and \nreduce long-term health risks.`,
      buttonText: 'Take Control',
      scrollCards: [
        'Diabetes &\nMetabolic Health Plans',
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
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 980,
    },
    {
      index: '03',
      title: 'PCOS / PCOD\nCare',
      icon: Media.plans.icons.pcosIcon,
      slug: 'pcos-pcod-care',
      video: Media.plans.videos.pcosPcodCareVideo,
      heading: `Balance Your Hormones. \nFeel Like Yourself Again.`,
      subHeading: `Personalised PCOS/PCOD care designed to help you manage weight, regulate cycles,  improve energy, and \nbuild healthier long-term habits.`,
      buttonText: 'Start Your Care',
      scrollCards: [
        'PCOS / PCOD\nCare Plans',
        Media.plans.scrollCards.one,
        Media.plans.scrollCards.two,
        Media.plans.scrollCards.pcosPcodCareCardThree,
        Media.plans.scrollCards.pcosPcodCareCardFour,
      ],
      memPerks: [
        'Hormonal biomarkers monitoring',
        'Hormone supportive plans',
        'Stress & sleep optimisation',
        'Real-time guidance',
        '24/7 access to experts',
      ],
      includes: [
        'Hormonal Balance',
        'Cycle Regulation',
        'Advanced Hormonal, Weight & Metabolic Health Panel',
        'Medical Review of Reports and Doctor Consultation',
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 1250,
    },
    {
      index: '04',
      title: 'Heart Health &\nHypertension',
      icon: Media.plans.icons.heartIcon,
      slug: 'heart-health-hypertension',
      video: Media.plans.videos.heartHealthHypertensionVideo,
      heading: `Support Your Heart. \nManage Your Pressure.`,
      subHeading: `Personalised care designed to help you improve blood pressure, reduce health risks, and  build heart-healthy \nhabits that last.`,
      buttonText: 'Start Your Care',
      scrollCards: [
        'Heart Health &\nHypertension Plans',
        Media.plans.scrollCards.one,
        Media.plans.scrollCards.two,
        Media.plans.scrollCards.heartHealthCardThree,
        Media.plans.scrollCards.heartHealthCardFour,
      ],
      memPerks: [
        'Heart & BP markers monitoring',
        'Heart-healthy plans',
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
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 950,
    },
    {
      index: '05',
      title: 'Muscle Gain &\nStrength',
      icon: Media.plans.icons.muscleIcon,
      slug: 'muscle-gain-strength',
      video: Media.plans.videos.muscleGainStrengthVideo,
      heading: `Build Strength. Build Confidence.`,
      subHeading: `Structured muscle-building plans designed to help you gain lean muscle, improve strength,  and \nrecover smarter without unnecessary fat gain.`,
      buttonText: 'Start Your Journey',
      scrollCards: [
        'Muscle Gain &\nStrength Plans',
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
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 1200,
    },
    {
      index: '06',
      title: 'High\nCholestrol',
      icon: Media.plans.icons.cholesterolIcon,
      slug: 'high-cholesterol',
      video: Media.plans.videos.highCholesterolVideo,
      heading: `Fix your numbers. Fix \nyour risk.`,
      subHeading: `Personalised care designed to help you improve cholesterol levels, reduce health risks, and  \nbuild healthier long-term habits.`,
      buttonText: 'Start Your Journey',
      scrollCards: [
        'HIGH\nCHOLESTEROL Plans',
        Media.plans.scrollCards.one,
        Media.plans.scrollCards.two,
        Media.plans.scrollCards.highCholesterolCardThree,
        Media.plans.scrollCards.highCholesterolCardFour,
      ],
      memPerks: [
        'Lipid markers monitoring',
        'Personalised plan to reduce LDL,TG,TC',
        'Habits based interventions',
        'Real-time guidance',
        '24/7 access to experts',
      ],
      includes: [
        'Reduce LDL & Triglycerides',
        'Increase HDL',
        'Advanced Lipids & Metabolic Health Panel',
        'Medical Review of Reports and Doctor Consultation',
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 900,
    },
    {
      index: '07',
      title: 'FATTY LIVER \n Plans',
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
        'Liver-friendly plan to reduce liver fat',
        'Habits based interventions',
        'Real-time guidance',
        '24/7 access to experts',
      ],
      includes: [
        'Reduce Liver Fat',
        'Improve Enzymes & Restore Liver Health',
        'Advanced Liver & Metabolic Health Panel',
        'Medical Review of Reports and Doctor Consultation',
        'Personalized & Sustainable Plans',
        'End-to-End Support and Guidance',
      ],
      weeklyPrice: 1100,
    },
  ];

  const addOnData = [
    {
      title: 'Book Lab Tests',
      description: `Lab tests to evaluate key biomarkers, identify metabolic risks early, and optimise your plan with real data.`,
      price: 5046,
      image: Media.addOnIcons.labTest,
      gstExempt: true,
    },
    {
      title: 'Doctor Consultation',
      description: `Personalized doctor consultation to review reports,address concerns, and guide your health journey `,
      price: 1000,
      image: Media.addOnIcons.doctorConsult,
      gstExempt: true,
    },
    {
      title: 'Family Partner Plan (2 Members)',
      description: `Stay consistent together.  Shared goals, better accountability, and support that actually sticks.`,
      price: 14500,
      image: Media.addOnIcons.familyIcon,
      gstExempt: false,
    },
    {
      title: 'Smart Ring',
      description: `Track sleep, recovery, and readiness.  Because what you do at night impacts everything the next day.`,
      price: 7099,
      image: Media.addOnIcons.smartRing,
      gstExempt: false,
    },
    {
      title: 'Smart CGM (Continuous Glucose Monitor)',
      description: `See your glucose in real time.  Understand how your body reacts to food, stress, and lifestyle—instantly.`,
      price: 3500,
      image: Media.addOnIcons.smartCgm,
      gstExempt: false,
    },
    {
      title: 'Smart Scale',
      description: `Go beyond weight.  Track body fat, muscle mass, and progress that actually matters.`,
      price: 10500,
      image: Media.addOnIcons.smartScale,
      gstExempt: false,
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
      description: `Regulate blood sugar levels 
and reduce or eliminate 
medications , including insulin
,through our diabetes Reversal Programm`,
      slug: 'diabetes-metabolic-health',
    },
    {
      title: 'Heart Health\nManagement',
      description: `Manage blood Pressure
naturally and Support 
long-term heart health
without medications.`,
      slug: 'heart-health-hypertension',
    },
    {
      title: 'Liver Health (Fatty \nLiver)',
      description: `Reverse fatty liver and improve liver Function with Clinically Proven Lifestyle
& nutrition Strategies`,
      slug: 'fatty-liver',
    },
    {
      title: 'Cholesterol \nManagement',
      description: `Lower bad Cholestrol (LDL) and boost
good Cholestrol (HDL) to support heart 
health naturally.`,
      slug: 'high-cholesterol',
    },
    {
      title: 'PCOS & Harmonal Disbalance',
      description: `Address PCOS , thyroid Concerns and other harmonal Disbalances for better Over all well being .`,
      slug: 'pcos-pcod-care',
    },
    {
      title: 'Weight Loss & Healthy Living.',
      description: `Achieve Sustainable Fat loss with 
Personalized Plans that Protect muscle & Support Long Term Weight management.`,
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

  const [selectedAddOn, setSelectedAddOn] = React.useState(null);
  const [selectedWeeklyPlan, setSelectedWeeklyPlan] = React.useState(pricing.weekPlans[0]);
  const plan = plansData.find((p) => p.slug === slug);
  const [payMentLoading, setPayMentLoading] = React.useState(false);
  const [userDialogOpen, setUserDialogOpen] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    name: '',
    email: '',
    contact: '',
  });
  const payment = React.useCallback(() => {
    console.log('Selected Add On:', selectedAddOn);
    const GST = 0.18; // 18% GST
    const weekDuration = selectedWeeklyPlan.week;
    const planPriceWithoutGST = plan.weeklyPrice * weekDuration;
    const planPriceWithGST = planPriceWithoutGST * (1 + GST);
    const addOnPrice = selectedAddOn ? selectedAddOn.price : 0;
    const addOnPriceWithGST =
      selectedAddOn && !selectedAddOn.gstExempt ? addOnPrice * (1 + GST) : addOnPrice;
    const totalAmount = planPriceWithGST + addOnPriceWithGST;
    return {
      weekDuration,
      planPriceWithoutGST,
      planPriceWithGST,
      addOnPrice,
      addOnPriceWithGST,
      totalAmount,
    };
  }, [plan, selectedAddOn, selectedWeeklyPlan]);

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
          addOn: selectedAddOn
            ? {
                title: selectedAddOn.title,
                price: selectedAddOn.price,
                gstExempt: selectedAddOn.gstExempt,
              }
            : null,
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

  useGSAP(() => {
    const scrollContainer = scrollContentRef.current;
    const track = trackRef.current;
    const content = contentRef.current;
    const trackWrapperElement = trackWrapper.current;
    const section = sectionRef.current;
    if (!scrollContainer || !track || !content || !trackWrapperElement || !section) return;
    const getScrollAmount = () => {
      return track.scrollWidth - trackWrapperElement.clientWidth;
    };
    console.log('Scroll Amount:', getScrollAmount());
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`, // extra range so cards have room
        scrub: 0.5,
        pin: true, // optional: pin the whole section while sequence plays
        invalidateOnRefresh: true,
        // markers: true, // uncomment for debugging
      },
    });

    gsap.set(track, { x: 0 }); // ensure track starts in correct position
    // Step 1: hero slides up
    tl.to(content, {
      y: '-100%',
      opacity: 0.5,
      ease: 'none',
      duration: 1, // portion of the scroll
    });

    // Step 2: cards scroll horizontally
    tl.to(track, {
      x: () => -getScrollAmount() - 20,
      ease: 'none',
      duration: 3, // takes more scroll space than hero
    });
  }, []);

  return (
    <div
      ref={sectionRef}
      className="plan-details relative flex min-h-screen w-full flex-col items-start justify-center bg-[#f0efed]"
    >
      <div
        ref={contentRef}
        className="absolute left-0 right-0 top-0 z-20 m-auto flex h-screen w-full items-start justify-center bg-[#0b0A07]"
      >
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black opacity-50" />
        <video
          src={plan.video}
          autoPlay
          loop
          muted
          playsInline
          poster={plan.video}
          className="absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-full object-cover"
        />

        <img
          src={Media.plans.graph}
          alt="Graph"
          className="absolute bottom-0 left-0 right-0 z-20 m-auto w-full translate-y-[30%] object-cover"
        />
        <div className="content z-20 flex h-full w-full flex-col items-center justify-start gap-5">
          <div className="mt-40 flex w-[60%] flex-col items-center justify-center gap-6 text-center">
            <h2 className="text-center font-[Arima] text-5xl font-bold leading-snug text-white">
              {processedHeading}
            </h2>
            <p className="text-center font-[Inter] text-sm leading-relaxed text-white">
              {processedSubHeading}
            </p>
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-100">
              {plan.buttonText}
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollContentRef} className="flex h-[80vh] w-full">
        <div ref={trackWrapper} className="flex h-full w-full flex-col items-start justify-center">
          <div
            ref={trackRef}
            className="scroll-cards flex h-fit w-max items-start justify-start gap-4"
          >
            {plan.scrollCards.map((card, index) => (
              <div
                className="h-[512px] w-[647px] flex-shrink-0 overflow-hidden rounded-lg bg-transparent"
                key={index}
              >
                {index === 0 ? (
                  <div className="h-full w-full flex-shrink-0 rounded-lg bg-transparent px-8">
                    <h2 className="p-4 text-lg font-thin text-gray-800">HOW WE WORKS</h2>
                    <h3 className="whitespace-pre-line px-4 font-[Arima] text-4xl font-bold text-gray-600">
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

      <div className="item-center relative z-10 h-[80vh] min-h-[80vh] w-full overflow-hidden rounded-bl-[32px] rounded-br-[32px]">
        <video
          src={Media.plans.videos.scrollCardBgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full rounded-bl-[32px] rounded-br-[32px] object-cover"
        />
        <div className="overlay absolute inset-0 z-0 bg-black opacity-50" />

        <div className="membership-content absolute left-0 top-0 h-[100%] w-full overflow-hidden rounded-bl-[32px] rounded-br-[32px]">
          <div className="content relative z-10 flex h-full w-full items-center justify-center px-20">
            <div className="h-full w-full pt-32">
              <div className="mb-6 flex flex-col items-start justify-start">
                <h2 className="font-[Arima] text-4xl font-bold text-white">
                  What's included in your membership
                </h2>
                <p className="text-left font-[Inter] text-sm font-thin text-white">
                  Your data, your guidance, your progress — all in one intelligent platform.
                </p>
              </div>
              <div className="flex grid h-fit w-full flex-col items-start justify-start gap-6">
                {plan.memPerks.map((perk, index) => (
                  <span
                    key={index}
                    className="flex cursor-pointer items-start gap-4 rounded-full bg-white px-6 py-4 text-black transition-colors hover:bg-[#ff6b01] hover:text-white"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
            <div className="h-full w-fit">
              <img
                src={Media.plans.memberShipPhone}
                alt="Membership Phone"
                className="h-full w-full translate-y-12 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="planpricing-section mt-12 flex w-full flex-col items-center justify-center">
        <h2 className="font-[Arima] text-4xl font-bold text-black">The {plan.title}</h2>
        <PlanInclusionPricing
          pricing={pricing.weekPlans}
          inclusions={plan.includes}
          style={{ marginTop: '2.5rem' }}
          setSelectedWeeklyPlan={setSelectedWeeklyPlan}
          selectedWeeklyPlan={selectedWeeklyPlan}
          addOnPrice={selectedAddOn ? selectedAddOn.price : 0}
          totalPrice={paymentDetails.totalAmount}
          paymentLoading={payMentLoading}
          paymentHandler={() => setUserDialogOpen(true)}
        />
      </div>

      <div className="addon-section item-center flex w-full flex-col justify-center pt-4">
        <div className="flex h-full w-full flex-col items-center justify-start">
          <div className="flex w-[70%] items-center justify-start gap-4 pt-12 text-left">
            <div className="flex flex-row items-center gap-4">
              <h2 className="text-2xl font-bold"> Add-Ons</h2>
              <span className="text-sm font-thin text-gray-600">(Optional)</span>
            </div>
          </div>
          <div className="justify-items-between mb-20 grid h-auto w-[70%] grid-cols-2 items-start justify-center gap-4 pt-8">
            {addOnData.map((addOn, index) => (
              <AddOnCards
                key={index}
                name={addOn.title}
                description={addOn.description}
                price={`₹${(addOn.gstExempt ? addOn.price : addOn.price * 1.18).toLocaleString()}`}
                image={addOn.image}
                onClick={() => {
                  if (selectedAddOn && selectedAddOn.title === addOn.title) {
                    setSelectedAddOn(null); // Deselect if the same add-on is clicked again
                  } else {
                    setSelectedAddOn(addOn);
                  }
                }}
                gstIncludedText={`${addOn.gstExempt ? '' : `(incl. GST )`}`}
                isActive={selectedAddOn && selectedAddOn.title === addOn.title}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="transformation-section mb-20 flex w-full items-center justify-center">
        <div className="flex w-[70%] flex-col items-center justify-center rounded-[24px] rounded-lg bg-[#fff] px-4 pb-2 pt-6">
          <h2 className="font-[Inter] text-[48px] font-semibold tracking-wider text-black">
            See Your Health Transformation
          </h2>
          <p className="mt-6 text-center font-[Inter] text-[18px] text-gray-600">
            A structured path toward better metabolic health.
          </p>
          <button className="mt-4 rounded-full bg-[#ff6b01] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e65a00]">
            Start your Transformation
          </button>

          <div className="my-8 mb-12 flex h-[2px] w-[60%] flex-shrink-0 items-center justify-between bg-[#E5E7EB]">
            {['Phase 1', 'Phase 2', 'Phase 3'].map((phase, index) => (
              <div
                className="relative flex w-[4rem] w-fit items-center justify-center"
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

          <div className="flex w-full items-stretch justify-center gap-4 pt-6">
            {steps.map((step, index) => {
              return (
                <div
                  key={index}
                  className="flex w-[25%] flex-col items-start justify-start rounded-[14px] border border-gray-300 bg-[#fff]"
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

      <div className="more-plans-section mb-20 flex w-full items-center justify-center">
        <div className="flex w-[74%] flex-col items-start justify-center rounded-[24px] px-4 py-6">
          <h2 className="font-[Inter] text-[32px] font-semibold tracking-wider text-black">
            Discover more plans, designed by experts.
          </h2>

          <div className="mt-12 flex flex-col items-start justify-start">
            <div className="flex w-full items-stretch justify-start gap-0">
              {gridPlans.slice(0, 3).map((plan, index) => (
                <PlansItem
                  key={index}
                  title={plan.title}
                  description={plan.description}
                  route={`/plan-details/${plan.slug}`}
                  style={{
                    borderStyle: 'solid',
                    padding: '1.5rem',
                    ...firstBorderStyleMapping[index],
                  }}
                />
              ))}
            </div>

            <div className="flex w-full items-stretch justify-center gap-0">
              {gridPlans.slice(3).map((plan, index) => (
                <PlansItem
                  key={index}
                  title={plan.title}
                  description={plan.description}
                  route={`/plan-details/${plan.slug}`}
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

      <Footer />

      <Dialog isOpen={userDialogOpen} onClose={() => setUserDialogOpen(false)}>
        <div className="flex h-[50vh] w-[70vw] items-center justify-center">
          <div className="flex h-full w-1/2 flex-col items-start justify-start gap-2 rounded-l-lg bg-white px-8 py-4">
            <h2 className="text-md font-semibold text-[#FF6B01]">Order Details</h2>
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
              {selectedAddOn && (
                <div className="flex w-full items-center justify-between">
                  <span className="shrink-0 text-sm font-medium text-gray-500">Add-On:</span>
                  <span className="text-sm font-semibold text-gray-800">{selectedAddOn.title}</span>
                </div>
              )}
              <hr className="my-2 w-full border-t border-gray-300" />
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <h2 className="text-md font-semibold text-[#FF6B01]">Price Breakdown</h2>
                <div className="flex w-full items-center justify-between">
                  <span className="shrink-0 text-sm font-medium text-gray-500">
                    Plan Price (incl. GST):
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    ₹{paymentDetails.planPriceWithGST.toLocaleString()}
                  </span>
                </div>
                {selectedAddOn && (
                  <div className="flex w-full items-center justify-between">
                    <span className="shrink-0 text-sm font-medium text-gray-500">
                      Add-On Price (incl. GST):
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
          <div className="flex h-full w-1/2 flex-col items-start justify-around gap-2 rounded-r-lg bg-[#FF6B01] px-8 py-4">
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
    </div>
  );
}

const PlansItem = ({ title = '', description = '', route = '', style }) => {
  return (
    <div
      className="flex-items-stretch flex w-full flex-col items-stretch justify-start gap-4 py-4 pr-2"
      style={style}
    >
      <div className="h-full w-full gap-4">
        <h3 className="whitespace-pre-line font-[Inter] text-[28px] font-semibold leading-[1.2] text-black">
          {title}
        </h3>
        <p className="whitespace-pre-line font-[Inter] text-[14px] text-[#00000090]">
          {description}
        </p>
      </div>
      <a
        href={route}
        className="w-fit rounded-full border-[2px] border-[#fff44] bg-[#dbd8d7] px-4 py-2 font-[Inter] text-[14px] text-[#000]"
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

// /* Button */

// box-sizing: border-box;

// position: absolute;
// height: 44.48px;
// left: 112px;
// right: 1034px;
// top: 412px;

// background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 31.77%), rgba(0, 0, 0, 0.04);
// box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
// border-radius: 26px;
