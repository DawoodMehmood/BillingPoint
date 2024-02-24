import React, { useState } from "react";
import Modal from "../utils/modal";
import Login from "../pages/login";
import Signup from "../pages/signup";

function Jumbotron() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

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
  return (
    <>
      <div className="head-section relative text-center text-white">
        <img
          src="https://www.invoicefetcher.com/files/images/header/main-lg.jpg"
          alt="Background"
          className="background-image w-full h-auto object-cover"
        />
        <div className="absolute top-40 left-32">
          <div className="font-bold text-4xl text-slate-700">
            Download your bills and automate <br></br>your accounting today
          </div>
          <br></br>
          <br></br>
          <br></br>

          <button
            className="cta-button bg-celestial-blue text-white font-bold rounded px-5 py-2 text-xl"
            onClick={openSignUp}
          >
            Register Now!
          </button>
        </div>
      </div>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Login onSignUpClick={openSignUp} onClose={handleLoginClose} />
      </Modal>
      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <Signup onLoginClick={openLogin} onClose={handleSignupClose} />
      </Modal>
    </>
  );
}

export default Jumbotron;
