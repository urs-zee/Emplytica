import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/hero/Home";
import About from "../components/about/About";
import Login from "../components/login/Login";
import AddEmp from "../components/addEmp/AddEmp";
import UpdateEmp from "../components/updateEmp/UpdateEmp";
import Register from "../components/register/Register";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

export default function RoutePath() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/addEmp"
          element={
            <ProtectedRoute>
              <AddEmp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateEmp/:id"
          element={
            <ProtectedRoute>
              <UpdateEmp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
