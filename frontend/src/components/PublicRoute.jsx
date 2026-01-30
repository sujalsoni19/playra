import { Navigate } from "react-router-dom";
import { useUsercontext } from "../context/UserContext.jsx";
import Loader from "./Loader.jsx";

function PublicRoute({ children }) {
  const { user, loading } = useUsercontext();

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;
