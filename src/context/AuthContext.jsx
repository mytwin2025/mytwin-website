import React, { createContext, useContext, useState, useEffect } from 'react';
import makeApiCall from '../utils/makeApiCall';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);
  
  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Callback when authentication is successfully completed
  const [authSuccessCallback, setAuthSuccessCallback] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      fetchProfile();
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await makeApiCall('user/me', 'GET');
      if (response && response.data) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // If unauthorized, clear token
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken, userData) => {
    setToken(newToken);
    if (userData) setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Provide a callback to run after successful login and profile completion
  const openLogin = (onSuccess = null) => {
    setAuthSuccessCallback(() => onSuccess);
    setIsLoginModalOpen(true);
  };

  const closeLogin = () => {
    setIsLoginModalOpen(false);
    setAuthSuccessCallback(null);
  };

  const handleAuthSuccess = () => {
    setIsLoginModalOpen(false);
    if (authSuccessCallback) {
      authSuccessCallback();
      setAuthSuccessCallback(null);
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await makeApiCall('user/update-profile', 'POST', data);
      setUser(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        fetchProfile,
        updateProfile,
        isLoginModalOpen,
        openLogin,
        closeLogin,
        handleAuthSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
