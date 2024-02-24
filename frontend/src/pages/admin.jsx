import React, { useState, useEffect } from "react";
import BACKEND_URL from "../utils/config";
import Table from "../components/table";
import ScrollToTopButton from "../components/scrollToTopButton";
import HashLoader from "react-spinners/HashLoader";
import Modal from "../utils/modal";
import UpdateCredentials from "../components/updateCredentials";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "../utils/toast";
import AddUser from "../components/addUser";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#058ED9",
};

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isDataEmpty = !users;

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete '${user.firstName} ${user.lastName}'?`
    );
    if (isConfirmed) {
      deleteUser(user.id);
    }
  };

  const updateUserInState = (updatedUserData) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUserData.id ? updatedUserData : user
      )
    );
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setUsers(jsonResponse);
        console.log("Data fetched successfully", jsonResponse);
      } else {
        console.error("Response not ok");
      }
    } catch (error) {
      console.error("Data fetching error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/admin/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        showToast("User deleted successfully", "success");
        // Refresh the user list to reflect the deletion
        fetchUsers();
      } else {
        showToast(`Server Error: ${response.message}`, "error");
        console.error("Failed to delete user", response.message);
      }
    } catch (error) {
      showToast(`Server error: ${error}`, "error");
      console.error("Server error when trying to delete user:", error);
    }
  };

  const handleClick = () => {
    setIsAddModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-end mr-10 mt-10">
        <button
          onClick={() => handleClick()}
          className={`bg-magenta text-white font-bold px-5 py-2 rounded`}
        >
          Add New User
        </button>
      </div>
      <div>
        {isLoading ? (
          <div className="flex items-center justify-center mt-40">
            <HashLoader
              color="#058ED9"
              loading={isLoading}
              cssOverride={override}
              size={60}
            />
          </div>
        ) : isDataEmpty ? (
          <p className="font-bold text-2xl italic flex items-center justify-center mt-40">
            No data exists
          </p>
        ) : (
          <>
            {users.length > 0 && (
              <Table
                title="All Users"
                data={users}
                columns={[
                  { key: "id", name: "ID" },
                  { key: "firstName", name: "Firstname" },
                  { key: "lastName", name: "Lastname" },
                  { key: "email", name: "Email Address" },
                  { key: "pepcoAccountNo", name: "Pepco Account No." },
                  { key: "washgasAccountNo", name: "Washgas Account No." },
                  { key: "wsscAccountNo", name: "WSSC Account No." },
                  { key: "role", name: "Role" },
                ]}
                renderButton={(user) =>
                  user.role !== "admin" && (
                    <>
                      <button
                        onClick={() => handleUpdateClick(user)}
                        className="bg-magenta px-3 py-1 rounded text-white font-bold cursor-pointer mr-2"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="bg-magenta px-3 py-1 rounded text-white font-bold cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </>
                  )
                }
              />
            )}
          </>
        )}
        <ScrollToTopButton />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UpdateCredentials
            userData={selectedUser}
            onClose={handleModalClose}
            onUpdate={updateUserInState}
          />
        </Modal>
        <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
          <AddUser onClose={handleAddModalClose} onUpdate={fetchUsers} />
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
