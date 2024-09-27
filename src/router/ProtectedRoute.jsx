import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Role from '../constant/Role.js';

const ProtectedRoute = ({ children, role }) => {
  const { userInfo } = useSelector(state => state.auth);
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  if (role && userInfo.role !== role) {
    switch (userInfo.role) {
      case Role.ADMIN:
        return <Navigate to="/admin-management/dashboard" replace />;
      case Role.STAFF:
        return <Navigate to="/staff-management/contest" replace />;
      case Role.COMPETITOR:
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
