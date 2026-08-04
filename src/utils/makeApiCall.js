import axios from 'axios';
import { BASE_URL_APP } from '../constants/constants';
// const BASE_URL = 'https://api.mytwinlab.com/api/';
export const IMAGE_BASE_URL = 'https://mytwin-s3.s3.ap-south-1.amazonaws.com';

const makeApiCall = async (
  endpoint,
  method = 'GET',
  data = null,
  additionalHeaders = {},
) => {
  try {
    const token = localStorage.getItem('token');
    console.log("token ", token)
    console.log("Data : ", data)
    const headers = {
      ...additionalHeaders,
    };

    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Clean up the URL format slightly
    const url = `${BASE_URL_APP}/${endpoint}`
      .replace(/([^:]\/)\/+/g, "$1"); // removes duplicate slashes safely

    const requestConfig = {
      method,
      url,
      headers,
    };

    if (data !== null && data !== undefined) {
      requestConfig.data = data;
    }

    const response = await axios(requestConfig);
    return response;
  } catch (error) {
    // Return structured error
    throw error;
  }
};

export default makeApiCall;
