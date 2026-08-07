import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { plansData } from '../routes/PlanDetails';
import { sendMail } from '../utils/helpers';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';
export default function BookConsultationModal({ isOpen, onClose }) {
  const { setIsHeaderVisible } = useHeader();

  useEffect(() => {
    if (isOpen) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    return () => setIsHeaderVisible(true);
  }, [isOpen, setIsHeaderVisible]);

  const [step, setStep] = useState(1); // 1 = form entry, 'slot_booking' = date/time slot booking, 'success_appointment' = appointment success, 'success_submit' = direct submission success
  const [validationError, setValidationError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [primaryConcern, setPrimaryConcern] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Slot booking states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const ages = [
    '<30',
    '30-34',
    '35-39',
    '40-44',
    '45-49',
    '50-54',
    '55-59',
    '60-64',
    '65-69',
    '70+',
  ];

  const timeSlots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
  ];

  if (!isOpen) return null;

  const getNextAvailableDates = () => {
    const dates = [];
    let current = new Date();
    while (dates.length < 5) {
      if (current.getDay() !== 0) {
        // Skip Sunday (0)
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const validateStep1 = () => {
    if (!name.trim()) {
      setValidationError('Please enter your name.');
      return false;
    }
    if (!age) {
      setValidationError('Please select your age.');
      return false;
    }
    if (!gender) {
      setValidationError('Please select your gender.');
      return false;
    }
    if (!phoneNumber || phoneNumber.length < 10) {
      setValidationError('Please enter a valid 10-digit phone number.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      return false;
    }
    if (!city.trim()) {
      setValidationError('Please enter your city.');
      return false;
    }
    const pinRegex = /^\d{6}$/;
    if (!pinRegex.test(pincode)) {
      setValidationError('Please enter a valid 6-digit pin code.');
      return false;
    }
    if (!primaryConcern) {
      setValidationError('Please select a primary health concern.');
      return false;
    }
    if (!termsAccepted) {
      setValidationError('Please accept the Terms & Conditions and Privacy Policy.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleDirectSubmit = (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setIsSubmitting(true);

    const submitData = {
      name,
      email,
      phone: phoneNumber,
      age,
      gender,
      city,
      pincode,
      primaryConcern,
      type: 'consultation',
      bookingType: 'Direct Submission',
    };

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        Promise.resolve(
          window.grecaptcha.execute('6LfpNkctAAAAAKbhDSnBZcYPt_yzHKxTvlF8K6Ch', {
            action: 'submit_consultation',
          })
        )
          .then(async (token) => {
            await sendMail(submitData);
            setStep('success_submit');
          })
          .catch((err) => {
            setValidationError('Server Error! Please try again.');
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      });
    } else {
      sendMail(submitData)
        .then(() => {
          setStep('success_submit');
        })
        .catch(() => {
          setValidationError('Server Error! Please try again.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const handleBookAppointmentClick = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep('slot_booking');
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDate) {
      setValidationError('Please select a date.');
      return;
    }
    if (!selectedTimeSlot) {
      setValidationError('Please select a time slot.');
      return;
    }
    setValidationError('');
    setIsSubmitting(true);

    const dateStr = selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const submitData = {
      name,
      email,
      phone: phoneNumber,
      age,
      gender,
      city,
      pincode,
      primaryConcern,
      type: 'consultation',
      bookingType: 'Appointment Booked',
      appointmentDate: dateStr,
      appointmentTime: selectedTimeSlot,
    };

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        Promise.resolve(
          window.grecaptcha.execute('6LfpNkctAAAAAKbhDSnBZcYPt_yzHKxTvlF8K6Ch', {
            action: 'submit_consultation',
          })
        )
          .then(async (token) => {
            await sendMail(submitData);
            setStep('success_appointment');
          })
          .catch((err) => {
            setValidationError('Server Error! Please try again.');
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      });
    } else {
      sendMail(submitData)
        .then(() => {
          setStep('success_appointment');
        })
        .catch(() => {
          setValidationError('Server Error! Please try again.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const handleClose = () => {
    setStep(1);
    setName('');
    setEmail('');
    setPhoneNumber('');
    setAge(null);
    setGender('');
    setCity('');
    setPincode('');
    setPrimaryConcern('');
    setSelectedDate(null);
    setSelectedTimeSlot('');
    setValidationError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-[calc(100%-2rem)] max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {step === 1 && (
          <>
            <h2 className="mb-4 font-[Arima] text-2xl font-bold text-orange-500">
              Book A Free <br className="md:hidden" /> Consultation
            </h2>
            <form onSubmit={handleDirectSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                  Name *
                </label>
                <input
                  required
                  type="text"
                  style={{ colorScheme: 'light' }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-1 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                />
              </div>

              {/* Age | Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                    Age *
                  </label>
                  <select
                    required
                    style={{ colorScheme: 'light' }}
                    value={age || ''}
                    onChange={(e) => {
                      setAge(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-1.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  >
                    <option value="" disabled>
                      Select age
                    </option>
                    {ages.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                    Gender *
                  </label>
                  <select
                    required
                    style={{ colorScheme: 'light' }}
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-1.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Phone Number | Email Address */}
              <div className="grid grid-rows-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    style={{ colorScheme: 'light' }}
                    value={phoneNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhoneNumber(val);
                      if (validationError) setValidationError('');
                    }}
                    maxLength={10}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-1 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    style={{ colorScheme: 'light' }}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-1 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
              </div>
              {/* City | Pin Code */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    style={{ colorScheme: 'light' }}
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-1 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                    Pin Code *
                  </label>
                  <input
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    style={{ colorScheme: 'light' }}
                    value={pincode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setPincode(val);
                      if (validationError) setValidationError('');
                    }}
                    maxLength={6}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-1 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              {/* Primary Health Concern */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-1.5 font-[Inter] text-xs font-semibold text-gray-700">
                  Primary Health Concern *
                </label>
                <select
                  required
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-1.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  value={primaryConcern}
                  onChange={(e) => {
                    setPrimaryConcern(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                >
                  <option value="" disabled>
                    Select concern
                  </option>
                  {[
                    ...plansData,
                    {
                      slug: "Don't Know",
                      consultTitle: "Don't Know",
                      title: "Don't Know",
                    },
                  ].map((plan) => (
                    <option key={plan.slug} value={plan.slug}>
                      {plan.consultTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (validationError) setValidationError('');
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

              {validationError && (
                <span className="font-[Inter] text-xs font-medium text-red-500">
                  {validationError}
                </span>
              )}

              <div className="mt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 rounded-lg border border-gray-300 bg-white py-3 font-[Inter] text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? <Loader /> : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleBookAppointmentClick}
                  className="w-1/2 rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98]"
                >
                  Book <br className="md:hidden" /> Appointment
                </button>
              </div>
            </form>
          </>
        )}

        {step === 'slot_booking' && (
          <>
            <h2 className="mb-2 font-[Arima] text-2xl font-bold text-orange-500">
              Select Date & Time
            </h2>
            <p className="mb-4 font-[Inter] text-xs text-gray-500">
              Choose a convenient slot for your video call with our health coach.
            </p>

            <div className="flex flex-col gap-4">
              {/* Date selection */}
              <div>
                <label className="mb-2 block font-[Inter] text-xs font-semibold text-gray-700">
                  Select Date *
                </label>
                <div className="scrollbar-thin flex gap-2 overflow-x-auto pb-2">
                  {getNextAvailableDates().map((date, idx) => {
                    const isSelected =
                      selectedDate && selectedDate.toDateString() === date.toDateString();
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date);
                          if (validationError) setValidationError('');
                        }}
                        className={`flex min-w-[64px] cursor-pointer flex-col items-center justify-center rounded-lg border p-2 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-[9px] font-semibold uppercase text-gray-400">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="my-0.5 text-sm font-black">{date.getDate()}</span>
                        <span className="text-[9px] font-semibold">
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slot selection */}
              <div>
                <label className="mb-2 block font-[Inter] text-xs font-semibold text-gray-700">
                  Select Time Slot *
                </label>
                <div className="grid max-h-[150px] grid-cols-2 gap-2 overflow-y-auto pr-1">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedTimeSlot(slot);
                          if (validationError) setValidationError('');
                        }}
                        className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-[11px] font-semibold transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 text-orange-600 ring-1 ring-orange-500/20'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {validationError && (
                <span className="font-[Inter] text-xs font-medium text-red-500">
                  {validationError}
                </span>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setValidationError('');
                  }}
                  className="w-1/3 cursor-pointer rounded-lg border border-gray-300 bg-white py-3 font-[Inter] text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-[0.98]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleBookAppointment}
                  disabled={isSubmitting}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? <Loader /> : 'Confirm & Book'}
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'success_appointment' && (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 text-green-500">
              <CheckCircle size={64} className="animate-bounce" />
            </div>
            <h2 className="mb-2 font-[Arima] text-2xl font-bold text-gray-900">
              Appointment Booked!
            </h2>
            <p className="mb-6 font-[Inter] text-sm text-gray-600">
              Your consultation request has been received. Our health experts will contact you
              shortly to schedule your session.
            </p>

            <button
              onClick={handleClose}
              className="w-full cursor-pointer rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        )}

        {step === 'success_submit' && (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 text-green-500">
              <CheckCircle size={64} className="animate-bounce" />
            </div>
            <h2 className="mb-2 font-[Arima] text-2xl font-bold text-gray-900">
              Details Submitted!
            </h2>
            <p className="mb-6 font-[Inter] text-sm text-gray-600">
              Your details have been successfully submitted. Our metabolic health experts will
              contact you shortly.
            </p>

            <button
              onClick={handleClose}
              className="w-full cursor-pointer rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
