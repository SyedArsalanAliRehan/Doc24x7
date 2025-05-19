import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-40">
      <h1 className="text-4xl font-bold mb-8">Doc24x7</h1>
      <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-6 py-2 rounded mr-4">Sign Up</button>
      <button onClick={() => navigate('/login')} className="bg-gray-800 text-white px-6 py-2 rounded">Login</button>
    </div>
  );
}
