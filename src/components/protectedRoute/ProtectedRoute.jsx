import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { mycontext } from "../../../context/MyContext"; // ✅ Make sure this path is correct

function ProtectedRoute({ children }) {
  const { user } = useContext(mycontext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
