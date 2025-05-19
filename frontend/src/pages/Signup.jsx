import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://13.232.235.112:3000/signup', form);
      alert('Signup successful!');
      localStorage.setItem('username', form.name);
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
