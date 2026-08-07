import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Loader,
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  Calendar,
  Clock,
  CreditCard,
  ArrowLeft,
  Check,
  X,
  User,
  Phone,
  Mail,
  Home,
  Map,
  FileText,
} from 'lucide-react';
import { useRazorpay } from 'react-razorpay';
import { RAZORPAY_KEY, BASE_URL_APP } from '../constants/constants';
import { sendMail } from '../utils/helpers';
import makeApiCall from '../utils/makeApiCall';
import { toast } from 'sonner';
import axios from 'axios';

export const card = [
  {
    name: 'Full Body Checkup (Routine)',
    price: '₹ 2500',
    finalPrice: '₹ 1,949',
    description: 'Diabetes & Metabolic Health Panel',
    sub: '92',
    discount: '22%',
    packageId: '3133',
    allowed: 'all', //this is not implemented becoz for now a user can add any of male/female test at once and there is no way given to map member for a test
    tests: [
      {
        testName: 'COMPLETE BLOOD COUNT',
        subTests: [
          'Absolute Basophils Count',
          'Absolute Eosinophil Count',
          'Absolute Lymphocyte Count',
          'Absolute Monocyte Count',
          'Absolute Neutrophil Count',
          'Basophils',
          'Eosinophils',
          'Haemoglobin',
          'Immature Granulocyte(IG)',
          'Immature Granulocyte Percentage(IG%)',
          'Lymphocytes',
          'MCH',
          'MCHC',
          'MCV',
          'Monocytes',
          'Neutrophils',
          'PCV Haematocrit',
          'Platelet Count',
          'RBC Count',
          'RDW SD',
          'RDW CV',
          'Total Leucocytes Count(WBC)',
          'ESR',
          'MPV'
        ]
      },
      {
        testName: 'HbA1c',
        subTests: ['HbA1c', 'Average Blood Glucose(ABG)']
      },
      {
        testName: 'Iron Studies',
        subTests: ['Iron', 'TIBC', 'UIBC', 'Transferrin Saturation']
      },
      {
        testName: 'KFT With K',
        subTests: [
          'BUN',
          'BUN/Creatinine Ratio',
          'Calcium Total',
          'Chlorides',
          'Creatinine',
          'Phosphorus-Inorganic',
          'Sodium',
          'Urea',
          'Uric Acid',
          'Urea/Creatinine Ratio',
          'Potassium',
          'EGFR'
        ]
      },
      {
        testName: 'Lipid Profile Advance',
        subTests: [
          'Cholesterol-Total',
          'HDL Cholesterol Direct',
          'LDL Cholesterol -Direct',
          'Triglycerides, Serum',
          'Non - HDL Cholesterol',
          'TC/HDL Ratio',
          'LDL/HDL Ratio',
          'VLDL Cholesterol',
          'Apolipoprotein(ApoB/ApoA1) Ratio'
        ]
      },
      {
        testName: 'Liver Function Test',
        subTests: [
          'Alkaline Phosphatase',
          'Bilirubin Direct',
          'Bilirubin Indirect',
          'Bilirubin Total',
          'GGT',
          'GGTP',
          'Serum Albumin',
          'Serum Globulin',
          'SGOT(AST)',
          'SGPT(ALT)',
          'Total Protein',
          'A/G Ratio'
        ]
      },
      {
        testName: 'Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)',
        subTests: ['Total T3', 'Total T4', 'Ultra-Sensitive TSH']
      },
      {
        testName: 'Urine Routine & Microscopy Extended',
        subTests: [
          'Urine Color',
          'Urine Appearance',
          'Urine Specific Gravity',
          'Urine pH',
          'Protein',
          'Glucose',
          'Ketones',
          'Blood',
          'Bilirubin',
          'Urobilinogen',
          'Nitrite',
          'Leukocyte Esterase',
          'WBC',
          'RBC',
          'Epithelial Cells',
          'Casts',
          'Crystals',
          'Bacteria',
          'Yeast Cells',
          'Mucus Threads',
          'Amorphous Deposits'
        ]
      },
      {
        testName: 'CRP (C Reactive Protein) Quantitative, Serum',
        subTests: ['CRP (C Reactive Protein) Quantitative, Serum']
      },
      {
        testName: 'Blood Glucose Fasting',
        subTests: ['Blood Glucose Fasting']
      },
      {
        testName: 'Vitamin B12 Cyanocobalamin',
        subTests: ['Vitamin B12 Cyanocobalamin']
      },
      {
        testName: 'Vitamin D Total-25 Hydroxy',
        subTests: ['Vitamin D Total-25 Hydroxy']
      },
      {
        testName: 'ESR Automated',
        subTests: ['ESR Automated']
      }
    ]
  },
  {
    name: 'Full Body Checkup-Male (Advance)',
    price: '₹ 6500',
    finalPrice: '₹ 3,949',
    description: 'Advance Cardio & Metabolic Health Panel',
    sub: '98',
    discount: '39%',
    packageId: '10401',
    allowed: 'Male',
    tests: [
      {
        testName: 'COMPLETE BLOOD COUNT',
        subTests: [
          'Absolute Basophils Count',
          'Absolute Eosinophil Count',
          'Absolute Lymphocyte Count',
          'Absolute Monocyte Count',
          'Absolute Neutrophil Count',
          'Basophils',
          'Eosinophils',
          'Haemoglobin',
          'Immature Granulocyte(IG)',
          'Immature Granulocyte Percentage(IG%)',
          'Lymphocytes',
          'MCH',
          'MCHC',
          'MCV',
          'Monocytes',
          'Neutrophils',
          'PCV Haematocrit',
          'Platelet Count',
          'RBC Count',
          'RDW SD',
          'RDW CV',
          'Total Leucocytes Count(WBC)',
          'ESR',
          'MPV'
        ]
      },
      {
        testName: 'HbA1c',
        subTests: ['HbA1c', 'Average Blood Glucose(ABG)']
      },
      {
        testName: 'Iron Studies',
        subTests: ['Iron', 'TIBC', 'UIBC', 'Transferrin Saturation']
      },
      {
        testName: 'KFT With K',
        subTests: [
          'BUN',
          'BUN/Creatinine Ratio',
          'Calcium Total',
          'Chlorides',
          'Creatinine',
          'Phosphorus-Inorganic',
          'Sodium',
          'Urea',
          'Uric Acid',
          'Urea/Creatinine Ratio',
          'Potassium',
          'EGFR'
        ]
      },
      {
        testName: 'Lipid Profile Advance',
        subTests: [
          'Cholesterol-Total',
          'HDL Cholesterol Direct',
          'LDL Cholesterol -Direct',
          'Triglycerides, Serum',
          'Non - HDL Cholesterol',
          'TC/HDL Ratio',
          'LDL/HDL Ratio',
          'VLDL Cholesterol',
          'Apolipoprotein(ApoB/ApoA1) Ratio'
        ]
      },
      {
        testName: 'Liver Function Test',
        subTests: [
          'Alkaline Phosphatase',
          'Bilirubin Direct',
          'Bilirubin Indirect',
          'Bilirubin Total',
          'GGT',
          'GGTP',
          'Serum Albumin',
          'Serum Globulin',
          'SGOT(AST)',
          'SGPT(ALT)',
          'Total Protein',
          'A/G Ratio'
        ]
      },
      {
        testName: 'Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)',
        subTests: ['Total T3', 'Total T4', 'Ultra-Sensitive TSH']
      },
      {
        testName: 'Urine Routine & Microscopy Extended',
        subTests: [
          'Urine Color',
          'Urine Appearance',
          'Urine Specific Gravity',
          'Urine pH',
          'Protein',
          'Glucose',
          'Ketones',
          'Blood',
          'Bilirubin',
          'Urobilinogen',
          'Nitrite',
          'Leukocyte Esterase',
          'WBC',
          'RBC',
          'Epithelial Cells',
          'Casts',
          'Crystals',
          'Bacteria',
          'Yeast Cells',
          'Mucus Threads',
          'Amorphous Deposits'
        ]
      },
      {
        testName: 'CRP (C Reactive Protein) Quantitative, Serum',
        subTests: ['CRP (C Reactive Protein) Quantitative, Serum']
      },
      {
        testName: 'Blood Glucose Fasting',
        subTests: ['Blood Glucose Fasting']
      },
      {
        testName: 'Vitamin B12 Cyanocobalamin',
        subTests: ['Vitamin B12 Cyanocobalamin']
      },
      {
        testName: 'Vitamin D Total-25 Hydroxy',
        subTests: ['Vitamin D Total-25 Hydroxy']
      },
      {
        testName: 'ESR Automated',
        subTests: ['ESR Automated']
      },
      {
        testName: 'HsCRP High Sensitivity CRP',
        subTests: ['HsCRP High Sensitivity CRP']
      },
      {
        testName: 'Lp(a) Lipoprotein(a)',
        subTests: ['Lp(a) Lipoprotein(a)']
      },
      {
        testName: 'Apolipoproteins A1, Serum',
        subTests: ['Apolipoproteins A1, Serum']
      },
      {
        testName: 'Apolipoproteins B, Serum',
        subTests: ['Apolipoproteins B, Serum']
      },
      {
        testName: 'Apolipoproteins B/A1, Serum',
        subTests: ['Apolipoproteins B/A1, Serum']
      },
      {
        testName: 'Testosterone Free',
        subTests: ['Testosterone Free']
      }
    ]
  },
  {
    name: 'Full Body Checkup-Female (Advance)',
    price: '₹ 6500',
    finalPrice: '₹ 3,949',
    description: 'Advance Cardio & Metabolic Health Panel',
    sub: '99',
    discount: '39%',
    packageId: '10402',
    allowed: 'Female',
    tests: [
      {
        testName: 'COMPLETE BLOOD COUNT',
        subTests: [
          'Absolute Basophils Count',
          'Absolute Eosinophil Count',
          'Absolute Lymphocyte Count',
          'Absolute Monocyte Count',
          'Absolute Neutrophil Count',
          'Basophils',
          'Eosinophils',
          'Haemoglobin',
          'Immature Granulocyte(IG)',
          'Immature Granulocyte Percentage(IG%)',
          'Lymphocytes',
          'MCH',
          'MCHC',
          'MCV',
          'Monocytes',
          'Neutrophils',
          'PCV Haematocrit',
          'Platelet Count',
          'RBC Count',
          'RDW SD',
          'RDW CV',
          'Total Leucocytes Count(WBC)',
          'ESR',
          'MPV'
        ]
      },
      {
        testName: 'HbA1c',
        subTests: ['HbA1c', 'Average Blood Glucose(ABG)']
      },
      {
        testName: 'Iron Studies',
        subTests: ['Iron', 'TIBC', 'UIBC', 'Transferrin Saturation']
      },
      {
        testName: 'KFT With K',
        subTests: [
          'BUN',
          'BUN/Creatinine Ratio',
          'Calcium Total',
          'Chlorides',
          'Creatinine',
          'Phosphorus-Inorganic',
          'Sodium',
          'Urea',
          'Uric Acid',
          'Urea/Creatinine Ratio',
          'Potassium',
          'EGFR'
        ]
      },
      {
        testName: 'Lipid Profile Advance',
        subTests: [
          'Cholesterol-Total',
          'HDL Cholesterol Direct',
          'LDL Cholesterol -Direct',
          'Triglycerides, Serum',
          'Non - HDL Cholesterol',
          'TC/HDL Ratio',
          'LDL/HDL Ratio',
          'VLDL Cholesterol',
          'Apolipoprotein(ApoB/ApoA1) Ratio'
        ]
      },
      {
        testName: 'Liver Function Test',
        subTests: [
          'Alkaline Phosphatase',
          'Bilirubin Direct',
          'Bilirubin Indirect',
          'Bilirubin Total',
          'GGT',
          'GGTP',
          'Serum Albumin',
          'Serum Globulin',
          'SGOT(AST)',
          'SGPT(ALT)',
          'Total Protein',
          'A/G Ratio'
        ]
      },
      {
        testName: 'Thyroid Profile-Total (T3, T4 & TSH Ultra-sensitive)',
        subTests: ['Total T3', 'Total T4', 'Ultra-Sensitive TSH']
      },
      {
        testName: 'Urine Routine & Microscopy Extended',
        subTests: [
          'Urine Color',
          'Urine Appearance',
          'Urine Specific Gravity',
          'Urine pH',
          'Protein',
          'Glucose',
          'Ketones',
          'Blood',
          'Bilirubin',
          'Urobilinogen',
          'Nitrite',
          'Leukocyte Esterase',
          'WBC',
          'RBC',
          'Epithelial Cells',
          'Casts',
          'Crystals',
          'Bacteria',
          'Yeast Cells',
          'Mucus Threads',
          'Amorphous Deposits'
        ]
      },
      {
        testName: 'Apolipoproteins A1, Serum',
        subTests: ['Apolipoprotein A1']
      },
      {
        testName: 'Apolipoproteins B, Serum',
        subTests: ['Apolipoprotein B']
      },
      {
        testName: 'Apolipoproteins B/A1, Serum',
        subTests: ['ApoB/ApoA1 Ratio']
      },
      {
        testName: 'CRP (C Reactive Protein) Quantitative, Serum',
        subTests: ['CRP (C Reactive Protein) Quantitative']
      },
      {
        testName: 'ESR Automated',
        subTests: ['ESR Automated']
      },
      {
        testName: 'Blood Glucose Fasting',
        subTests: ['Blood Glucose Fasting']
      },
      {
        testName: 'HsCRP High Sensitivity CRP',
        subTests: ['High Sensitivity CRP']
      },
      {
        testName: 'FSH-Follicle Stimulating Hormone',
        subTests: ['FSH']
      },
      {
        testName: 'LH-Luteinizing Hormone',
        subTests: ['LH']
      },
      {
        testName: 'Lp(a) Lipoprotein(a)',
        subTests: ['Lipoprotein(a)']
      },
      {
        testName: 'Vitamin B12 Cyanocobalamin',
        subTests: ['Vitamin B12']
      },
      {
        testName: 'Vitamin D Total-25 Hydroxy',
        subTests: ['Vitamin D Total-25 Hydroxy']
      }
    ]
  },
];

