import { useState } from 'react';
import { useRazorpay } from 'react-razorpay';
import { RAZORPAY_KEY } from '../constants/constants';
const RazorpayButton = ({
  amount,
  name,
  mobileNumber,
  email,
  style = {}
}) => {
  const { error, isLoading, Razorpay } = useRazorpay();
  const [paying, setPaying] = useState(false);

  const handlePayment = () => {
    if (error) {
      alert('Razorpay failed to load');
      setPaying(false);
      return;
    }

    if (!Razorpay) {
      alert('Razorpay is loading. Please wait a moment and try again.');
      setPaying(false);
      return;
    }

    setPaying(true);

    const options = {
      key: RAZORPAY_KEY,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'MyTwin-Parents Diabetes Care',
      description: '',
      handler: function (response) {
        console.log('Payment success:', response);
        alert(`Payment successful: ${response.razorpay_payment_id}`);
        setPaying(false);
      },
      prefill: {
        name: name,
        email: email,
        contact: mobileNumber,
      },
      notes: {
        purpose: 'Frontend only test payment',
      },
      theme: {
        color: '#000000',
      },
      modal: {
        ondismiss: function () {
          console.log('Checkout closed');
          setPaying(false);
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open().then(() => {
      console.log('Payment process initiated');
    }).catch((err) => {
      console.error('Payment failed:', err);
      alert('Payment failed. Please try again.');
      setPaying(false);
    }).finally(() => {
      setPaying(false);
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={paying}
      style={style}
      className="rounded-full bg-black px-4 py-2 text-white disabled:opacity-50"
    >
      {paying ? 'Loading...' : 'Book Now'}
    </button>
  );
};

export default RazorpayButton;