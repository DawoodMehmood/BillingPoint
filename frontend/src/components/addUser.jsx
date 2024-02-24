import React, { useState } from "react";
import BACKEND_URL from "../utils/config";
import { showToast } from "../utils/toast";

const AddUser = ({ onClose, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    pepcoAccountNo: "",
    washgasAccountNo: "",
    wsscAccountNo: "",
    companyName: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("form data", formData);
    // if (formData.role === "admin") {
    //   setFormData({
    //     ...formData,
    //     pepcoAccountNo: "",
    //     washgasAccountNo: "",
    //     wsscAccountNo: "",
    //     companyName: "",
    //   });
    // }
    formData.role = "user";

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      console.log("response", response);
      if (response.ok) {
        const jsonResponse = await response.json();
        showToast(`${jsonResponse.message}`, "success");
        onUpdate();
        onClose();
      } else {
        showToast(`Server Error: ${response.message}`, "error");
        console.error("Servor Error", response.message);
      }
    } catch (error) {
      showToast(`Server Error: ${error}`, "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" text-black flex flex-col items-center font-semibold"
      >
        <h1 className="text-2xl font-bold mb-2">Add User</h1>
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
          <div className="form-group flex justify-between items-center">
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
          <div className="form-group flex justify-between items-center">
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
          <div className="form-group flex justify-between items-center">
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
            <p className="flex-1 text-left mr-4">Role</p>
            <div className="flex-1 flex">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  id="userRole"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                  required
                  className="mr-2"
                />
                <label htmlFor="userRole">User</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="adminRole"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                  required
                  className="mr-2"
                />
                <label htmlFor="adminRole">Admin</label>
              </div>
            </div>
          </div> */}

          <div className="text-center">
            <button
              type="submit"
              className={`bg-celestial-blue text-white font-bold px-5 py-1 rounded ${
                isLoading ? "cursor-progress" : "cursor-pointer"
              }`}
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
