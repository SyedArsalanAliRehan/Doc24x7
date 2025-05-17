import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://13.126.224.178:3000/signup', form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        className="border p-2 w-full"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full">
        Sign Up
      </button>
      {msg && <p className="text-sm text-green-600 mt-2">{msg}</p>}
    </form>
  );
}
