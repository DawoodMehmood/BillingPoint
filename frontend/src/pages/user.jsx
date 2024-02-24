import React, { useState } from "react";
import Bills from "../components/bills";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Modal from "../utils/modal";
import UpdateAccounts from "../components/updateAccounts";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const triggerBillsUpdate = () => {
    setUpdateTrigger((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-end mr-10 mt-10">
        <button
          onClick={() => handleUpdateClick()}
          className={`bg-magenta text-white font-bold px-5 py-2 rounded`}
        >
          Update Accounts&nbsp;
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
      <Bills updateTrigger={updateTrigger} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UpdateAccounts
          onClose={handleModalClose}
          onUpdate={triggerBillsUpdate}
        />
      </Modal>
    </div>
  );
};

export default User;
