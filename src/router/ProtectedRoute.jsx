import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, role }) => {
    const { userInfo } = useSelector(state => state.auth);

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }
    if (role && userInfo.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
