import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/context/AuthContext';

const ProtectedProvider = ({ children }) => {
  const { user } = useAuth(); // <-- Lấy cả `user` từ context
 
  if (!user ) {
    return <Navigate to="/login" replace/>;
  }
  
  return children;
};

export default ProtectedProvider;