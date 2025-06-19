import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import PaymentsPage from "./pages/PaymentsPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import AdminPaymentsPage from "./pages/AdminPaymentsPage";
import Register from "./components/Register";

function App() {
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
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/payment" element={<PaymentsPage />} />
          <Route path="/payment-history" element={<PaymentHistoryPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
