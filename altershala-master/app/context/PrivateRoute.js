// PrivateRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Use 'next/router' instead of 'next/navigation'
import { toast } from 'react-hot-toast';
import { useAuth } from './ProtectRoute';


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      toast.error('You are not logged in. Please log in.');
      router.push('/auth/login');
    }
  }, [user, router]);

  return children;
};

export default PrivateRoute;
