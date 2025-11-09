import React from "react";
import { IoLogOutOutline } from "react-icons/io5"; // Import icon logout
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../store/context/AuthContext";

const LogoutButton = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth(null);
    navigate("/login");
  };

  return (
    <div className="flex justify-start">
      <button
        onClick={handleLogout}
        className="
          p-2 
          text-gray-300 
          hover:text-white 
          hover:bg-red-600/50 /* Hiệu ứng hover màu đỏ */
          rounded-lg
          transition duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-red-500
        "
        title="Đăng xuất" // Tooltip
      >
        <IoLogOutOutline size={26} />
      </button>
    </div>
  );
};

export default LogoutButton;
