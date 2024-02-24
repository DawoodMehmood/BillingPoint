import React, { useState } from "react";
import BACKEND_URL from "../utils/config";
import { showToast } from "../utils/toast";
import { useAuth } from "../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function SignUp({ onLoginClick, onClose }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    adminCode: "",
    pepcoAccountNo: "",
    washgasAccountNo: "",
    wsscAccountNo: "",
    companyName: "",
  });
  const [showAdminCode, setShowAdminCode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (showAdminCode) {
      setFormData({
        ...formData,
        pepcoAccountNo: "",
        washgasAccountNo: "",
        wsscAccountNo: "",
        companyName: "",
      });
    }
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        login(jsonResponse.token);
        showToast(`${jsonResponse.message}`, "success");
        onClose();
      } else {
        showToast(`Server Error: ${response.message}`, "error");
        console.error("Servor Error", response.message);
      }
    } catch (error) {
      showToast(`Server Error: ${error}`, "error");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" text-black flex flex-col items-center gap-5"
    >
      <h1 className="text-2xl font-bold">Signup</h1>
      <div className="space-y-2">
        <div className="form-group flex justify-between items-center">
          <label htmlFor="firstName" className="flex-1 text-left mr-4">
            Firstname
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="flex-2 px-2 border-2 rounded outline-none font-normal"
          />
        </div>
        <div className="form-group flex justify-between items-center">
          <label htmlFor="lastName" className="flex-1 text-left mr-4">
            Lastname
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="flex-2 px-2 border-2 rounded outline-none font-normal"
          />
        </div>
        <div className="form-group flex justify-between items-center">
          <label htmlFor="email" className="flex-1 text-left mr-4">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="flex-2 px-2 border-2 rounded outline-none font-normal"
          />
        </div>
        {showAdminCode ? (
          <div className="form-group flex justify-between items-center">
            <label htmlFor="adminCode" className="flex-1 text-left mr-4">
              Admin Code
            </label>
            <input
              type="password"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              required={showAdminCode}
              className="flex-2 px-2 border-2 rounded outline-none font-normal"
            />
          </div>
        ) : (
          <>
            <div className="form-group flex justify-between items-center">
              <label htmlFor="companyName" className="flex-1 text-left mr-4">
                Company name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="(optional)"
                className="flex-2 px-2 border-2 rounded outline-none font-normal"
              />
            </div>
            {/* <div className="form-group flex justify-between items-center">
              <label htmlFor="pepcoAccountNo" className="flex-1 text-left mr-4">Pepco Acc No.</label>
              <input
                type="text"
                name="pepcoAccountNo"
                value={formData.pepcoAccountNo}
                onChange={handleChange}
                required={!showAdminCode}
                className="flex-2 px-2 border-2 rounded outline-none font-normal"
              />
            </div> */}
            {/* <div className="form-group flex justify-between items-center">
              <label htmlFor="washgasAccountNo" className="flex-1 text-left mr-4">Washgas Acc No.</label>
              <input
                type="text"
                name="washgasAccountNo"
                value={formData.washgasAccountNo}
                onChange={handleChange}
                required={!showAdminCode}
                className="flex-2 px-2 border-2 rounded outline-none font-normal"
              />
            </div> */}
            {/* <div className="form-group flex justify-between items-center">
              <label htmlFor="wsscAccountNo" className="flex-1 text-left mr-4">WSSC Acc No.</label>
              <input
                type="text"
                name="wsscAccountNo"
                value={formData.wsscAccountNo}
                onChange={handleChange}
                required={!showAdminCode}
                className="flex-2 px-2 border-2 rounded outline-none font-normal"
              />
            </div> */}
          </>
        )}

        <div className="text-center">
          <button
            type="submit"
            className={`bg-celestial-blue text-white font-bold px-5 py-1 rounded ${
              isLoading ? "cursor-progress" : "cursor-pointer"
            }`}
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>
        <div className="font-semibold text-center">
          Already have an account?&nbsp;
          <button
            type="button"
            onClick={onLoginClick}
            className="text-celestial-blue"
          >
            Login&nbsp;
            <FontAwesomeIcon icon={faArrowRightToBracket} />
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowAdminCode(!showAdminCode)}
            className="bg-gray-500 text-white text-sm px-2 py-1 rounded font-normal"
          >
            {showAdminCode ? "Signup as a user" : "Signup as an admin"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
