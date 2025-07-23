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
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
        style={{
          background: "#fff",
          borderBottom: "1.5px solid #e3e7ef",
          minHeight: 56,
          zIndex: 100,
        }}
      >
        <div
          className="navbar-brand"
          style={{
            width: "100%",
            justifyContent: "center",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Burger di kiri, absolute agar tidak dorong logo */}
          <button
            className="button is-white is-hidden-tablet sidebar-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
            }}
          >
            <span className="icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          {/* Logo selalu di tengah */}
          <NavLink
            to="/dashboard"
            className="navbar-item"
            style={{ margin: "0 auto" }}
          >
            <figure className="image is-160x64" style={{ margin: 0 }}>
              <img
                src={logo}
                alt="Logo"
                style={{
                  objectFit: "contain",
                  height: 48,
                  maxWidth: "100%",
                  width: "auto",
                  transition: "height 0.2s",
                }}
                className="navbar-logo-img"
              />
            </figure>
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
