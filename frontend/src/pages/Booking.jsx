import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function Booking() {
  const [form, setForm] = useState({ name: '', age: '', number: '' });
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  if (!doctor) return <Navigate to="/home" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      patientName: form.name,
      patientAge: form.age,
      patientContact: form.number,
      doctorId: doctor.id,
      doctorName: doctor.name,
    };

    try {
      await axios.post('http://35.154.62.90:3003/appointments', appointment);
      localStorage.setItem('booking', JSON.stringify({ ...form, doctor }));
      navigate('/payment');
    } catch (error) {
      console.error('Failed to save appointment:', error);
      alert('Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Booking with Dr. {doctor.name}</h2>

      <input
        name="name"
        placeholder="Patient Name"
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        name="number"
        placeholder="Phone Number"
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Proceed to Payment
      </button>
    </form>
  );
}
