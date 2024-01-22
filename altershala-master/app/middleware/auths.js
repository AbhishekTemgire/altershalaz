import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/store';
import Cookies from 'js-cookie';

const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const username = useAuthStore.getState().auth.username;

  if (!username) {
    router.push('/auth/verifyEmail'); 
    return null; 
  }

  return children;
};

export default ProtectRoute;


export const logout = () => {
  Cookies.remove('token');
};

export const isAuthenticated = () => {
  const token = Cookies.get('token');
  return !!token;
};