import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DoctorList from './pages/DoctorList';

export default function App() {
  return (
    <Router>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Doc24x7</h1>

        {/* Simple nav menu */}
        <nav className="flex justify-center space-x-4 mb-8">
          <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/doctors" className="text-blue-600 hover:underline">Doctors</Link>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors" element={<DoctorList />} />
          {/* Add more routes here like /book, /payment, etc */}
        </Routes>
      </div>
    </Router>
  );
}
