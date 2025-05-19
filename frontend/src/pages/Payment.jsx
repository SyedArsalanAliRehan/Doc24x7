import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate('/bill');
  };

  return (
    <div className="text-center mt-40">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
      <p className="mb-6">Amount: ₹500</p>
      <button onClick={handlePay} className="bg-purple-600 text-white px-6 py-2 rounded">Pay Now</button>
    </div>
  );
}
