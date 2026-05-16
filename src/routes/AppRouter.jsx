import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout/Layout';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import Patients from '../pages/Patients';
import PatientProfile from '../pages/PatientProfile';
import Doctors from '../pages/Doctors';
import DoctorProfile from '../pages/DoctorProfile';
import Appointments from '../pages/Appointments';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:id" element={<DoctorProfile />} />
          <Route path="appointments" element={<Appointments />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
