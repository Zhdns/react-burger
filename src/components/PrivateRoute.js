import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function PrivateRoute({ children, condition, redirectTo }) {
    const location = useLocation();

    return condition ? children : <Navigate to={redirectTo} state={{ from: location }} />;
}

export default PrivateRoute;