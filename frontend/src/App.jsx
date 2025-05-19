import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Bill from './pages/Bill';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </Router>
  );
}
