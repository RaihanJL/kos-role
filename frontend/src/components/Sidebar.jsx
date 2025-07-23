import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import logo from "../logo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <aside
      className="menu px-3 py-4"
      style={{
        width: 280, // Lebar sidebar default
        minWidth: 240,
        maxWidth: 320,
        background: "#ffffffff",
        borderRight: "1.5px solid #e3e7ef",
        minHeight: "100vh",
        boxShadow: "2px 0 8px #e3e7ef",
        transition: "width 0.2s",
      }}
    >
      {/* Logo di atas menu */}
      <div className="mb-5 has-text-centered">
        <figure className="image is-inline-block">
          <img
            src={logo}
            alt="Logo"
            
            style={{
              objectFit: "contain",
              background: "#fff",
              padding: 8,
              maxWidth: "100%",
              height: "auto",
              boxShadow: "0 2px 12px #b3c2e0",
              borderRadius: 8,
            }}
          />
        </figure>
      </div>
      <p className="menu-label" style={{ color: "#1976d2", fontWeight: 700 }}>
        General
      </p>
      <ul className="menu-list">
        <li>
          <NavLink to={"/dashboard"}>
            <IoHome />
            Dashboard
          </NavLink>
        </li>
        {/* Hanya tampil jika user bukan admin */}
        {user && user.role !== "admin" && (
          <>
            <p
              className="menu-label"
              style={{ color: "#1976d2", fontWeight: 700 }}
            >
              Payments
            </p>
            <li>
              <NavLink to="/payment">
                <IoPricetag />
                Pembayaran
              </NavLink>
            </li>
            <li>
              <NavLink to="/payment-history">
                <IoPricetag />
                Riwayat Pembayaran
              </NavLink>
            </li>
            <li>
              <NavLink to="/status-pembayaran">
                <IoPricetag />
                Status Pembayaran
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {user && user.role === "admin" && (
        <div>
          <p
            className="menu-label"
            style={{ color: "#1976d2", fontWeight: 700 }}
          >
            Admin
          </p>
          <ul className="menu-list">
            <li>
              <NavLink to={"/users"}>
                <IoPerson />
                Pengguna kos
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/payments">
                <IoPricetag />
                Validasi Pembayaran
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <p className="menu-label" style={{ color: "#1976d2", fontWeight: 700 }}>
        Settings
      </p>
      <ul className="menu-list">
        <li>
          <NavLink to="/edit-profile">
            <IoPerson />
            Profile
          </NavLink>
        </li>
        <li>
          <a
            href="#logout"
            className="logout-link"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            style={{ color: "#d32f2f", fontWeight: 600 }}
          >
            <IoLogOut />
            <span>Keluar</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
