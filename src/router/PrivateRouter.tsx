import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { AuthState } from "../app/slice/authSlice";
import Loader from "../common/Utilities/Loader";

interface Props {
  children: React.ReactNode;
}

const PrivateRouter: React.FC<Props> = ({ children }) => {
  const { token, success } = useAppSelector(AuthState);
  const location = useLocation();

  if (false) {
    return <Loader />;
  } else if (success && token) {
    return children;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

export default PrivateRouter;
