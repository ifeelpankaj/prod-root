import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const useAdminAuth = () => {
    const { user } = useSelector((state) => state.auth);

    return {
        isAuthenticated: !!user,
        isAdmin: user?.role === 'Admin' || user?.role === 'admin',
        user
    };
};

export const AdminProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAdminAuth();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    if (!isAdmin) {
        return (
            <Navigate
                to="/unauthorized"
                replace
            />
        );
    }

    return children;
};
AdminProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export const PublicRoute = ({ children }) => {
    const { isAuthenticated, isAdmin } = useAdminAuth();

    if (isAuthenticated && isAdmin) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return children;
};
PublicRoute.propTypes = {
    children: PropTypes.node.isRequired
};
