"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PrivateRoutes = ({children}) => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const isTokenValid = token ? true : false;

    if (!isTokenValid) {
      toast.error('You are not logged in. Please log in.');
      router.push('/');
    }
  }, []);

  return children;
};

export default PrivateRoutes;