const STEPS = [
  { id: 1, label: 'Cart' },
  { id: 2, label: 'Address' },
  { id: 3, label: 'Members' },
  { id: 4, label: 'Timing' },
  { id: 5, label: 'Payment' },
];

import { useCart } from '../context/CartContext';
import { useHeader } from '../context/HeaderContext';

function DiagnosisBookForm({ isOpen, onClose, initialPackageId, initialMemberCount = 1, isBookingFlow }) {
  const { addToCart } = useCart();
  const { setIsHeaderVisible } = useHeader();
  const [step, setStep] = useState(0); // 0 = Pincode Popup, 1 = Cart, 2 = Address, etc.
  const [pincode, setPincode] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [isCheckingPincode, setIsCheckingPincode] = useState(false);

  // Cart state
  const [selectedPackages, setSelectedPackages] = useState([]);

  // Address state
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    email: '',
    houseNo: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [addressErrors, setAddressErrors] = useState({});

  // OTP state
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  // Members state
  const [members, setMembers] = useState([]);
  const [expectedMemberCount, setExpectedMemberCount] = useState(1);
  const [newMember, setNewMember] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    relation: 'Self',
    assignedTest: card[0]?.packageId || '',
  });
  const [memberError, setMemberError] = useState('');

  // Timing state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [viewTestsPkg, setViewTestsPkg] = useState(null);

  // Razorpay Payment
  const { error: razorpayError, isLoading: isRazorpayLoading, Razorpay } = useRazorpay();
  const [isPaying, setIsPaying] = useState(false);

  // Initialize cart when modal opens
  useEffect(() => {
    setIsHeaderVisible(!isOpen);
    return () => {
      setIsHeaderVisible(true);
    };
  }, [isOpen, setIsHeaderVisible]);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setPincode('');
      setPincodeError('');
      setLocationName('');
      setMembers([]);
      setExpectedMemberCount(initialMemberCount || 1);
      setSelectedDate('');
      setSelectedTime('');
      setAddressErrors({});
      setAddressForm({
        name: '',
        phone: '',
        email: '',
        houseNo: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
      });
      setShowOtpInput(false);
      setOtp('');
      setIsSendingOtp(false);
      setIsVerifyingOtp(false);
      setIsPhoneVerified(false);

      if (initialPackageId) {
        const found = card.find((p) => p.packageId === initialPackageId);
        if (found) {
          setSelectedPackages([found]);
        } else {
          setSelectedPackages([]);
        }
      } else {
        setSelectedPackages([]);
      }
    }
  }, [isOpen, initialPackageId]);

  // Synchronize pincode to address form when validated
  useEffect(() => {
    if (pincode) {
      setAddressForm((prev) => ({ ...prev, pincode }));
    }
  }, [pincode]);

  if (!isOpen) return null;

  // 1. Geolocation + OpenStreetMap Reverse Geocoding
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setPincodeError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setPincodeError('');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data && data.address) {
            const code = data.address.postcode || '';
            const city = data.address.city || data.address.town || data.address.village || '';
            const state = data.address.state || '';

            if (code) {
              setPincode(code);
              setAddressForm((prev) => ({
                ...prev,
                pincode: code,
                city: city,
                state: state,
              }));
              setLocationName(data.display_name);
            } else {
              setPincodeError('Could not find pincode for your location. Please enter manually.');
            }
          } else {
            setPincodeError('Unable to resolve location details. Please enter pincode manually.');
          }
        } catch (err) {
          setPincodeError('Error fetching location details. Please enter manually.');
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setPincodeError('Location access denied or unavailable. Please enter manually.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handlePincodeSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError('Please enter a valid 6-digit PIN code.');
      return;
    }
    setIsCheckingPincode(true);
    setPincodeError('');
    try {
      const response = await axios.post(`${BASE_URL_APP}/healtians/pincode-servicable`, {
        pincode: pincode,
      });

      if (response.data.data?.serviceable) {
        toast.success('Pincode is serviceable!');
        
        try {
          const pinRes = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
          const pinData = await pinRes.json();
          if (pinData && pinData[0] && pinData[0].Status === 'Success') {
            const postOffice = pinData[0].PostOffice[0];
            setAddressForm((prev) => ({
              ...prev,
              city: postOffice.District || postOffice.Block || '',
              state: postOffice.State || '',
            }));
          }
        } catch (err) {
          console.error('Error fetching city/state from pincode:', err);
        }

        if (isBookingFlow) {
          const pkg = card.find(c => c.packageId === initialPackageId);
          if (pkg) {
            addToCart({
              id: `labtest_${pkg.packageId}_${Date.now()}`,
              type: 'lab_test',
              planTitle: pkg.name,
              planPrice: parseInt(pkg.finalPrice.replace(/[^0-9]/g, ''), 10),
              pkgData: pkg,
              image: 'https://cdn-icons-png.flaticon.com/512/9623/9623772.png',
            });
            onClose();
          }
        } else {
          setStep(1); // Proceed to bottom sheet (Cart step)
        }
      } else {
        const errorMsg = response.data?.message || 'Pincode is not serviceable for this location.';
        setPincodeError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Error verifying pincode availability:', error);
      setPincodeError('Failed to check pincode. Please try again.');
      toast.error('Error checking pincode availability.');
    } finally {
      setIsCheckingPincode(false);
    }
  };

  // Helper to parse price string to number (e.g. "₹ 1,949" -> 1949)
  const getNumericPrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const getTotalAmount = () => {
    const baseTotal = selectedPackages.reduce((sum, pkg) => sum + getNumericPrice(pkg.finalPrice), 0);
    return baseTotal * expectedMemberCount;
  };

  // Address validation
  const validateAddress = () => {
    const errors = {};
    if (!addressForm.name.trim()) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(addressForm.name.trim())) {
      errors.name = 'Name must contain only alphabets';
    }

    if (!addressForm.phone.trim() || !/^[6-9]\d{9}$/.test(addressForm.phone.trim())) {
      errors.phone = 'Valid 10-digit mobile number is required';
    }
    if (!addressForm.email.trim() || !/\S+@\S+\.\S+/.test(addressForm.email.trim())) {
      errors.email = 'Valid email is required';
    }
    if (!addressForm.houseNo.trim()) errors.houseNo = 'House/Flat No is required';
    if (!addressForm.street.trim()) errors.street = 'Street details are required';
    if (!addressForm.city.trim()) errors.city = 'City is required';
    if (!addressForm.state.trim()) errors.state = 'State is required';

    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!validateAddress()) return;

    if (!isPhoneVerified) {
      toast.error('Please verify your mobile number before proceeding');
      return;
    }

    setStep(3); // Proceed to members
  };

  const handleSendOtpClick = async () => {
    setIsSendingOtp(true);
    try {
      const fullMobile = '+91' + addressForm.phone;
      const response = await makeApiCall('auth/otp-sender', 'POST', { mobile: fullMobile });
      if (response.status === 200) {
        toast.success('OTP sent successfully to ' + addressForm.phone);
        setShowOtpInput(true);
      } else {
        toast.error(response.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtpClick = async () => {
    if (otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }
    setIsVerifyingOtp(true);
    try {
      const fullMobile = '+91' + addressForm.phone;
      const response = await makeApiCall('auth/otp-verify', 'POST', {
        mobile: fullMobile,
        otp,
        fcmToken: 'web'
      });
      
      if (response.status === 200) {
        toast.success('Mobile number verified successfully!');
        setIsPhoneVerified(true);
        setShowOtpInput(false);
      } else {
        toast.error(response.data?.message || 'OTP verification failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Add Member
  const handleAddMember = (e) => {
    e.preventDefault();
    setMemberError('');
    if (!newMember.name.trim()) {
      setMemberError('Name is required');
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(newMember.name.trim())) {
      setMemberError('Name must contain only alphabets');
      return;
    }
    if (!newMember.phone || !/^[6-9]\d{9}$/.test(newMember.phone)) {
      setMemberError('Valid 10-digit phone number is required');
      return;
    }
    if (!newMember.age.trim() || isNaN(newMember.age) || parseInt(newMember.age, 10) <= 0) {
      setMemberError('Provide a valid age');
      return;
    }
    if (members.length >= expectedMemberCount) {
      setMemberError(`Maximum of ${expectedMemberCount} members can be added for this booking.`);
      return;
    }
    if (newMember.relation === 'Self' && members.some((m) => m.relation === 'Self')) {
      setMemberError("You can only add one member as 'Self'.");
      return;
    }
    const currentTestId = selectedPackages[0]?.packageId || card[0]?.packageId;
    if (!currentTestId) {
      setMemberError('No test selected to assign.');
      return;
    }

    setMembers([...members, { ...newMember, assignedTest: currentTestId, id: Date.now() }]);
    setNewMember({ name: '', phone: '', age: '', gender: 'Male', relation: 'Self', assignedTest: currentTestId });
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // Timing Options
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

  // Razorpay payment integration
  const handleRazorpayPayment = () => {
    if (razorpayError) {
      alert('Razorpay failed to load');
      return;
    }
    if (!Razorpay) {
      alert('Razorpay sdk is still loading. Please try again in a moment.');
      return;
    }

    setIsPaying(true);

    const totalAmt = getTotalAmount();
    const options = {
      key: RAZORPAY_KEY,
      amount: totalAmt * 100, // paise
      currency: 'INR',
      name: 'MyTwin Diagnostics',
      description: `Package checkups for ${members.length} member(s)`,
      handler: function (response) {
        // Send structured diagnostic booking details email
        sendMail({
          type: 'diagnostic_booking',
          paymentId: response.razorpay_payment_id,
          pincode: pincode,
          customerName: addressForm.name,
          customerPhone: addressForm.phone,
          customerEmail: addressForm.email,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime,
          packages: selectedPackages.map((p) => `${p.name} (${p.finalPrice})`).join(', '),
          address: `${addressForm.houseNo}, ${addressForm.street}, ${addressForm.landmark ? addressForm.landmark + ', ' : ''}${addressForm.city}, ${addressForm.state} - ${addressForm.pincode}`,
          members: members
            .map(
              (m, idx) =>
                `Member ${idx + 1}: ${m.name} (${m.phone}, ${m.gender}, ${m.age} years, ${m.relation}) - Assigned Test: ${
                  card.find((p) => p.packageId === m.assignedTest)?.name || 'Unknown'
                }`
            )
            .join(' | '),
        }).catch((err) => {
          console.error('Failed to send email:', err);
        });

        // alert(`Booking & Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        toast.success(`Booking & Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        setIsPaying(false);
        onClose();
      },
      prefill: {
        name: addressForm.name,
        email: addressForm.email,
        contact: addressForm.phone,
      },
      notes: {
        pincode: pincode,
        date: selectedDate,
        time: selectedTime,
        membersCount: members.length.toString(),
      },
      theme: {
        color: '#f97316',
      },
      modal: {
        ondismiss: function () {
          setIsPaying(false);
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* 1. PINCODE POPUP MODAL (Step 0) */}
      {step === 0 && (
        <div className="relative top-10 my-auto w-[90%] max-w-md scale-100 rounded-xl bg-white p-6 shadow-2xl transition-all duration-300">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <MapPin size={30} className="animate-bounce" />
            </div>
            <h3 className="font-[Arima] text-2xl font-bold text-gray-900">
              Enter Location Pincode
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Please provide your location pincode to check service availability in your area.
            </p>

            <form onSubmit={handlePincodeSubmit} className="mt-6 w-full">
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-5 py-2 text-center text-base font-bold tracking-widest text-gray-900 placeholder:tracking-normal placeholder:text-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {pincodeError && (
                <p className="mt-2 text-xs font-medium text-red-500">{pincodeError}</p>
              )}

              {locationName && (
                <p className="mt-2 text-xs font-medium text-green-600">
                  Detected: {locationName.split(',').slice(0, 3).join(',')}
                </p>
              )}

              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {isLocating ? (
                  <>
                    <Loader size={18} className="animate-spin text-orange-500" />
                    Fetching location...
                  </>
                ) : (
                  <>
                    <Map size={18} className="text-orange-500" />
                    Use Current Location
                  </>
                )}
              </button>

              <button
                type="submit"
                disabled={pincode.length !== 6 || isCheckingPincode}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 py-2 font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
              >
                {isCheckingPincode ? (
                  <>
                    <Loader size={18} className="animate-spin text-white" />
                    Checking...
                  </>
                ) : (
                  'Check Availability & Continue'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. MAIN BOTTOM SHEET (Step 1 to 5) */}
      {step > 0 && (
        <div className="animate-slideUp relative flex h-[90vh] w-full flex-col rounded-t-[32px] bg-[#f9f9f9] shadow-2xl transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-[32px] border-b border-gray-100 bg-white px-6 py-4">
            <div className="flex items-center gap-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h3 className="font-[Arima] text-xl font-bold text-gray-900">Select Health Checkup Packages</h3>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Steps Header */}
          <div className="bg-white px-6 pb-4 pt-2">
            <div className="flex items-center justify-between">
              {STEPS.map((s, idx) => {
                const isCompleted = step > s.id;
                const isActive = step === s.id;
                return (
                  <React.Fragment key={s.id}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-orange-500 text-white'
                            : isActive
                              ? 'border border-orange-500 bg-orange-100 text-orange-600'
                              : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {isCompleted ? <Check size={14} /> : s.id}
                      </div>
                      <span
                        className={`mt-1 text-[10px] font-semibold ${isActive ? 'text-orange-600' : 'text-gray-400'}`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`mx-2 h-[2px] flex-1 transition-all duration-300 ${step > s.id ? 'bg-orange-500' : 'bg-gray-200'}`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Step Contents - Scrollable Area */}
          <div className="custom-scrollbar flex-1 overflow-y-auto px-6 py-3 pb-32">
            {/* STEP 1: ADD PACKAGES TO CART */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h4 className="font-semibold text-gray-800">Selected Checkup Package</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  {(initialPackageId ? card.filter((p) => p.packageId === initialPackageId) : card).map((pkg) => {
                    const isAdded = selectedPackages.some((p) => p.packageId === pkg.packageId);
                    return (
                      <div
                        key={pkg.packageId}
                        className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-orange-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-block rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-600">
                              Package ID: {pkg.packageId}
                            </span>
                            <h5 className="mt-1 font-bold text-gray-900">{pkg.name}</h5>
                            <p className="mt-0.5 text-xs text-gray-500">{pkg.description}</p>
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
                            <span
                              onClick={() => {
                                if (pkg.tests && pkg.tests.length > 0) setViewTestsPkg(pkg);
                              }}
                              className="cursor-pointer rounded-xl bg-[#e0f2f1] px-3 py-1.5 text-[12px] font-semibold text-teal-600 underline decoration-dotted underline-offset-4 hover:text-teal-700 sm:px-4 sm:py-2 sm:text-[14px]"
                            >
                              {pkg.sub} Tests
                            </span>
                          </div>
                          
                          <div className="mt-1 flex items-center justify-center rounded-lg bg-[#f0fdf4] px-4 py-2">
                            <span className="font-[Public Sans] text-center text-[12px] font-medium text-green-600 sm:text-[13px]">
                              {pkg.discount} OFF
                            </span>
                          </div>

                          <div className="mt-1 flex items-center justify-between border-t border-gray-50 pt-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ₹{(getNumericPrice(pkg.finalPrice) * expectedMemberCount).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{(getNumericPrice(pkg.price) * expectedMemberCount).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* <span className="text-xs font-bold text-gray-500">Members:</span> */}
                            <div className="relative">
                              <select
                                value={expectedMemberCount}
                                onChange={(e) => setExpectedMemberCount(Number(e.target.value))}
                                className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-3 pr-8 py-1.5 text-sm font-bold text-gray-900 transition-colors hover:border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                              >
                                <option value={1}>
                                  1 Member
                                </option>
                                <option value={2}>
                                  2 Members
                                </option>
                                <option value={3}>
                                  3 Members
                                </option>
                                <option value={4}>
                                  4 Members
                                </option>
                              </select>
                              <ChevronDown size={16} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (isAdded) {
                              setSelectedPackages(selectedPackages.filter((p) => p.packageId !== pkg.packageId));
                            } else {
                              setSelectedPackages([pkg]);
                            }
                          }}
                          className={`mt-2 w-full rounded-xl py-2.5 text-sm font-bold transition-all ${
                            isAdded
                              ? 'bg-green-50 text-green-600 hover:bg-green-100'
                              : 'bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700'
                          }`}
                        >
                          {isAdded ? (
                            <span className="flex items-center justify-center gap-2">
                              <Check size={16} /> Selected
                            </span>
                          ) : (
                            'Select Package'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: ADDRESS DETAILS */}
            {step === 2 && (
              <form onSubmit={handleAddressSubmit} className="flex flex-col gap-4">
                <h4 className="font-semibold text-gray-800">Contact and Address Details</h4>

                <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={addressForm.name}
                          onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value.replace(/[^a-zA-Z ]/g, '') })}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                      {addressErrors.name && (
                        <p className="mt-1 text-xs text-red-500">{addressErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={addressForm.email}
                          onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>
                      {addressErrors.email && (
                        <p className="mt-1 text-xs text-red-500">{addressErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-500">
                      <span>Mobile Number</span>
                      {isPhoneVerified && (
                        <span className="flex items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">
                          <Check size={12} /> Verified
                        </span>
                      )}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative w-full sm:w-1/2">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10-digit number"
                          value={addressForm.phone}
                          disabled={isPhoneVerified}
                          onChange={(e) => {
                            setAddressForm({
                              ...addressForm,
                              phone: e.target.value.replace(/\D/g, ''),
                            });
                            setIsPhoneVerified(false);
                            setShowOtpInput(false);
                          }}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-70"
                        />
                      </div>
                      {!isPhoneVerified && (
                        <button
                          type="button"
                          disabled={addressForm.phone.length !== 10 || isSendingOtp}
                          onClick={handleSendOtpClick}
                          className="flex w-full sm:w-32 py-2.5 sm:py-0 items-center justify-center rounded-xl bg-orange-100 px-3 text-xs font-bold text-orange-600 transition-colors hover:bg-orange-200 disabled:bg-gray-100 disabled:text-gray-400 shrink-0"
                        >
                          {isSendingOtp ? <Loader size={16} className="animate-spin" /> : showOtpInput ? 'Resend OTP' : 'Verify Number'}
                        </button>
                      )}
                    </div>
                    {addressErrors.phone && (
                      <p className="mt-1 text-xs text-red-500">{addressErrors.phone}</p>
                    )}

                    {showOtpInput && !isPhoneVerified && (
                      <div className="mt-3 flex items-center gap-2 rounded-xl bg-orange-50 p-3">
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
                          className="flex h-full min-h-[38px] flex-0  items-center justify-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600 disabled:opacity-70"
                        >
                          {isVerifyingOtp ? <Loader size={16} className="animate-spin" /> : 'Verify OTP'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="my-2 border-t border-gray-100 pt-4">
                    <h5 className="mb-3 text-sm font-semibold text-gray-700">Address Details</h5>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          House / Flat No.
                        </label>
                        <div className="relative">
                          <Home className="absolute left-3 top-3 text-gray-400" size={18} />
                          <input
                            type="text"
                            placeholder="Flat 101, building name"
                            value={addressForm.houseNo}
                            onChange={(e) =>
                              setAddressForm({ ...addressForm, houseNo: e.target.value })
                            }
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        {addressErrors.houseNo && (
                          <p className="mt-1 text-xs text-red-500">{addressErrors.houseNo}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Street / Area
                        </label>
                        <input
                          type="text"
                          placeholder="Sector, street name"
                          value={addressForm.street}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, street: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        {addressErrors.street && (
                          <p className="mt-1 text-xs text-red-500">{addressErrors.street}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Near central park"
                          value={addressForm.landmark}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, landmark: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          Town / City
                        </label>
                        <input
                          type="text"
                          placeholder="City"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        {addressErrors.city && (
                          <p className="mt-1 text-xs text-red-500">{addressErrors.city}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-500">
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="State"
                          value={addressForm.state}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, state: e.target.value })
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        {addressErrors.state && (
                          <p className="mt-1 text-xs text-red-500">{addressErrors.state}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="hidden" id="addr-submit-btn" />
              </form>
            )}

            {/* STEP 3: MEMBERS */}
            {step === 3 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">
                    Add Members receiving test (Total {expectedMemberCount})
                  </h4>
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600">
                    {members.length} / {expectedMemberCount} Members
                  </span>
                </div>

                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Left: Add Members Form (60%) */}
                  <div className="w-full md:w-[60%]">
                    {members.length < expectedMemberCount ? (
                      <form
                        onSubmit={handleAddMember}
                        className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5"
                      >
                        <h5 className="text-sm font-bold text-gray-700">New Member Details</h5>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                          <div className="order-1 md:order-1 md:col-span-3">
                            <label className="mb-1 block text-xs font-bold text-gray-500">
                              Full Name
                            </label>
                            <input
                              type="text"
                              placeholder="Member's full name"
                              value={newMember.name}
                              onChange={(e) => setNewMember({ ...newMember, name: e.target.value.replace(/[^a-zA-Z ]/g, '') })}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                          </div>

                          <div className="order-5 md:order-2 md:col-span-3">
                            <label className="mb-1 block text-xs font-bold text-gray-500">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              maxLength={10}
                              placeholder="10-digit number"
                              value={newMember.phone}
                              onChange={(e) => setNewMember({ ...newMember, phone: e.target.value.replace(/[^0-9]/g, '') })}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                          </div>

                          <div className="order-2 md:order-3 md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-gray-500">
                              Age
                            </label>
                            <input
                              type="number"
                              placeholder="Age in years"
                              value={newMember.age}
                              onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                          </div>

                          <div className="order-3 md:order-4 md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-gray-500">
                              Gender
                            </label>
                            <select
                              value={newMember.gender}
                              onChange={(e) =>
                                setNewMember({ ...newMember, gender: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Others</option>
                            </select>
                          </div>

                          <div className="order-4 md:order-5 md:col-span-2">
                            <label className="mb-1 block text-xs font-bold text-gray-500">
                              Relation to User
                            </label>
                            <select
                              value={newMember.relation}
                              onChange={(e) =>
                                setNewMember({ ...newMember, relation: e.target.value })
                              }
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                            >
                              <option>Self</option>
                              <option>Spouse</option>
                              <option>Child</option>
                              <option>Parent</option>
                              <option>Grand parent</option>
                              <option>Sibling</option>
                              <option>Friend</option>
                              <option>Native</option>
                              <option>Neighbour</option>
                              <option>Colleague</option>
                              <option>Others</option>
                            </select>
                          </div>

                          <div className="order-6 md:col-span-6">
                            <label className="mb-1 block text-xs font-bold text-gray-500">
                              Selected Test
                            </label>
                            <div className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700">
                              {selectedPackages[0]?.name || 'Test Package'}
                            </div>
                          </div>
                        </div>

                        {memberError && (
                          <p className="text-xs font-medium text-red-500">{memberError}</p>
                        )}

                        <button
                          type="submit"
                          className="mt-2 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-orange-500 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                        >
                          <Plus size={16} />
                          Add Member
                        </button>
                      </form>
                    ) : (
                      <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-sm text-gray-500">
                        Maximum member limit reached ({expectedMemberCount} members). Please proceed to scheduling.
                      </p>
                    )}
                  </div>

                  {/* Right: Added Members List (40%) */}
                  <div className="flex w-full flex-col gap-3 md:w-[40%]">
                    <h5 className="text-sm font-bold text-gray-700">Added Members</h5>
                    {members.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {members.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                          >
                            <div>
                              <p className="text-sm font-bold text-gray-900">{m.name}</p>
                              <p className="mt-0.5 text-[11px] text-gray-500">
                                {m.phone} • {m.gender} • {m.age} Yrs • {m.relation}
                              </p>
                              <p className="mt-1 text-xs font-semibold text-orange-600">
                                Assigned: {card.find((p) => p.packageId === m.assignedTest)?.name || 'None'}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemoveMember(m.id)}
                              className="rounded-full p-1.5 text-red-500 transition-colors hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-xs text-gray-400">
                        No members added yet. Add details on the left.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: TIMING SELECTION */}
            {step === 4 && (
              <div className="flex flex-col gap-6">
                {/* Date Selection */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                    <Calendar size={18} className="text-orange-500" />
                    Select Appointment Date
                  </h4>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {getNext7Days().map((d) => {
                      const isSel = selectedDate === d.formatted;
                      return (
                        <button
                          key={d.formatted}
                          onClick={() => setSelectedDate(d.formatted)}
                          className={`flex min-w-[70px] flex-col items-center justify-center rounded-2xl border px-2 py-3.5 transition-all ${
                            isSel
                              ? 'border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/20'
                              : 'border-gray-100 bg-white text-gray-700 hover:border-orange-200'
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

                {/* Slot Selection */}
                <div>
                  <h4 className="mb-4 flex items-center gap-2 font-semibold text-gray-800">
                    <Clock size={18} className="text-orange-500" />
                    Select Time Slot
                  </h4>

                  {/* Morning Slots */}
                  <div className="mb-5">
                    <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Morning Slots (06:00 AM - 11:00 AM)
                    </h5>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {morningSlots.map((slot) => {
                        const isSel = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`flex items-center justify-between rounded-xl border p-4 text-sm font-semibold transition-all ${
                              isSel
                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                : 'border-gray-100 bg-white text-gray-700 hover:border-orange-200'
                            }`}
                          >
                            <span>{slot}</span>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                                isSel
                                  ? 'border-orange-500 bg-orange-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isSel && <Check size={12} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div>
                    <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Evening Slots (05:00 PM - 10:00 PM)
                    </h5>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {eveningSlots.map((slot) => {
                        const isSel = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`flex items-center justify-between rounded-xl border p-4 text-sm font-semibold transition-all ${
                              isSel
                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                : 'border-gray-100 bg-white text-gray-700 hover:border-orange-200'
                            }`}
                          >
                            <span>{slot}</span>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                                isSel
                                  ? 'border-orange-500 bg-orange-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isSel && <Check size={12} />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: PAYMENT SUMMARY */}
            {step === 5 && (
              <div className="flex flex-col gap-5">
                <h4 className="font-semibold text-gray-800">Booking Summary & Checkout</h4>

                {/* Package Breakdown */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <h5 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Packages Selected
                  </h5>
                  <div className="flex flex-col gap-3">
                    {selectedPackages.map((pkg) => (
                      <div
                        key={pkg.packageId}
                        className="flex items-start sm:items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0 gap-2"
                      >
                        <div className="flex-1 pr-2">
                          <p className="text-sm font-bold text-gray-900">{pkg.name}</p>
                          <p className="text-xs text-gray-500">{pkg.description}</p>
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
                        <div className="flex items-center gap-3 shrink-0 whitespace-nowrap pt-1 sm:pt-0">
                          <span className="text-sm font-bold text-gray-900">{pkg.finalPrice}</span>
                          {selectedPackages.length > 1 && (
                            <button
                              onClick={() =>
                                setSelectedPackages(
                                  selectedPackages.filter((p) => p.packageId !== pkg.packageId)
                                )
                              }
                              className="rounded-full p-1.5 text-red-500 transition-colors hover:bg-red-50"
                              title="Remove package"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details Summary */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Address Summary */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Location & Contact
                    </h5>
                    <p className="text-sm font-bold text-gray-900">{addressForm.name}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {addressForm.phone} • {addressForm.email}
                    </p>
                    <p className="mt-2 text-xs text-gray-600">
                      {addressForm.houseNo}, {addressForm.street},{' '}
                      {addressForm.landmark && `${addressForm.landmark}, `}
                      {addressForm.city}, {addressForm.state} - {addressForm.pincode}
                    </p>
                  </div>

                  {/* Booking Details Summary */}
                  <div className="rounded-2xl border border-gray-100 bg-white p-5">
                    <h5 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Booking Details
                    </h5>

                    <div className="mt-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <Calendar size={14} className="text-orange-500" />
                        <span>
                          Date: <span className="font-semibold text-gray-900">{selectedDate}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <Clock size={14} className="text-orange-500" />
                        <span>
                          Slot: <span className="font-semibold text-gray-900">{selectedTime}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <User size={14} className="text-orange-500" />
                        <span>
                          Members:{' '}
                          <span className="font-semibold text-gray-900">
                            {members.map((m) => m.name).join(', ')}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Members Management */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Members receiving test ({members.length} / {expectedMemberCount})
                    </h5>
                    {members.length !== expectedMemberCount && (
                      <span className="text-[10px] font-bold text-red-500">
                        Please add exactly {expectedMemberCount} member(s)
                      </span>
                    )}
                  </div>

                  {/* List of current members with Remove option */}
                  {members.length > 0 ? (
                    <div className="mb-4 grid gap-2 md:grid-cols-3">
                      {members.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-3"
                        >
                          <div>
                            <p className="text-xs font-bold text-gray-900">{m.name}</p>
                            <p className="text-[10px] text-gray-500">
                              {m.phone} • {m.gender} • {m.age} Yrs • {m.relation}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(m.id)}
                            className="rounded-full p-1 text-red-500 transition-colors hover:bg-red-100"
                            title="Remove Member"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mb-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-500">
                      No members added. Please add at least one member below.
                    </p>
                  )}

                  {/* Add Member Form (if < expectedMemberCount) */}
                  {members.length < expectedMemberCount ? (
                    <form
                      onSubmit={handleAddMember}
                      className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
                    >
                      <h6 className="mb-3 text-xs font-bold text-gray-700">Add New Member</h6>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
                        <div className="order-1 md:order-1">
                          <label className="mb-1 block text-[10px] font-bold text-gray-500">
                            Full Name
                          </label>
                          <input
                            type="text"
                            placeholder="Full name"
                            value={newMember.name}
                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value.replace(/[^a-zA-Z ]/g, '') })}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div className="order-5 md:order-2">
                          <label className="mb-1 block text-[10px] font-bold text-gray-500">
                            Phone
                          </label>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="10-digit number"
                            value={newMember.phone}
                            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value.replace(/[^0-9]/g, '') })}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div className="order-2 md:order-3">
                          <label className="mb-1 block text-[10px] font-bold text-gray-500">
                            Age
                          </label>
                          <input
                            type="number"
                            placeholder="Age"
                            value={newMember.age}
                            onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                        <div className="order-3 md:order-4">
                          <label className="mb-1 block text-[10px] font-bold text-gray-500">
                            Gender
                          </label>
                          <select
                            value={newMember.gender}
                            onChange={(e) => setNewMember({ ...newMember, gender: e.target.value })}
                            className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Others</option>
                          </select>
                        </div>
                        <div className="order-4 md:order-5">
                          <label className="mb-1 block text-[10px] font-bold text-gray-500">
                            Relation
                          </label>
                          <select
                            value={newMember.relation}
                            onChange={(e) =>
                              setNewMember({ ...newMember, relation: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            <option>Self</option>
                            <option>Spouse</option>
                            <option>Child</option>
                            <option>Parent</option>
                            <option>Grand parent</option>
                            <option>Sibling</option>
                            <option>Friend</option>
                            <option>Native</option>
                            <option>Neighbour</option>
                            <option>Colleague</option>
                            <option>Others</option>
                          </select>
                        </div>
                      </div>

                      {memberError && (
                        <p className="mt-2 text-xs font-medium text-red-500">{memberError}</p>
                      )}

                      <button
                        type="submit"
                        className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-orange-500 px-4 py-1.5 text-xs font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                      >
                        <Plus size={12} />
                        Add Member
                      </button>
                    </form>
                  ) : (
                    <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-3 text-center text-xs text-gray-500">
                      Maximum member limit reached ({expectedMemberCount} members).
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Persistent Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 border-t border-gray-100 bg-white p-6 shadow-lg">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total Amount
              </p>
              <p className="text-2xl font-black text-gray-900">
                ₹{getTotalAmount().toLocaleString('en-IN')}
              </p>
            </div>

            <div>
              {step === 1 && (
                <button
                  onClick={() => setStep(2)}
                  disabled={selectedPackages.length === 0}
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                >
                  Proceed to Address
                  <ChevronRight size={16} />
                </button>
              )}

              {step === 2 && (
                <button
                  onClick={() => {
                    // Trigger native form validation
                    const btn = document.getElementById('addr-submit-btn');
                    if (btn) btn.click();
                  }}
                  disabled={isSendingOtp || isVerifyingOtp}
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                >
                  {isSendingOtp || isVerifyingOtp ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Processing...
                    </>
                  ) : showOtpInput ? (
                    <>
                      Verify & Proceed
                      <ChevronRight size={16} />
                    </>
                  ) : (
                    <>
                      Proceed to Members
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              )}

              {step === 3 && (
                <button
                  onClick={() => setStep(4)}
                  disabled={members.length !== expectedMemberCount}
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                >
                  Proceed to Timing
                  <ChevronRight size={16} />
                </button>
              )}

              {step === 4 && (
                <button
                  onClick={() => setStep(5)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                >
                  Confirm Details
                  <ChevronRight size={16} />
                </button>
              )}

              {step === 5 && (
                <button
                  onClick={handleRazorpayPayment}
                  disabled={isPaying || members.length !== expectedMemberCount}
                  className="flex items-center gap-2 rounded-2xl bg-orange-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none"
                >
                  {isPaying ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Paying...
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      Pay Now & Book
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Tests Modal */}
      {viewTestsPkg && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div
            className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-5">
              <h2 className="text-lg font-bold text-gray-900">{viewTestsPkg.name} - Included Tests</h2>
              <button
                onClick={() => setViewTestsPkg(null)}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                {viewTestsPkg.tests.map((testGroup, idx) => (
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
}

export default DiagnosisBookForm;
