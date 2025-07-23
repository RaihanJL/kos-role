import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  return (
    <div
      className="layout-root"
      style={{ background: "#f9fbfd", minHeight: "100vh" }}
    >
      <div className="layout-navbar">
        <Navbar />
      </div>
      <div className="layout-main" style={{ display: "flex" }}>
        <div
          className="layout-sidebar"
        >
          <Sidebar />
        </div>
        <main className="layout-content" style={{ flex: 1 }}>
          <div className="layout-content-inner">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
