import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await axios.patch(
        "http://localhost:5000/users/me",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          password: form.password ? form.password : undefined,
          confirmPassword: form.confirmPassword
            ? form.confirmPassword
            : undefined,
        },
        {
          withCredentials: true,
        }
      );
      setMsg("Profil berhasil diperbarui!");
      setForm({ ...form, password: "", confirmPassword: "" });
      setIsEdit(false);
    } catch (err) {
      setMsg(
        err.response?.data?.msg ||
          "Gagal memperbarui profil. Silakan coba lagi."
      );
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div
      className="edit-profile-outer"
      style={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #f5f7fa 60%, #e3e9f7 100%)",
      }}
    >
      <div
        className="box edit-profile-container"
        style={{
          maxWidth: 520,
          width: "100%",
          margin: "0 auto",
          padding: "48px 40px 40px 40px",
          borderRadius: 24,
          boxShadow: "0 8px 32px 0 rgba(60,72,88,.13)",
          background: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #e3e9f7 60%, #b3c6e0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
              boxShadow: "0 2px 12px 0 rgba(60,72,88,.10)",
            }}
          >
            <i
              className="fas fa-user-edit"
              style={{ fontSize: 44, color: "#1976d2" }}
            />
          </div>
          <h2
            className="title is-3 edit-profile-title"
            style={{
              textAlign: "center",
              marginBottom: 0,
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: 0.5,
            }}
          >
            Profil Saya
          </h2>
        </div>
        {msg && (
          <div
            className={`notification ${
              msg.includes("berhasil") ? "is-success" : "is-danger"
            }`}
            style={{
              textAlign: "center",
              fontSize: 16,
              marginBottom: 18,
              borderRadius: 8,
            }}
          >
            {msg}
          </div>
        )}

        {!isEdit ? (
          // MODE VIEW
          <div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, color: "#888", fontSize: 15 }}>
                Nama
              </div>
              <div style={{ fontSize: 19, fontWeight: 600, color: "#222" }}>
                {user.name}
              </div>
              <hr
                style={{
                  margin: "14px 0",
                  border: 0,
                  borderTop: "1px solid #f0f0f0",
                }}
              />
              <div style={{ fontWeight: 600, color: "#888", fontSize: 15 }}>
                Email
              </div>
              <div style={{ fontSize: 18, color: "#1976d2", fontWeight: 500 }}>
                {user.email}
              </div>
              <hr
                style={{
                  margin: "14px 0",
                  border: 0,
                  borderTop: "1px solid #f0f0f0",
                }}
              />
              <div style={{ fontWeight: 600, color: "#888", fontSize: 15 }}>
                No. HP
              </div>
              <div
                style={{ fontSize: 18, color: user.phone ? "#222" : "#aaa" }}
              >
                {user.phone || "-"}
              </div>
              <hr
                style={{
                  margin: "14px 0",
                  border: 0,
                  borderTop: "1px solid #f0f0f0",
                }}
              />
              <div style={{ fontWeight: 600, color: "#888", fontSize: 15 }}>
                Alamat
              </div>
              <div
                style={{ fontSize: 18, color: user.address ? "#222" : "#aaa" }}
              >
                {user.address || "-"}
              </div>
            </div>
            <div className="field mt-4" style={{ textAlign: "center" }}>
              <button
                className="button is-primary"
                style={{
                  minWidth: 160,
                  fontWeight: 600,
                  fontSize: 17,
                  borderRadius: 10,
                  boxShadow: "0 2px 8px 0 rgba(25,118,210,.08)",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#1565c0")
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "")}
                onClick={() => setIsEdit(true)}
              >
                <i className="fas fa-pen" style={{ marginRight: 8 }} />
                Edit Profil
              </button>
            </div>
          </div>
        ) : (
          // MODE EDIT
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="field">
              <label className="label">Nama</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Nama lengkap"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  placeholder="Email aktif"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">No. HP</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="08xxxxxxxxxx"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-phone" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Alamat</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  autoComplete="off"
                  placeholder="Alamat lengkap"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-map-marker-alt" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password Baru</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  autoComplete="new-password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Konfirmasi Password Baru</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Kosongkan jika tidak ingin mengubah"
                  autoComplete="new-password"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </div>
            </div>
            <div
              className="field is-grouped mt-4"
              style={{ justifyContent: "center" }}
            >
              <div className="control">
                <button
                  className={`button is-primary is-medium ${
                    loading ? "is-loading" : ""
                  }`}
                  type="submit"
                  disabled={loading}
                  style={{ minWidth: 140, borderRadius: 8, fontWeight: 600 }}
                >
                  Simpan Perubahan
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-light is-medium"
                  onClick={() => setIsEdit(false)}
                  disabled={loading}
                  style={{ marginLeft: 8, minWidth: 100, borderRadius: 8 }}
                >
                  Batal
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
