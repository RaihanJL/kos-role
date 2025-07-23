import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import PaymentsPage from "./pages/PaymentsPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import AdminPaymentsPage from "./pages/AdminPaymentsPage";
import Register from "./components/Register";
import PaymentStatus from "./pages/PaymentStatus";
import EditProfilePage from "./pages/EditProfilePage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import "./styles/colors.css";

function App() {
  const { user } = useSelector((state) => state.auth);

  // Jika user suspend, tampilkan pesan blokir
  if (user && user.status === "suspend") {
    return (
      <div
        className="notification is-danger"
        style={{ margin: 40, textAlign: "center" }}
      >
        <h2>Akun Anda Disuspend</h2>
        <p>
          Akses ke website dibatasi karena Anda belum melunasi tagihan lebih
          dari 20 hari.
          <br />
          Silakan hubungi admin atau lakukan pembayaran untuk mengaktifkan
          kembali akun Anda.
        </p>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />

          <Route path="/payment" element={<PaymentsPage />} />
          <Route path="/payment-history" element={<PaymentHistoryPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/status-pembayaran" element={<PaymentStatus />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
