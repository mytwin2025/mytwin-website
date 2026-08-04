import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export const sendMail = async (data) => {
  const response = await axios.post(`${BASE_URL}/misc/send-mail`, {
    to: 'info@mytwinlab.com',
    // subject: subject,
    data: data,
  });
  return response;
};

