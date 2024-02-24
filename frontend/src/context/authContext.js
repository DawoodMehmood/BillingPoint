import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from "../utils/verifyToken";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(verifyToken(token));
  const [user, setUser] = useState(() => {
    if (verifyToken(token)) {
      const decoded = jwtDecode(token);
      return decoded.role === "admin"
        ? { firstName: decoded.firstName, role: decoded.role }
        : {
            id: decoded.id,
            firstName: decoded.firstName,
            role: decoded.role,
            pepcoAccountNo: decoded.pepcoAccountNo,
            washgasAccountNo: decoded.washgasAccountNo,
            wsscAccountNo: decoded.wsscAccountNo,
          };
    }
    return null;
  });
  const navigate = useNavigate();

  const login = (token) => {
    console.log("login");
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
    const decoded = jwtDecode(token);
    console.log("decoded", decoded);
    setIsLoggedIn(true);
    if (decoded.role === "admin") {
      setUser({ firstName: decoded.firstName, role: decoded.role });
      navigate("/admin/dashboard");
    } else {
      setUser({
        id: decoded.id,
        firstName: decoded.firstName,
        role: decoded.role,
        pepcoAccountNo: decoded.pepcoAccountNo,
        washgasAccountNo: decoded.washgasAccountNo,
        wsscAccountNo: decoded.wsscAccountNo,
      });
      navigate("/user/bills");
    }
  };

  const logout = async () => {
    console.log("logout");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/home");
  };

  useEffect(() => {
    const isTokenValid = verifyToken(token);
    setIsLoggedIn(isTokenValid);

    if (!isTokenValid) {
      logout(); // This will clean up the session and redirect as needed
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
