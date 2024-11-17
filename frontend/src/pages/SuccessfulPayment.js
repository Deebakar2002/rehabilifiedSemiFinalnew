// SuccessfulPayment.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessfulPayment = () => {
  const location = useLocation();
  const { message } = location.state || { message: "Payment successful!" };

  return (
    <div className="successful-payment">
      <h1>{message}</h1>
    </div>
  );
};

export default SuccessfulPayment;
