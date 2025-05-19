import React, { useEffect } from 'react';

export default function Bill() {
  const booking = JSON.parse(localStorage.getItem('booking'));

  useEffect(() => {
    fetch('http://35.154.62.90:3005/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `Booking confirmed with Dr. ${booking?.doctor?.name}` })
    });
  }, [booking]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-xl font-bold mb-4">Bill</h2>
      <p><strong>Doctor:</strong> {booking?.doctor?.name}</p>
      <p><strong>Patient:</strong> {booking?.name}</p>
      <p><strong>Amount Paid:</strong> ₹500</p>
      <p className="mt-4 text-green-700">✅ Notification Sent</p>
    </div>
  );
}
