import React, { useState } from "react";
import BACKEND_URL from "../utils/config";
import { showToast } from "../utils/toast";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function Login({ onSignUpClick, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        login(jsonResponse.token);
        showToast(`${jsonResponse.message}`, "success");
        onClose();
      } else {
        // Handle login failure
        showToast("Incorrect Email or Password!", "error");
        console.error("Incorrect Email or Password");
      }
    } catch (error) {
      showToast(`Server Error: ${error}`, "error");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="login-form text-black flex flex-col items-center gap-5 w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-5">Login</h1>
        <div className="space-y-4">
          <div className="form-group flex justify-between items-center">
            <label htmlFor="email" className="flex-1 text-left mr-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-2 px-2 border-2 rounded outline-none font-normal"
            />
          </div>
          <div className="form-group flex justify-between items-center">
            <label htmlFor="password" className="flex-1 text-left mr-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-2 px-2 border-2 rounded outline-none font-normal"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`bg-celestial-blue text-white font-bold px-5 py-1 rounded ${
                isLoading ? "cursor-progress" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          <div className="font-semibold">
            Don't have an account yet?&nbsp;&nbsp;
            <button
              type="button"
              onClick={onSignUpClick}
              className="text-celestial-blue"
            >
              Sign Up&nbsp;
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
