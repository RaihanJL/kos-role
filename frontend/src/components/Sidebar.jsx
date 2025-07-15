import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

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
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
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
              <p className="menu-label">Payments</p>
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
            <p className="menu-label">Admin</p>
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
        <p className="menu-label">Settings</p>
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
            >
              <IoLogOut />
              <span>Keluar</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
