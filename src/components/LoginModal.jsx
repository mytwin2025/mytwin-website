import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import makeApiCall from '../utils/makeApiCall';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function LoginModal() {
  const { isLoginModalOpen, closeLogin, login, handleAuthSuccess, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  // Steps: 1 = Phone, 2 = OTP, 3 = Profile Completion
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: 'Male',
    email: '',
  });

  if (!isLoginModalOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setLoading(true);
    try {
      const fullMobile = countryCode + mobile;
      const response = await makeApiCall('auth/otp-sender', 'POST', { mobile: fullMobile });
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setStep(2);
      } else {
        toast.error(response.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      const fullMobile = countryCode + mobile;
      const response = await makeApiCall('auth/otp-verify', 'POST', { 
        mobile: fullMobile, 
        otp, 
        fcmToken: 'web' 
      });
      
      if (response.status === 200 && response.data?.data?.token) {
        const { token } = response.data.data;
        
        // Set token in localStorage immediately so the next API call works
        localStorage.setItem('token', token);
        
        let fetchedUser = null;
        try {
          const profileRes = await makeApiCall('user/me', 'GET');
          if (profileRes?.data?.data) fetchedUser = profileRes.data.data;
        } catch (err) {
          console.error("Failed to fetch user profile", err);
        }

        login(token, fetchedUser);
        toast.success('Login successful!');
        
        // Check if profile is complete (age and gender are inside .profile)
        if (!fetchedUser || !fetchedUser.name || !fetchedUser.profile?.age || !fetchedUser.profile?.gender || !fetchedUser.email) {
          setProfile({
            name: fetchedUser?.name || '',
            age: fetchedUser?.profile?.age || '',
            gender: fetchedUser?.profile?.gender || 'Male',
            email: fetchedUser?.email || '',
          });
          setStep(3); // Go to profile completion
        } else {
          handleAuthSuccess();
          resetState();
        }
      } else {
        toast.error(response.data?.message || 'OTP verification failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.age || !profile.email.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    try {
      await updateProfile(profile);
      toast.success('Profile updated successfully!');
      handleAuthSuccess();
      resetState();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setStep(1);
    setMobile('');
    setOtp('');
  };

  const handleClose = () => {
    closeLogin();
    setTimeout(resetState, 300);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {step === 1 ? 'Member Login' : step === 2 ? 'Verify OTP' : 'Complete Profile'}
          </h2>
          <p className="mb-8 text-sm text-gray-500">
            {step === 1 
              ? 'Enter your mobile number to sign in or create an account.' 
              : step === 2 
              ? `We've sent a code to ${countryCode} ${mobile}`
              : 'Please provide a few details to complete your profile.'}
          </p>

          {/* Step 1: Phone */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Mobile Number</label>
                <div className="flex overflow-hidden rounded-xl border border-gray-300 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500">
                  <div className="flex items-center bg-gray-50 px-4 py-3 text-sm font-medium text-gray-600 border-r border-gray-300">
                    {countryCode}
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 text-base focus:outline-none bg-[white]"
                    placeholder="Enter 10-digit number"
                    autoFocus
                  />
                </div>
                
              </div>
              <button
                type="submit"
                disabled={loading || mobile.length !== 10}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
              </button>

              <button
                type="button"
                onClick={() => {
                  closeLogin();
                  navigate('/care-programs');
                }}
                className="mt-4 text-[16px] font-semibold text-black transition-colors text-center py-2 px-4 rounded-3xl bg-[#fff] w-fit mx-auto border border-gray-200"
              >
                Offer MyTwin as a gift
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">One Time Password</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-xl tracking-widest focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-[white]"
                  placeholder="------"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="mt-2 flex w-full items-center justify-center rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Login'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                Change mobile number
              </button>
            </form>
          )}

          {/* Step 3: Profile Completion */}
          {step === 3 && (
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Age</label>
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Gender</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="john@example.com"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-orange-500 py-3.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Save & Continue'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
