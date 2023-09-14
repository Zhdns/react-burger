import { ReactNode, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  condition: boolean;
  redirectTo: string;
}

const PrivateRoute = ({ children, condition, redirectTo} : PrivateRouteProps): ReactElement | null => {
  const location = useLocation();

  
  if (condition) {
    return <>{children}</>; 
  } else {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }
};
  


export default PrivateRoute;