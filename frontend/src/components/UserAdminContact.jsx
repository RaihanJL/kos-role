import React from "react";
import AdminSummaryCards from "./AdminSummaryCards";
import AdminRoomPriceTable from "./AdminRoomPriceTable";
import AdminPendingPayments from "./AdminPendingPayments";
import AdminRecentUsers from "./AdminRecentUsers";
import RulesBox from "./RulesBox";
import UserRoomInfo from "./UserRoomInfo";
import UserPaymentStatus from "./UserPaymentStatus";
import UserArrears from "./UserArrears";
import UserPaymentHistory from "./UserPaymentHistory";
import UserAdminContact from "./UserAdminContact";


const Welcome = ({
  user,
  summary,
  pendingPayments,
  recentUsers,
  status,
  arrears,
  lastPayments,
}) => {
  if (!user) return null;

  // DASHBOARD ADMIN
  if (user.role === "admin") {
    return (
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 0",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div>
            <h1 className="title" style={{ marginBottom: 0 }}>
              Selamat Datang, <span style={{ color: "#1976d2" }}>Admin</span>
            </h1>
            <div style={{ color: "#888", fontSize: 18 }}>
              Dashboard Pengelola Kos
            </div>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: "2px solid #1976d2",
              background: "#fff",
              objectFit: "cover",
            }}
          />
        </div>
        <AdminSummaryCards summary={summary} />
        <AdminRoomPriceTable />
        <AdminPendingPayments pendingPayments={pendingPayments} />
        <AdminRecentUsers recentUsers={recentUsers} />
        <RulesBox isAdmin={true} />
        <UserAdminContact />
      </div>
    );
  }

  // DASHBOARD USER
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <div>
          <h1 className="welcome-title title">
            Selamat Datang,{" "}
            <span style={{ color: "#1976d2" }}>{user?.name}</span>
          </h1>
          <div className="welcome-subtitle">Dashboard Penghuni Kos</div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User"
          className="welcome-header-img"
        />
      </div>
      <div className="info-cards">
        <UserRoomInfo user={user} />
        <UserPaymentStatus status={status} />
        <UserArrears arrears={arrears} />
      </div>
      <UserPaymentHistory lastPayments={lastPayments} />
      <RulesBox isAdmin={false} />
      <UserAdminContact />
    </div>
  );
};

export default Welcome;
