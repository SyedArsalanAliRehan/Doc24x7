import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [username, setUsername] = useState('');
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) setUsername(savedUser);

    axios.get('http://35.154.62.90:3001/doctors')
      .then((res) => setDoctors(res.data))
      .catch(() => console.log("Could not fetch doctors"));
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-6">
      <h2 className="text-2xl font-bold text-blue-700">Welcome, {username}</h2>

      <h3 className="text-xl font-semibold">Available Doctors</h3>
      {doctors.map((doc) => (
        <div key={doc.id} className="border rounded p-4 shadow">
          <p className="font-bold">{doc.name}</p>
          <p className="text-sm text-gray-600">Specialty: {doc.specialty}</p>
          <p className="text-sm text-gray-500">Available: {doc.availableDates?.join(', ')}</p>

          <button
            onClick={() => navigate('/book', { state: { doctor: doc } })}
            className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
}
