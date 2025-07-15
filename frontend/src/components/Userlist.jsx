import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Userlist.css";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [notif, setNotif] = useState(""); // Tambahkan state notifikasi

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    const all = response.data;
    setUsers(all.filter((u) => u.role === "user"));
    setAdmins(all.filter((u) => u.role === "admin"));
  };

  const deleteUser = async (userId) => {
    const user = [...users, ...admins].find((u) => u.uuid === userId);
    const confirmDelete = window.confirm(
      `Apakah Anda yakin akan menghapus ${
        user?.role === "admin" ? "admin" : "user"
      } ini?`
    );
    if (!confirmDelete) return;
    await axios.delete(`http://localhost:5000/users/${userId}`);
    setNotif(
      `${user?.role === "admin" ? "Admin" : "User"} "${
        user?.name
      }" berhasil dihapus!`
    );
    getUsers();
    setTimeout(() => setNotif(""), 2000); // Notif hilang otomatis
  };

  const toggleStatus = async (user) => {
    const newStatus = user.status === "aktif" ? "suspend" : "aktif";
    const confirm = window.confirm(
      `Yakin ingin mengubah status user ini menjadi "${newStatus}"?`
    );
    if (!confirm) return;
    await axios.patch(`http://localhost:5000/users/${user.uuid}/status`, {
      status: newStatus,
    });
    getUsers();
  };

  return (
    <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>
      {notif && (
        <div
          className="notification is-success has-text-centered"
          style={{ marginTop: 16 }}
        >
          {notif}
        </div>
      )}
      <div className="box" style={{ marginTop: 30 }}>
        <div className="level">
          <div className="level-left">
            <div>
              <h1
                className="title is-3"
                style={{ color: "#1976d2", fontWeight: 700 }}
              >
                Daftar Penghuni Kos
              </h1>
              <h2 className="subtitle is-6" style={{ color: "#888" }}>
                Manajemen User Kos Anda
              </h2>
            </div>
          </div>
          <div className="level-right">
            <Link
              to="/users/add"
              className="button is-primary is-medium"
              style={{ borderRadius: 8 }}
            >
              <span className="icon">
                <i className="fas fa-user-plus"></i>
              </span>
              <span>Tambah User</span>
            </Link>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="table is-striped is-hoverable is-fullwidth modern-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>No. HP</th>
                <th>Alamat</th>
                <th>Tipe Kamar</th>
                <th>Harga Kamar</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.uuid}>
                  <td>
                    <span className="tag is-light is-rounded">{index + 1}</span>
                  </td>
                  <td
                    style={{
                      fontWeight: 600,
                      color: "#222",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>
                      <i
                        className="fas fa-user-circle"
                        style={{ marginRight: 6, color: "#1976d2" }}
                      />
                      {user.name}
                    </span>
                  </td>
                  <td>
                    <span className="has-text-link" style={{ fontWeight: 500 }}>
                      {user.email}
                    </span>
                  </td>
                  <td>
                    <span className="tag is-info is-light is-rounded big-cell">
                      <i className="fas fa-phone" style={{ marginRight: 5 }} />
                      {user.phone || "-"}
                    </span>
                  </td>
                  <td
                    title={
                      user.address && user.address.length > 18
                        ? user.address
                        : undefined
                    }
                  >
                    <span className="tag is-light is-rounded address-cell">
                      <i
                        className="fas fa-map-marker-alt"
                        style={{ marginRight: 5, color: "#e57373" }}
                      />
                      {user.address
                        ? user.address.length > 18
                          ? user.address.slice(0, 18) + "..."
                          : user.address
                        : "-"}
                    </span>
                  </td>
                  <td>
                    <span className="tag is-light is-rounded big-cell">
                      {user.roomType || "-"}
                    </span>
                  </td>
                  <td>
                    {user.roomPrice ? (
                      <span className="tag is-success is-light is-rounded big-cell">{`Rp${user.roomPrice.toLocaleString()}`}</span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <span
                      className={
                        user.status === "aktif"
                          ? "tag is-success is-light"
                          : "tag is-danger is-light"
                      }
                      style={{
                        minWidth: 80,
                        display: "inline-block",
                        textAlign: "center",
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      {user.status === "aktif" ? (
                        <>
                          <i
                            className="fas fa-check-circle"
                            style={{ marginRight: 5 }}
                          ></i>
                          Aktif
                        </>
                      ) : (
                        <>
                          <i
                            className="fas fa-ban"
                            style={{ marginRight: 5 }}
                          ></i>
                          Suspend
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/users/edit/${user.uuid}`}
                        className="button is-small is-info"
                        title="Edit User"
                        style={{ borderRadius: 6 }}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </Link>
                      <button
                        onClick={() => deleteUser(user.uuid)}
                        className="button is-small is-danger"
                        style={{ borderRadius: 6 }}
                        title="Hapus User"
                      >
                        <span className="icon is-small">
                          <i className="fas fa-trash"></i>
                        </span>
                      </button>
                      <button
                        onClick={() => toggleStatus(user)}
                        className={
                          user.status === "aktif"
                            ? "button is-small is-warning"
                            : "button is-small is-success"
                        }
                        style={{ borderRadius: 6 }}
                        title={
                          user.status === "aktif"
                            ? "Suspend User"
                            : "Aktifkan User"
                        }
                      >
                        <span className="icon is-small">
                          <i
                            className={
                              user.status === "aktif"
                                ? "fas fa-ban"
                                : "fas fa-check"
                            }
                          ></i>
                        </span>
                        <span>
                          {user.status === "aktif" ? "Suspend" : "Aktifkan"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Admin */}
      <div className="box" style={{ marginTop: 30 }}>
        <h3
          className="subtitle is-5"
          style={{ marginBottom: 16, color: "#1976d2", fontWeight: 700 }}
        >
          Daftar Admin
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="table is-striped is-fullwidth modern-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={admin.uuid}>
                  <td>
                    <span className="tag is-light is-rounded">{index + 1}</span>
                  </td>
                  <td
                    style={{
                      fontWeight: 600,
                      color: "#222",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <i
                      className="fas fa-user-shield"
                      style={{ marginRight: 6, color: "#8e24aa" }}
                    />
                    {admin.name}
                  </td>
                  <td>
                    <span className="has-text-link" style={{ fontWeight: 500 }}>
                      {admin.email}
                    </span>
                  </td>
                  <td>
                    <span className="tag is-link is-light is-rounded big-cell">
                      {admin.role}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link
                        to={`/users/edit/${admin.uuid}`}
                        className="button is-small is-info"
                        title="Edit Admin"
                        style={{ borderRadius: 6 }}
                      >
                        <span className="icon is-small">
                          <i className="fas fa-edit"></i>
                        </span>
                      </Link>
                      <button
                        onClick={() => deleteUser(admin.uuid)}
                        className="button is-small is-danger"
                        style={{ borderRadius: 6 }}
                        title="Hapus Admin"
                      >
                        <span className="icon is-small">
                          <i className="fas fa-trash"></i>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Font Awesome CDN for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </div>
  );
};

export default Userlist;
