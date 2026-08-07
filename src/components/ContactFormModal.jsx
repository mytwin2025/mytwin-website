import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useContactForm } from '../context/ContactFormContext';
import { useHeader } from '../context/HeaderContext';
import { sendMail } from '../utils/helpers';
import Loader from './Loader';

export default function ContactFormModal() {
  const { showExpertModal, handleCloseModal } = useContactForm();
  const { setIsHeaderVisible } = useHeader();

  useEffect(() => {
    if (showExpertModal) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    return () => setIsHeaderVisible(true);
  }, [showExpertModal, setIsHeaderVisible]);

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
          window.grecaptcha.execute('6LfpNkctAAAAAKbhDSnBZcYPt_yzHKxTvlF8K6Ch', { action: 'submit_contact' })
        )
          .then(async (token) => {
            await sendMail({ ...formData, type: 'contact' });
            toast.success('Your details have been submitted. An expert will contact you soon!');
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
      sendMail({ ...formData, type: 'contact' })
        .then(() => {
          toast.success('Your details have been submitted. An expert will contact you soon!');
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

  if (!showExpertModal) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleCloseModal}
    >
      <div
        className="relative w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        <h2 className="mb-4 font-[Arima] text-2xl font-bold text-orange-500">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-[Inter] text-xs font-semibold text-gray-700">Email *</label>
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
                <span className="font-[Inter] text-xs font-medium text-red-500">{phoneError}</span>
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
              id="contact-consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 bg-white text-orange-500 focus:ring-orange-500"
            />
            <label
              htmlFor="contact-consent"
              className="cursor-pointer font-[Inter] text-[11px] leading-snug text-gray-600"
            >
              I consent to receive phone calls/messages/emails from MyTwin experts.
            </label>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-orange-500 py-3 font-[Inter] text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/10 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? <Loader /> : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
