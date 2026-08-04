import makeApiCall from '../utils/makeApiCall';

export const createCoupon = async (couponData) => {
  return await makeApiCall('coupon', 'POST', couponData);
};

export const getAllCoupons = async () => {
  return await makeApiCall('coupon', 'GET');
};

export const getCouponByCode = async (code) => {
  return await makeApiCall(`coupon/${code}`, 'GET');
};

export const updateCoupon = async (id, couponData) => {
  return await makeApiCall(`coupon/${id}`, 'PUT', couponData);
};

export const deleteCoupon = async (id) => {
  return await makeApiCall(`coupon/${id}`, 'DELETE');
};

export const validateCoupon = async (validationData) => {
  return await makeApiCall('coupon/validate', 'POST', validationData);
};