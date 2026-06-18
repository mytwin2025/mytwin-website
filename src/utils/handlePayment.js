import { RAZORPAY_KEY, BASE_URL } from '../constants/constants';
import { useRazorpay } from 'react-razorpay';
import axios from 'axios';
export const handlePayment = async ({
  Razorpay,
  amount,
  currency = 'INR',
  handlePayment = () => {},
  name = 'My Twin Lab',
  description = 'Payment for services',
  order_id,
  userName = '',
  userEmail = '',
  userContact = '',
}) => {
  const options = {
    key: RAZORPAY_KEY,
    amount: amount, // Amount in paise
    currency: currency,
    name: name,
    description: description,
    order_id: order_id,
    prefill: {
      name: userName,
      email: userEmail,
      contact: userContact,
    },
    handler: async function (response) {
      return handlePayment(response);
    },
  };
  console.log('Razorpay options:', options);
  const rzp = new Razorpay(options);
  console.log('Opening Razorpay with options:', options);
  rzp.open();
};

export const createOrder = async (amount, currency = 'INR', data = {}) => {
  try {
    const payload = { amount, currency, ...data };
    console.log('Payload: ', payload);
    const response = await axios.post(`${BASE_URL}/payments/create-order`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  try {
    const payload = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    };
    const verifyResponse = await axios.post(`${BASE_URL}/payments/verify-payment`, payload);
    return verifyResponse.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};
