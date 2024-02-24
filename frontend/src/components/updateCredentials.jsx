import React, { useState, useEffect } from "react";
import BACKEND_URL from "../utils/config";
import { showToast } from "../utils/toast";

const UpdateCredentials = ({ userData, onClose, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    pepcoAccountNo: "",
    washgasAccountNo: "",
    wsscAccountNo: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        pepcoAccountNo: userData.pepcoAccountNo || "",
        washgasAccountNo: userData.washgasAccountNo || "",
        wsscAccountNo: userData.wsscAccountNo || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/update/${userData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        onUpdate({ ...userData, ...formData });
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
    <div>
      <form
        onSubmit={handleSubmit}
        className=" text-black flex flex-col items-center gap-5 font-semibold"
      >
        <h1 className="text-2xl font-bold">Update Credentials</h1>
        <div className="space-y-2">
          <div className="form-group flex justify-between items-center">
            <label htmlFor="firstName" className="flex-1 text-left mr-4">
              Firstname
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              readOnly
              className="flex-2 px-2 border-2 rounded outline-none font-normal text-gray-500 hover:cursor-not-allowed"
            />
          </div>
          <div className="form-group flex flex-row justify-between gap-2">
            <label htmlFor="lastName" className="flex-1 text-left mr-4">
              Lastname
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              readOnly
              className="flex-2 px-2 border-2 rounded outline-none font-normal text-gray-500 hover:cursor-not-allowed"
            />
          </div>

          <div className="form-group flex flex-row justify-between gap-2">
            <label htmlFor="pepcoAccountNo" className="flex-1 text-left mr-4">
              Pepco Acc No.
            </label>
            <input
              type="text"
              name="pepcoAccountNo"
              value={formData.pepcoAccountNo}
              onChange={handleChange}
              className="flex-2 px-2 border-2 rounded outline-none font-normal"
            />
          </div>
          <div className="form-group flex flex-row justify-between gap-2">
            <label htmlFor="washgasAccountNo" className="flex-1 text-left mr-4">
              Washgas Acc No.
            </label>
            <input
              type="text"
              name="washgasAccountNo"
              value={formData.washgasAccountNo}
              onChange={handleChange}
              className="flex-2 px-2 border-2 rounded outline-none font-normal"
            />
          </div>
          <div className="form-group flex flex-row justify-between gap-2">
            <label htmlFor="wsscAccountNo" className="flex-1 text-left mr-4">
              WSSC Acc No.
            </label>
            <input
              type="text"
              name="wsscAccountNo"
              value={formData.wsscAccountNo}
              onChange={handleChange}
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
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCredentials;
