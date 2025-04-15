import { useState } from "react";
import {
  FaUserShield,
  FaTrophy,
  FaTableTennis,
  FaChalkboardTeacher,
  FaUserTie,
  FaDumbbell,
  FaShoppingCart,
  FaUtensils,
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const userData = localStorage.getItem("user");
  const parsedUser = JSON.parse(userData);
  console.log("parsedUser", parsedUser);

  const handlelogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      className="d-flex flex-column bg-light shadow-sm p-3"
      style={{
        // width: "350px",
        fontFamily: "Poppins, sans-serif",
        borderRight: "2px solid #ddd",
        height: "120vh",
      }}
    >
      <div className="p-3 border-bottom">
        <h5 className="fw-bold">Super Blood</h5>
      </div>

      <nav className="nav flex-column p-2">
        <NavLink
          to="/user"
          className="nav-link nav-border text-dark d-flex align-items-center p-2 sidebar-item"
          style={{ fontSize: "15px" }}
        >
          <FaUserShield className="me-2" /> Users
        </NavLink>

        <NavLink
          to="/dashboard"
          className="nav-link nav-border text-dark d-flex align-items-center p-2 sidebar-item"
          style={{ fontSize: "15px" }}
        >
          <FaTrophy className="me-2" /> Enquiry List
        </NavLink>

        <NavLink
          to="/booking"
          className="nav-link nav-border text-dark d-flex align-items-center p-2 sidebar-item"
          style={{ fontSize: "15px" }}
        >
          <FaTrophy className="me-2" /> Confirm Booking
        </NavLink>

        <NavLink
          onClick={handlelogout}
          to="/"
          className="nav-link nav-border text-dark d-flex align-items-center p-2 sidebar-item"
          style={{ fontSize: "15px" }}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
