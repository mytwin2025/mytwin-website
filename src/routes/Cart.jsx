import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handlePayment, createOrder, verifyPayment } from '../utils/handlePayment';
import { useRazorpay } from 'react-razorpay';
import { showToast } from '../components/Toast';
import { ShieldCheck, ArrowLeft, Loader2, Calendar, Clock, Check, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { validateCoupon } from '../api/coupon.api';
import makeApiCall from '../utils/makeApiCall';
import SEO from '../components/SEO';

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

  const { cartItems, removeFromCart, updateCartItem, clearCart } = useCart();
  const { isAuthenticated, openLogin, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [payMentLoading, setPayMentLoading] = useState(false);

  const [pincode, setPincode] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [addressState, setAddressState] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [consentedCalls, setConsentedCalls] = useState(false);

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  // OTP state
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      setCouponLoading(true);
      const response = await validateCoupon({ code: couponCode, orderValue: totals.totalAmount });
      const data = response?.data?.data || response?.data;
      if (data && data.discountAmount !== undefined) {
        setAppliedCoupon(data);
        showToast('Coupon applied successfully!', 'success');
      } else {
        showToast('Invalid coupon code.', 'error');
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err?.response?.data?.message || 'Failed to apply coupon';
      showToast(errorMsg, 'error');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

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

  React.useEffect(() => {
    if (isAuthenticated && user) {
      setName(user.name || '');
      setEmail(user.email || '');
      if (user.mobile) {
        setContact(user.mobile.replace('+91', ''));
      }
    }
  }, [isAuthenticated, user]);

  const getNext7Days = () => {
    const days = [];
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        formatted: d.toISOString().split('T')[0],
        dayName: weekday[d.getDay()],
        dateNum: d.getDate(),
        month: monthNames[d.getMonth()],
      });
    }
    return days;
  };

  const morningSlots = [
    '06:00 AM - 07:00 AM',
    '07:00 AM - 08:00 AM',
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
  ];

  const eveningSlots = [
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
    '08:00 PM - 09:00 PM',
    '09:00 PM - 10:00 PM',
  ];

  // Calculate pricing (matching PlanDetails)
  const GST = 0.18; // 18% GST

  const totals = React.useMemo(() => {
    let tPlanPriceWithoutGST = 0;
    let tPlanPriceWithGST = 0;
    let tAddOnPrice = 0;
    let tAddOnPriceWithGST = 0;

    cartItems.forEach((item) => {
      if (item.type === 'lab_test') {
        tPlanPriceWithoutGST += item.planPrice;
        tPlanPriceWithGST += item.planPrice; // lab test prices are generally final
        return;
      }

      if (!item.plan || !item.selectedWeeklyPlan) return;
      const weekDuration = item.selectedWeeklyPlan.week;
      const priceWoGST = item.plan.weeklyPrice * weekDuration;
      const priceWGST = priceWoGST;

      tPlanPriceWithoutGST += priceWoGST;
      tPlanPriceWithGST += priceWGST;

      (item.selectedAddOns || []).forEach((addOn) => {
        const qty = addOn.quantifiable ? (addOn.quantity || 1) : 1;
        const price = addOn.price * qty;
        tAddOnPrice += price;
        tAddOnPriceWithGST += price;
      });
    });

    return {
      planPriceWithoutGST: tPlanPriceWithoutGST,
      planPriceWithGST: tPlanPriceWithGST,
      addOnPrice: tAddOnPrice,
      addOnPriceWithGST: tAddOnPriceWithGST,
      totalAmount: Math.round(tPlanPriceWithGST + tAddOnPriceWithGST),
    };
  }, [cartItems]);

  const { planPriceWithoutGST, planPriceWithGST, addOnPrice, addOnPriceWithGST, totalAmount } =
    totals;
  const finalTotalAmount = appliedCoupon ? appliedCoupon.finalAmount : totalAmount;

  // If no cart items exist, show empty cart view
  if (cartItems.length === 0) {
    return (
      <>
      <SEO title="Checkout Cart" description="Complete your enrollment in a MyTwin care program or diagnostic test." />
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-32">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-gray-400">Please choose a membership plan to proceed.</p>
        </div>
        <button
          onClick={() => navigate('/care-programs')}
          className="cursor-pointer rounded-full bg-[#ff6b01] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e65a00]"
        >
          View Programs
        </button>
      </div>
      </>
    );
  }

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
    if (!pincode.trim() || pincode.length !== 6) {
      showToast('Please enter a valid 6-digit pincode', 'error');
      return;
    }
    if (!houseNo.trim()) {
      showToast('Please enter your house/flat no.', 'error');
      return;
    }
    if (!street.trim()) {
      showToast('Please enter street / area details', 'error');
      return;
    }
    if (!city.trim()) {
      showToast('Please enter your city', 'error');
      return;
    }
    if (!addressState.trim()) {
      showToast('Please enter your state', 'error');
      return;
    }
    // if (!selectedDate) {
    //   showToast('Please select a preferred date', 'error');
    //   return;
    // }
    // if (!selectedTime) {
    //   showToast('Please select a preferred time slot', 'error');
    //   return;
    // }
    if (!agreedTerms) {
      showToast(
        'Please acknowledge and agree to the Terms & Conditions and Privacy Policy',
        'error'
      );
      return;
    }
    if (!consentedCalls) {
      showToast('Please consent to receive calls/messages from MyTwin', 'error');
      return;
    }

    const paymentDetails = {
      planPriceWithoutGST,
      planPriceWithGST,
      addOnPrice,
      addOnPriceWithGST,
      totalAmount,
    };

    const payload = {
      name,
      phoneNumber: contact,
      amount: finalTotalAmount,
      additionalData: {
        plans: cartItems.map((item) => {
          if (item.type === 'lab_test') {
            return {
              title: item.planTitle || 'Lab Test',
              slug: item.pkgData?.packageId || '',
              type: 'lab_test',
              price: item.planPrice,
              addOns: [],
            };
          }
          return {
            title: item.plan?.title || '',
            slug: item.plan?.slug || '',
            weeklyPlan: item.selectedWeeklyPlan,
            addOns: (item.selectedAddOns || []).map((addOn) => ({
              title: addOn.title,
              price: addOn.price,
              quantity: addOn.quantifiable ? (addOn.quantity || 1) : 1,
              gstExempt: addOn.gstExempt,
            })),
          };
        }),
        paymentDetails,
        addressDetails: {
          pincode,
          houseNo,
          street,
          landmark,
          city,
          state: addressState,
        },
        appointmentDetails: {
          date: selectedDate,
          timeSlot: selectedTime,
        },
        couponCode: appliedCoupon ? appliedCoupon.coupon.code : null,
        discountAmount: appliedCoupon ? appliedCoupon.discountAmount : 0,
      },
    };

    try {
      setPayMentLoading(true);
      const orderData = await createOrder(finalTotalAmount, 'INR', payload);
      console.log('Order Data ', orderData);
      // const amount = orderData?.data?.amount;
      const amount = Math.round(finalTotalAmount * 100);
      const orderId = orderData?.razorpay_order_id || orderData?.data?.orderId;
      const paymentRecordId = orderData?.paymentRecordId || orderData?.data?.paymentRecordId;

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
            console.log('Verifying payment with response:', response);
            const rzOrderId = response.razorpay_order_id;
            const rzPaymentId = response.razorpay_payment_id;
            const rzSignature = response.razorpay_signature;
            const verifyRes = await verifyPayment(rzOrderId, rzPaymentId, rzSignature);
            console.log('Payment verification response:', verifyRes);
            showToast('Payment successful!', 'success');
            clearCart();
            navigate('/');
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
    <>
    <SEO title="Checkout Cart" description="Complete your enrollment in a MyTwin care program or diagnostic test." />
    <div className="flex min-h-screen w-full flex-col justify-start bg-[#f8f9fa] px-4 pb-16 pt-28 text-gray-900 md:px-8 lg:px-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex cursor-pointer items-center gap-2 self-start font-[Inter] text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        <span>Back to Plan</span>
      </button>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: User Details Form (7 cols) */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md md:p-8 lg:col-span-7">
          <h1 className="border-b border-gray-100 pb-4 font-[Arima] text-xl font-bold text-gray-900 md:text-2xl">
            Your Details
          </h1>
          <div className="flex flex-col gap-5 font-[Inter]">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
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
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
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
                  <span className="flex items-center justify-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-4 py-3.5 text-sm font-medium text-gray-500">
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
                    className="w-full rounded-r-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none disabled:opacity-70"
                  />
                </div>
                {!isPhoneVerified && (
                  <button
                    type="button"
                    disabled={contact.length !== 10 || isSendingOtp}
                    onClick={handleSendOtpClick}
                    className="flex w-full sm:w-28 shrink-0 items-center justify-center rounded-xl bg-orange-100 py-3.5 sm:py-0 px-3 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-200 disabled:bg-gray-100 disabled:text-gray-400"
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

            {/* Address Details Section */}
            <div className="flex flex-col gap-5 border-t border-gray-100 pt-6">
              <h3 className="text-md font-[Inter] text-xs font-bold uppercase tracking-wider text-gray-400 text-gray-900">
                Address Details
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="6-digit pincode"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    House / Flat No.
                  </label>
                  <input
                    type="text"
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                    placeholder="Flat 101, building name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Street / Area
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Sector, street name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="Near central park"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Town / City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    State
                  </label>
                  <input
                    type="text"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    placeholder="State"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time Slot Section */}
            <div className="flex flex-col gap-5 border-t border-gray-100 pt-6">
              {/* <h3 className="text-md font-[Inter] text-xs font-bold uppercase tracking-wider text-gray-400 text-gray-900">
                Appointment Schedule
              </h3> */}

              {/* <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <Calendar size={14} className="text-[#ff6b01]" />
                  Select Date
                </label>
                <div className="custom-scrollbar flex gap-3 overflow-x-auto pb-2">
                  {getNext7Days().map((d) => {
                    const isSel = selectedDate === d.formatted;
                    return (
                      <button
                        type="button"
                        key={d.formatted}
                        onClick={() => setSelectedDate(d.formatted)}
                        className={`flex min-w-[70px] cursor-pointer flex-col items-center justify-center rounded-2xl border px-2 py-3.5 transition-all ${
                          isSel
                            ? 'border-[#ff6b01] bg-[#ff6b01] text-white shadow-md'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff6b01]'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                          {d.dayName}
                        </span>
                        <span className="mt-1 text-xl font-bold">{d.dateNum}</span>
                        <span className="mt-0.5 text-[10px] font-semibold">{d.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <Clock size={14} className="text-[#ff6b01]" />
                  Select Time Slot
                </label>

                <div className="flex flex-col gap-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Morning Slots (06:00 AM - 11:00 AM)
                  </h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {morningSlots.map((slot) => {
                      const isSel = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-xs font-semibold transition-all ${
                            isSel
                              ? 'border-[#ff6b01] bg-orange-50 text-[#ff6b01]'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff6b01]'
                          }`}
                        >
                          <span>{slot}</span>
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                              isSel ? 'border-[#ff6b01] bg-[#ff6b01] text-white' : 'border-gray-300'
                            }`}
                          >
                            {isSel && <Check size={10} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Evening Slots (05:00 PM - 10:00 PM)
                  </h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {eveningSlots.map((slot) => {
                      const isSel = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-xs font-semibold transition-all ${
                            isSel
                              ? 'border-[#ff6b01] bg-orange-50 text-[#ff6b01]'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-[#ff6b01]'
                          }`}
                        >
                          <span>{slot}</span>
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                              isSel ? 'border-[#ff6b01] bg-[#ff6b01] text-white' : 'border-gray-300'
                            }`}
                          >
                            {isSel && <Check size={10} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* Right Column: Payment Summary Card (5 cols) */}
        <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-6 font-[Inter] shadow-md md:p-8 lg:col-span-5">
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
              ORDER DETAILS
            </span>

            {/* Cart Items Iteration */}
            {cartItems.map((item) => {
              if (item.type === 'lab_test') {
                return (
                  <div key={item.id} className="mb-2 flex flex-col border-b border-gray-100 pb-2">
                    <div className="flex items-center justify-between gap-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-2.5">
                          <img
                            src={
                              item.image ||
                              'https://cdn-icons-png.flaticon.com/512/9623/9623772.png'
                            }
                            alt={item.planTitle}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-[15px] font-bold leading-tight text-gray-900">
                            {item.planTitle}
                          </span>
                          <span className="mt-0.5 text-[13px] font-medium text-gray-500">
                            Diagnostic Test
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="shrink-0 text-[15px] font-bold text-gray-900">
                          ₹{item.planPrice.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          title="Remove Test"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              const plan = item.plan;
              const selectedWeeklyPlan = item.selectedWeeklyPlan;
              if (!plan || !selectedWeeklyPlan) return null;

              const weekDuration = selectedWeeklyPlan.week;
              const planPriceWithoutGST = plan.weeklyPrice * weekDuration;
              const planPriceWithGST = planPriceWithoutGST;

              return (
                <div key={item.id} className="mb-2 flex flex-col border-b border-gray-100 pb-2">
                  {/* Plan Row */}
                  <div className="flex items-center justify-between gap-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-2.5">
                        <img
                          src={plan.icon}
                          alt={plan.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[15px] font-bold leading-tight text-gray-900">
                          {plan.title.replace(/\n/g, ' ')}
                        </span>
                        <span className="mt-0.5 text-[13px] font-medium text-gray-500">
                          {weekDuration} Weeks Plan
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 text-[15px] font-bold text-gray-900">
                        ₹{planPriceWithGST.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Remove Plan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Add-on Rows for this Plan */}
                  {item.selectedAddOns &&
                    item.selectedAddOns.map((addOn, index) => {
                      const addonPrice = addOn.price;
                      return (
                        <div
                          key={index}
                          className="relative flex items-start gap-4 py-3 pl-4 pr-2 my-1"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-2">
                            <img
                              src={addOn.image}
                              alt={addOn.title}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="flex flex-col text-left flex-1">
                            <div className="flex justify-between items-start w-full">
                              <span className="text-[14px] font-bold leading-tight text-gray-900 pr-8">
                                {addOn.title}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newAddOns = item.selectedAddOns.filter(
                                    (_, idx) => idx !== index
                                  );
                                  updateCartItem(item.id, { selectedAddOns: newAddOns });
                                }}
                                className="absolute right-0 top-2 p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 rounded-full"
                                title="Remove Add-On"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <div className="flex justify-between items-end w-full mt-2">
                              <div className="flex flex-col">
                                <span className="text-[12px] font-medium text-gray-500">
                                  Type: Add-On
                                </span>
                                <span className="mt-0.5 text-[14px] font-bold text-gray-900">
                                  ₹{(addonPrice * (addOn.quantifiable ? (addOn.quantity || 1) : 1)).toLocaleString()}
                                </span>
                              </div>

                              {addOn.quantifiable && (
                                <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-sm">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const currentQty = addOn.quantity || 1;
                                      if (currentQty > 1) {
                                        const newAddOns = [...item.selectedAddOns];
                                        newAddOns[index] = { ...addOn, quantity: currentQty - 1 };
                                        updateCartItem(item.id, { selectedAddOns: newAddOns });
                                      }
                                    }}
                                    className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-l-lg"
                                  >
                                    -
                                  </button>
                                  <span className="px-2 text-[13px] font-semibold text-gray-900">
                                    {addOn.quantity || 1}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const currentQty = addOn.quantity || 1;
                                      const newAddOns = [...item.selectedAddOns];
                                      newAddOns[index] = { ...addOn, quantity: currentQty + 1 };
                                      updateCartItem(item.id, { selectedAddOns: newAddOns });
                                    }}
                                    className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-r-lg"
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

            {/* Add Lab Tests Button */}
            <div className="mb-2 mt-2 flex w-full justify-start">
              <button
                type="button"
                onClick={() =>
                  navigate('/diagnostics?isBookingFlow=true', { state: { isBookingFlow: true } })
                }
                className="rounded-xl border-[2px] border-orange-500 bg-transparent px-4 py-2 text-[14px] font-bold text-orange-500 transition-colors hover:bg-orange-600 hover:text-orange-600 hover:text-white"
              >
                + Add Lab Tests
              </button>
            </div>

            {/* Coupon Code Section */}
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                APPLY COUPON:
              </span>
              {!appliedCoupon ? (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm uppercase text-gray-900 placeholder-gray-400 transition-colors focus:border-[#ff6b01] focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className="flex items-center justify-center rounded-xl bg-[#ff6b01] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50 sm:min-w-[80px] sm:py-2"
                  >
                    {couponLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Apply'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-between gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 items-center gap-2">
                    <Check size={16} className="shrink-0 text-emerald-600" />
                    <span className="truncate text-sm font-bold text-emerald-700">
                      {appliedCoupon.coupon.code} Applied!
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="shrink-0 self-end text-xs font-semibold text-red-500 hover:text-red-600 sm:self-auto"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Shipping Charges */}
            <div className="flex flex-col gap-2 pt-4">
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400">
                SHIPPING CHARGES:
              </span>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-500">Delivery Charges (Domestic)</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
            </div>

            <hr className="my-4 border-t border-gray-100" />

            {/* Total */}
            {appliedCoupon && (
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-500">
                  Discount ({appliedCoupon.coupon.code})
                </span>
                <span className="font-bold text-emerald-600">
                  -₹{appliedCoupon.discountAmount.toLocaleString()}
                </span>
              </div>
            )}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-md font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-gray-900">
                ₹{finalTotalAmount.toLocaleString()}
              </span>
            </div>

            {/* Safe Checkout Banner */}
            <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
              <ShieldCheck size={18} className="shrink-0" />
              <span>Guaranteed and safe checkout</span>
            </div>

            {/* Checkboxes */}
            <div className="mb-5 flex flex-col gap-3 text-xs font-medium text-gray-600">
              <label className="flex cursor-pointer select-none items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 bg-white"
                  style={{ colorScheme: 'light' }}
                />
                <span>
                  By continuing, you acknowledge that you have read, understood, and agree to the{' '}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#ff6b01] hover:underline"
                  >
                    MyTwin Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#ff6b01] hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <label className="flex cursor-pointer select-none items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={consentedCalls}
                  onChange={(e) => setConsentedCalls(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 bg-white"
                  style={{ colorScheme: 'light' }}
                />
                <span>I hereby consent to receive calls/ messages from MyTwin.</span>
              </label>
            </div>

            {/* Proceed to Pay Button */}
            <button
              onClick={handleCheckout}
              disabled={payMentLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#ff6b01] px-6 py-4 font-bold text-white shadow-md transition-all hover:bg-[#e65a00] disabled:opacity-50"
            >
              {payMentLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Proceed to Pay</span>
              )}
            </button>

            {/* Payment brand logos */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex h-8 w-14 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                <span className="text-[10px] font-black italic tracking-wider text-gray-700">
                  UPI
                </span>
              </div>
              <div className="flex h-8 w-14 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                <span className="text-[11px] font-extrabold italic text-[#1a1f71]">VISA</span>
              </div>
              <div className="flex h-8 w-14 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                <span className="text-[10px] font-black italic text-orange-600">RuPay</span>
              </div>
              <div className="flex h-8 w-14 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5">
                <span className="text-[10px] font-bold text-gray-600">G Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
