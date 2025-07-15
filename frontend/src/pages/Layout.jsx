import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-root">
      <div className="layout-navbar">
        <Navbar />
      </div>
      <div className="layout-main">
        <div className="layout-sidebar">
          <Sidebar />
        </div>
        <main className="layout-content">
          <div className="layout-content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;