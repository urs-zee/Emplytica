import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { myContext } from "../../../context/MyContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(myContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
