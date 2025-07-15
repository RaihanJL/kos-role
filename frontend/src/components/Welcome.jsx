import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import "../styles/Welcome.css";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);

  // State untuk user
  const [status, setStatus] = useState(null);
  const [arrears, setArrears] = useState([]);
  const [lastPayments, setLastPayments] = useState([]);

  // State untuk admin
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalRoomTypes: 0,
    occupiedRooms: 0,
    totalRooms: 7,
    pendingPayments: 0,
    totalTunggakan: 0,
  });
  const [pendingPayments, setPendingPayments] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      // Fetch semua user
      axios
        .get("http://localhost:5000/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const users = (res.data || []).filter((u) => u.role === "user");
          const roomTypes = new Set(
            users.map((u) => u.roomType).filter(Boolean)
          );
          const occupiedRooms = Math.min(
            users.filter((u) => u.roomType).length,
            7
          );
          setSummary((prev) => ({
            ...prev,
            totalUsers: users.length,
            totalRoomTypes: roomTypes.size,
            occupiedRooms,
            totalRooms: 7,
          }));
          setRecentUsers(users.slice(-5).reverse());
        });

      // Fetch semua pembayaran
      axios
        .get("http://localhost:5000/payments/admin", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          const payments = res.data || [];
          const pending = payments.filter((p) => p.status === "pending");
          const now = new Date();
          const tunggakan = payments.filter(
            (p) =>
              (p.status === "pending" || p.status === "rejected") &&
              new Date(p.dueDate) < now
          );
          const totalTunggakan = tunggakan.reduce(
            (sum, p) => sum + p.amount,
            0
          );
          setSummary((prev) => ({
            ...prev,
            pendingPayments: pending.length,
            totalTunggakan,
          }));
          setPendingPayments(pending);
        });
    } else {
      axios
        .get("http://localhost:5000/payments/current-month", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setStatus(res.data))
        .catch(() => setStatus(null));

      axios
        .get(`http://localhost:5000/users/${user.uuid}/arrears`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          if (Array.isArray(res.data.arrears)) setArrears(res.data.arrears);
          else if (Array.isArray(res.data)) setArrears(res.data);
          else setArrears([]);
        })
        .catch(() => setArrears([]));

      axios
        .get("http://localhost:5000/payments", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setLastPayments(res.data.slice(0, 3)))
        .catch(() => setLastPayments([]));
    }
  }, [user]);

  if (!user) return null;

  if (user.role === "admin")
    return (
      <AdminDashboard
        user={user}
        summary={summary}
        pendingPayments={pendingPayments}
        recentUsers={recentUsers}
      />
    );

  return (
    <UserDashboard
      user={user}
      status={status}
      arrears={arrears}
      lastPayments={lastPayments}
    />
  );
};

export default Welcome;
