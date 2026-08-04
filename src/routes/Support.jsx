import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import Footer from '../components/Footer';
import { sendMail } from '../utils/helpers';
import Loader from '../components/Loader';

export default function Support() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', description: '', consent: false });
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
            action: 'submit_support',
          })
        )
          .then(async (token) => {
            await sendMail({ ...formData, type: 'support' });

            toast.success('Your details have been submitted. An expert will contact you soon!');
            setFormData({ name: '', email: '', phone: '', description: '', consent: false });
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
      sendMail({ ...formData, type: 'support' })
        .then(() => {
          toast.success('Your details have been submitted. An expert will contact you soon!');
          setFormData({ name: '', email: '', phone: '', description: '', consent: false });
        })
        .catch(() => {
          toast.error('Server Error!');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const scrollToContent = () => {
    const element = document.getElementById('support-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#f0efed]">
      {/* Hero Section */}
      <div
        className="relative flex h-screen w-full flex-col items-center justify-center bg-cover bg-center px-4 text-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070')`,
        }}
      >
        {/* Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80" />

        {/* Hero Content */}
        <div className="relative z-10 flex max-w-3xl flex-col items-center px-4 pt-14">
          <h1 className="font-[Arima] text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            Support Centre
          </h1>
          <p className="mt-6 font-[Inter] text-base text-gray-300 sm:text-lg md:text-xl">
            Have questions? Our team is here to help you get the best results on your wellness
            journey.
          </p>
          <button
            onClick={scrollToContent}
            className="mt-12 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white hover:text-black active:scale-95"
            aria-label="Scroll down"
          >
            <ArrowDown className="animate-bounce" size={20} />
          </button>
        </div>
      </div>

      {/* 50-50 Split Section */}
      <div id="support-content" className="w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2 md:py-8 lg:gap-16">
          {/* Left: Content Section */}
          <div className="flex flex-col justify-center">
            <h2 className="font-[Arima] text-4xl font-extrabold text-black sm:text-5xl">
              Talk to us
            </h2>
            <p className="mt-4 font-[Inter] text-sm leading-relaxed text-[#484c48] sm:text-base">
              Have questions about our services? Get in touch with our team for any support.
            </p>

            {/* Gradient Divider */}
            <div className="my-8 h-1.5 w-32 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400" />

            {/* Contact Details */}
            <div className="space-y-6 font-[Inter]">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Phone Number
                  </h4>
                  <p className="mt-1 text-sm text-gray-800 transition-colors hover:text-orange-600 sm:text-base">
                    <a href="tel:+918369255417">+91 8369255417</a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Email
                  </h4>
                  <p className="mt-1 text-sm text-gray-800 transition-colors hover:text-orange-600 sm:text-base">
                    <a href="mailto:info@mytwinlab.com">info@mytwinlab.com</a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Office Address
                  </h4>
                  <p className="mt-1 text-sm text-gray-800 sm:text-base">
                    Plot 230,Ghansoli, Navi Mumbai,400701
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="flex items-center justify-center">
            <div className="w-full rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
              <h3 className="mb-6 font-[Arima] text-2xl font-bold text-orange-500">Contact Us</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-[Inter] text-xs font-semibold text-gray-700">Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[Inter] text-xs font-semibold text-gray-700">
                      Email *
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
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
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
                    How can we help you? *
                  </label>
                  <textarea
                    required
                    placeholder="Briefly describe your requirements or health concerns"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="resize-none rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 font-[Inter] text-[14px] text-black outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                    rows="4"
                  ></textarea>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="support-consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 bg-white text-orange-500 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="support-consent"
                    className="cursor-pointer font-[Inter] text-[11px] leading-snug text-gray-600"
                  >
                    I consent to receive phone calls/messages/emails from MyTwin experts.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? <Loader /> : 'Submit Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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

        {/* Notification badge */}
        {/* <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-bold text-white items-center justify-center">1</span>
        </span> */}

        {/* Hover Tooltip */}
        <span className="absolute right-16 origin-right scale-0 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl transition-all duration-300 group-hover:scale-100">
          Chat with us!
        </span>
      </a>

      <Footer />
    </div>
  );
}
