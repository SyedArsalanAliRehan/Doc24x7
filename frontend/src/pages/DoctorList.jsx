import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form, setForm] = useState({ patientId: '', date: '', time: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://35.154.62.90:3001/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => setError('Could not load doctors ❌'));
  }, []);

  const handleBook = async () => {
    try {
      const res = await axios.post('http://35.154.62.90:3003/appointments', {
        ...form,
        doctorId: selectedDoctor.id,
      });
      setMessage(res.data.message || 'Appointment booked ✅');
      setSelectedDoctor(null); // close modal
      setForm({ patientId: '', date: '', time: '' });
    } catch (err) {
      setMessage('Booking failed ❌');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Available Doctors</h2>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
      {doctors.map((doc) => (
        <div key={doc.id} className="border rounded p-4 shadow">
          <p className="text-lg font-bold">{doc.name}</p>
          <p className="text-gray-700">Specialty: {doc.specialty}</p>
          <p className="text-gray-500 text-sm">Available: {doc.availableDates?.join(', ')}</p>
          <button
            onClick={() => setSelectedDoctor(doc)}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Book Appointment
          </button>
        </div>
      ))}

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-semibold mb-4">Book with {selectedDoctor.name}</h3>

            <input
              type="text"
              placeholder="Patient ID"
              value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}
              className="w-full border p-2 mb-2"
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border p-2 mb-2"
              required
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border p-2 mb-4"
              required
            />

            <div className="flex justify-between">
              <button
                onClick={handleBook}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setSelectedDoctor(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
