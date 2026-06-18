import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message, {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      break;
    case 'error':
      toast.error(message, {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      break;
    case 'warning':
      toast.warn(message, {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      break;
    default:
      toast.info(message, {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      break;
  }
};
