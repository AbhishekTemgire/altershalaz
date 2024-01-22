import { Outlet, Navigate } from 'react-router-dom';

const AdminRouteGuard = () => {
  // Retrieve the admin status from local storage
  const isAdmin = localStorage.getItem('admin') === 'true';

  return isAdmin ? <Outlet /> : <Navigate to="/home" />;
};

export default AdminRouteGuard;
