import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://13.126.224.178:3001/doctors')
      .then((res) => setDoctors(res.data))
      .catch((err) => setError('Could not load doctors ❌'));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Available Doctors</h2>
      {error && <p className="text-red-500">{error}</p>}
      {doctors.map((doc) => (
        <div key={doc.id} className="border rounded p-4 shadow">
          <p className="text-lg font-bold">{doc.name}</p>
          <p className="text-gray-700">Specialty: {doc.specialty}</p>
          <p className="text-gray-500 text-sm">Available: {doc.availableDates.join(', ')}</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded">
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
}
