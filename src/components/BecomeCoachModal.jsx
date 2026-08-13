import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import becomeCoachImg from '../assets/images/become-coach.png';
import { sendMail } from '../utils/helpers';
import Loader from './Loader';
import { useHeader } from '../context/HeaderContext';

export default function BecomeCoachModal({ showModal, handleCloseModal }) {
  const { setIsHeaderVisible } = useHeader();

  useEffect(() => {
    if (showModal) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    return () => setIsHeaderVisible(true);
  }, [showModal, setIsHeaderVisible]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collaboration: '',
    consent: false,
  });
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePhone = (phone) => {
    const cleanPhone = phone.trim();
    if (!cleanPhone) {
      return 'Phone number is required.';
    }
    const regex = /^\d{10}$/;
    if (!regex.test(cleanPhone)) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validatePhone(formData.phone);
    if (error) {
      setPhoneError(error);
      return;
    }
    setPhoneError('');
    setIsSubmitting(true);

    // Execute reCAPTCHA v3 programmatically
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        Promise.resolve(
          window.grecaptcha.execute('6LfpNkctAAAAAKbhDSnBZcYPt_yzHKxTvlF8K6Ch', {
            action: 'submit_become_coach',
          })
        )
          .then(async (token) => {
            await sendMail({ ...formData, type: 'coach_application' });

            toast.success('Your application has been submitted successfully!');
            setFormData({ name: '', email: '', phone: '', collaboration: '', consent: false });
            handleCloseModal();
          })
          .catch((err) => {
            toast.error('Server Error!');
          })
          .finally(() => {
            setIsSubmitting(false);
          });
      });
    } else {
      // Fallback for development if script fails to load
      sendMail({ ...formData, type: 'coach_application' })
        .then(() => {
          toast.success('Your application has been submitted successfully!');
          setFormData({ name: '', email: '', phone: '', collaboration: '', consent: false });
          handleCloseModal();
        })
        .catch(() => {
          toast.error('Server Error!');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] px-5 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl transition-all md:p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Top Centered Heading */}
        <div className="mb-6 text-center md:mb-4">
          <h2 className="font-[Arima] text-3xl font-bold text-orange-500 md:text-4xl">Join Us</h2>
          <p className="mt-1 text-sm text-gray-500">
            Be a part of family first preventive healthcare community.
            <br /> Collaborate. Grow. Make an Impact.
          </p>
        </div>

        {/* 50-50 Split Container */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {/* Left Side: Full Image */}
          <div className="relative hidden h-64 min-h-[300px] overflow-hidden rounded-xl md:block md:h-auto">
            <img
              src={becomeCoachImg}
              alt="Become a Coach"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Right Side: Contact Form */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 font-[Arima] text-xl font-semibold text-gray-800">
              Partner with us
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-[Inter] text-xs font-semibold text-gray-700">
                  Your name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                />
              </div>

              <div className="grid gap-2 grid-rows-2">
                <div className="flex flex-col gap-1.5">
                  <label className="font-[Inter] text-xs font-semibold text-gray-700">
                    Your email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-[Inter] text-xs font-semibold text-gray-700">
                    Mobile number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); // digits only
                      setFormData({ ...formData, phone: val });
                      if (phoneError) setPhoneError('');
                    }}
                    maxLength={10}
                    className={`rounded-lg border bg-white px-3.5 py-2.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:outline-none ${
                      phoneError
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20'
                    }`}
                  />
                  {phoneError && (
                    <span className="font-[Inter] text-xs font-medium text-red-500">
                      {phoneError}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-[Inter] text-xs font-semibold text-gray-700">
                  How can we collaborate together *
                </label>
                <textarea
                  required
                  placeholder="Briefly describe how we can collaborate"
                  value={formData.collaboration}
                  onChange={(e) => setFormData({ ...formData, collaboration: e.target.value })}
                  className="resize-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  rows="3"
                ></textarea>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="coach-consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 bg-white text-orange-500 focus:ring-orange-500"
                />
                <label
                  htmlFor="coach-consent"
                  className="cursor-pointer font-[Inter] text-[11px] leading-snug text-gray-600"
                >
                  I consent to be contacted by MyTwin Support Team on Calls,WhatsApp, Email & SMS.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? <Loader /> : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
