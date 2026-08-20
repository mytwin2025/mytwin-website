import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, Diamond } from 'lucide-react';
import { handlePayment, createOrder, verifyPayment } from '../utils/handlePayment';
import { useRazorpay } from 'react-razorpay';
import { showToast } from './Toast';
import makeApiCall from '../utils/makeApiCall';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';

const features = [
  {
    title: 'Personalised Action Programs only for you',
    desc: 'Personalized nutrition,activity,sleep and stress management consultation including balanced diet plans,strength training programs, and weekly guidance.',
  },
  {
    title: 'Accountability,Progress Tracking and Continuous Monitoring',
    desc: 'Your health coach will schedule in-depth weekly video calls at a time that suits your schedule to discuss your weekly health progress',
  },
  {
    title: 'Early Interventions,Continuous Support & Personalised Guidance',
    desc: 'Your health coach is always just a phone call or message away (Sundays closed).',
  },
  {
    title: 'Experts led Clinically Guided Action Programs and Evidence based Outcomes',
    desc: 'Members will begin noticing improvements in their energy levels, sleep quality, physical activity,biomarkers performance and overall well-being within the first 8-10 weeks.',
  },
];

export default function CoachCheckoutModal({
  isOpen,
  onClose,
  selectedPlanObj,
  selectedDuration,
  selectedPlanDetails,
  selectedAddOns = [],
  coachData,
  formatPrice,
}) {
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [payMentLoading, setPayMentLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { setIsHeaderVisible } = useHeader();

  useEffect(() => {
    if (isOpen) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    return () => setIsHeaderVisible(true);
  }, [isOpen, setIsHeaderVisible]);

  if (!isOpen) return null;

  const handleSendOtpClick = async () => {
    setIsSendingOtp(true);
    try {
      const fullMobile = '+91' + contact;
      const response = await makeApiCall('auth/otp-sender', 'POST', { mobile: fullMobile });
      if (response.status === 200) {
        showToast('OTP sent successfully to ' + contact, 'success');
        setShowOtpInput(true);
      } else {
        showToast(response.data?.message || 'Failed to send OTP', 'error');
      }
    } catch (error) {
      showToast(error?.response?.data?.message || 'Failed to send OTP', 'error');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtpClick = async () => {
    if (otp.length < 4) {
      showToast('Please enter a valid OTP', 'error');
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const fullMobile = '+91' + contact;
      const response = await makeApiCall('auth/otp-verify', 'POST', {
        mobile: fullMobile,
        otp,
        fcmToken: 'web',
      });

      if (response.status === 200) {
        showToast('Mobile number verified successfully!', 'success');
        setIsPhoneVerified(true);
        setShowOtpInput(false);
      } else {
        showToast(response.data?.message || 'OTP verification failed', 'error');
      }
    } catch (error) {
      showToast(error?.response?.data?.message || 'OTP verification failed', 'error');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleCheckout = async () => {
    if (!name.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!contact.trim() || contact.length < 10) {
      showToast('Please enter a valid 10-digit phone number', 'error');
      return;
    }
    if (!isPhoneVerified) {
      showToast('Please verify your mobile number before proceeding', 'error');
      return;
    }

    const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
    const finalTotalAmount = selectedPlanDetails.total + addOnsTotal;

    const payload = {
      name,
      phoneNumber: contact,
      amount: finalTotalAmount,
      additionalData: {
        plans: [
          {
            title: selectedPlanObj?.title,
            slug: selectedPlanObj?.slug,
            duration: selectedDuration,
            price: selectedPlanDetails?.total,
            addOns: selectedAddOns.length > 0 ? selectedAddOns.map(a => ({ title: a.title, price: a.price })) : [],
          }
        ],
        coachDetails: coachData || {},
      },
    };

    try {
      setPayMentLoading(true);
      const orderData = await createOrder(finalTotalAmount, 'INR', payload);
      const amount = Math.round(finalTotalAmount * 100);
      const orderId = orderData?.razorpay_order_id || orderData?.data?.orderId;

      await handlePayment({
        Razorpay: Razorpay,
        amount: amount,
        currency: 'INR',
        order_id: orderId,
        name: name,
        userName: name,
        userEmail: email,
        userContact: `+91${contact}`,
        handlePayment: async (response) => {
          try {
            const rzOrderId = response.razorpay_order_id;
            const rzPaymentId = response.razorpay_payment_id;
            const rzSignature = response.razorpay_signature;
            await verifyPayment(rzOrderId, rzPaymentId, rzSignature);
            showToast('Payment successful!', 'success');
            onClose();
            navigate(-1);
          } catch (error) {
            console.error('Payment verification failed:', error);
            showToast('Payment verification failed. Please contact support.', 'error');
          }
        },
      });

      showToast('Order initiated. Proceed to payment.', 'success');
    } catch (error) {
      console.error('Error creating order:', error);
      showToast('Error creating order. Please try again.', 'error');
    } finally {
      setPayMentLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all sm:p-6">
      <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        {/* Left Side: Plan Summary & Benefits */}
        <div className="w-full border-b border-gray-200 bg-gray-50 p-6 sm:p-8 md:w-1/2 md:border-b-0 md:border-r md:overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                Plan Summary
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-gray-900 leading-tight">
                {selectedPlanObj?.title.replace(/\n/g, ' ')}
              </h2>
              <span className="mt-1 text-sm font-semibold text-[#2F387F]">
                {selectedDuration} Duration
              </span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-500">Total Amount</span>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatPrice(selectedPlanDetails?.total + selectedAddOns.reduce((acc, curr) => acc + curr.price, 0))}
                  </span>
                  <span className="mb-1 text-sm text-gray-500">
                    ({formatPrice(selectedPlanDetails?.price, true)} incl. 18% GST {selectedAddOns.length > 0 ? '+ Add-Ons' : ''})
                  </span>
                </div>
              </div>
            </div>

            {selectedAddOns.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-bold text-gray-900">Selected Add-Ons:</h3>
                <div className="flex flex-col gap-2">
                  {selectedAddOns.map((addon, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm border border-gray-100">
                      <span className="text-sm font-medium text-gray-700">{addon.title}</span>
                      <span className="text-sm font-bold text-gray-900">₹{addon.price.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-gray-900">Benefits included:</h3>
              <div className="flex flex-col gap-4">
                {features.map((item, idx) => (
                  <div className="flex gap-3" key={idx}>
                    <Diamond className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-900">{item.title}</span>
                      <span className="text-xs text-gray-600 leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Checkout Form */}
        <div className="w-full p-6 sm:p-8 md:w-1/2 md:overflow-y-auto">
          <h3 className="border-b border-gray-100 pb-4 font-[Arima] text-xl font-bold text-gray-900 md:text-2xl">
            Your Details
          </h3>
          <div className="mt-6 flex flex-col gap-5 font-[Inter]">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                <span>Phone Number</span>
                {isPhoneVerified && (
                  <span className="flex items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                    <Check size={12} /> Verified
                  </span>
                )}
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex flex-1">
                  <span className="flex items-center justify-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={contact}
                    disabled={isPhoneVerified}
                    onChange={(e) => {
                      setContact(e.target.value.replace(/\D/g, ''));
                      setIsPhoneVerified(false);
                      setShowOtpInput(false);
                    }}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full rounded-r-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none disabled:opacity-70"
                  />
                </div>
                {!isPhoneVerified && (
                  <button
                    type="button"
                    disabled={contact.length !== 10 || isSendingOtp}
                    onClick={handleSendOtpClick}
                    className="flex w-full sm:w-28 shrink-0 items-center justify-center rounded-xl bg-orange-100 py-3 sm:py-0 px-3 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-200 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    {isSendingOtp ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : showOtpInput ? (
                      'Resend OTP'
                    ) : (
                      'Verify'
                    )}
                  </button>
                )}
              </div>
              {showOtpInput && !isPhoneVerified && (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-orange-50 p-3">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full max-w-[200px] rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm tracking-widest focus:outline-none focus:ring-1 focus:ring-orange-500"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtpClick}
                    disabled={otp.length < 4 || isVerifyingOtp}
                    className="flex-0 flex h-full min-h-[38px] items-center justify-center rounded-lg bg-[#ff6b01] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e65a00] disabled:opacity-70"
                  >
                    {isVerifyingOtp ? <Loader2 size={16} className="animate-spin" /> : 'Verify OTP'}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleCheckout}
                disabled={payMentLoading || !isPhoneVerified || !termsAccepted}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {payMentLoading && <Loader2 size={16} className="animate-spin" />}
                Pay & Enroll
              </button>
              <div className="mt-3 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                  }}
                  className="mt-0.5 cursor-pointer rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="terms" className="cursor-pointer font-[Inter] text-[10px] leading-snug text-gray-500">
                  By continuing, you acknowledge that you have read, understood, and agree to the
                  MyTwin{' '}
                  <a
                    href="/terms-and-conditions"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                  . I hereby consent to receive calls/messages from MyTwin experts.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
