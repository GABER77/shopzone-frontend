import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loadingUserData } = useContext(UserContext);

  // While user authentication state is still loading, don’t render anything at all
  if (loadingUserData)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-[spin_0.3s_linear_infinite]"></div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
