import { getItem } from '@helpers' 
import { Navigate } from 'react-router-dom'
import type { ProtectedRoute } from '@types';

const LayoutProtect = ({children}: ProtectedRoute) => {
  const isAuthenticated = getItem("access_token");
  if (!isAuthenticated) {
    return <Navigate to="/"></Navigate>;
  }
  return children
};

export default LayoutProtect;