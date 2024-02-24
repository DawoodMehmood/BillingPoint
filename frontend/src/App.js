import React from "react";
import "./App.css";
import Home from "./pages/home";
import User from "./pages/user";
import Admin from "./pages/admin";
import Navbar from "./components/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

function App() {
  const { isLoggedIn, user } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/user/bills"
          element={
            isLoggedIn && user.role === "user" ? (
              <User />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isLoggedIn && user.role === "admin" ? (
              <Admin />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        {!isLoggedIn && <Route path="*" element={<Navigate to="/home" />} />}
      </Routes>
    </>
  );
}

export default App;
