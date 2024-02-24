import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { showToast } from "../utils/toast";
import Modal from "../utils/modal";
import Login from "../pages/login";
import Signup from "../pages/signup";
import { useAuth } from "../context/authContext";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const openLogin = () => {
    setIsSignUpOpen(false); // Ensure only one modal is open at a time
    setIsLoginOpen(true);
  };

  const openSignUp = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignupClose = () => {
    setIsSignUpOpen(false);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    showToast("Logged Out Successfully", "success");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown
      }
    }

    if (showDropdown) {
      // Add event listener when the dropdown is open
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the dropdown is closed or the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]); // Re-run when showDropdown changes

  return (
    <nav className="navbar bg-celestial-blue flex justify-between items-center text-white font-bold h-20 px-10">
      <div className="navbar-logo flex items-center gap-2">
        <Link to="/" className="text-xl italic">
          BillingHub
        </Link>{" "}
        <FontAwesomeIcon icon={faSackDollar} className="text-2xl" />
      </div>
      {/* <ul className="navbar-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
      </ul> */}
      <div className="navbar-user">
        {isLoggedIn ? (
          <>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="user-info flex items-center gap-5 cursor-pointer"
            >
              <span className="">{user?.firstName}</span>
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
            </div>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="dropdown-menu absolute flex flex-col justify-between items-center mt-5 bg-white shadow-md min-w-32 p-5 text-black gap-5 z-10 right-5"
              >
                <a href="/user/bills" onClick={() => setShowDropdown(false)}>
                  Bills
                </a>
                <div className="flex gap-2 items-center">
                  <button onClick={handleLogout}>Logout</button>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-5">
            <div
              className="bg-white text-celestial-blue rounded px-3 py-1 cursor-pointer"
              onClick={openLogin}
            >
              <button>Login</button>
            </div>
            <div>|</div>
            <div className="flex items-center gap-2 hover: cursor-pointer">
              <button onClick={openSignUp}>Sign Up</button>
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login onSignUpClick={openSignUp} onClose={handleLoginClose} />
      </Modal>
      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <Signup onLoginClick={openLogin} onClose={handleSignupClose} />
      </Modal>
    </nav>
  );
}

export default Navbar;
