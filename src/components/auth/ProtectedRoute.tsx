
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Improved check that doesn't cause extra renders
  useEffect(() => {
    // If user state changes to null after initial render, redirect programmatically
    if (user === null) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user, navigate, location]);

  // Initial check - if not authenticated, redirect to login page
  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
