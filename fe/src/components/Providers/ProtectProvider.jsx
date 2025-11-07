// src/components/auth/ProtectedPrivder.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/context/AuthContext';

const ProtectedProvider = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // Nếu không có user, điều hướng về trang login
    return <Navigate to="/login" replace />; 
    // `replace` giúp user không thể "back" lại trang private sau khi bị redirect
  }

  // Nếu có user, render component con (children)
  return children;
};

export default ProtectedProvider;