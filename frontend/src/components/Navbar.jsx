import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png";
import Sidebar from "./Sidebar";
import "../styles/Navigation.css";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <nav
        className="navbar is fixed top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          {/* Tombol menu sidebar hanya tampil di mobile */}
          <button
            className="button is-white is-hidden-tablet sidebar-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <span className="icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <NavLink to="/dashboard" className="navbar-item">
            <img src={logo} width="112" height="28" alt="Logo" />
          </NavLink>
        </div>
      </nav>

      {/* Sidebar Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-drawer-overlay"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-drawer-header">
              <button
                className="button is-white sidebar-drawer-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup menu"
              >
                <span className="icon">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
