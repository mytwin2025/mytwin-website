import React, { createContext, useContext, useState } from 'react';

export const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
  const [showExpertModal, setShowExpertModal] = useState(false);

  const handleOpenModal = () => {
    setShowExpertModal(true);
  };

  const handleCloseModal = () => {
    setShowExpertModal(false);
  };

  return (
    <ContactFormContext.Provider
      value={{
        showExpertModal,
        setShowExpertModal,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => {
  const context = useContext(ContactFormContext);
  if (!context) {
    throw new Error('useContactForm must be used within a ContactFormProvider');
  }
  return context;
};