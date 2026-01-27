import { Navigate } from "react-router-dom";
import { useUsercontext } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useUsercontext();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
