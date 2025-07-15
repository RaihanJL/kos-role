import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/AuthModern.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        dispatch(reset());
        navigate("/");
      }, 1500);
    }
  }, [isSuccess, dispatch, navigate]);

  const handleRoomType = (e) => {
    const type = e.target.value;
    setRoomType(type);
    if (type === "kecil") setRoomPrice(1600000);
    else if (type === "sedang") setRoomPrice(1800000);
    else if (type === "besar") setRoomPrice(1900000);
    else setRoomPrice("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(
      RegisterUser({
        name,
        email,
        phone,
        address,
        password,
        confPassword,
        roomType,
        roomPrice: Number(roomPrice),
      })
    );
  };

  return (
    <div className="auth-bg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop is-6-tablet">
                <form onSubmit={handleRegister} className="box auth-box">
                  <div className="has-text-centered mb-4">
                    <span className="icon is-large auth-logo">
                      <i className="fas fa-user-plus fa-3x"></i>
                    </span>
                  </div>
                  <h1 className="title is-3 has-text-centered mb-4">
                    Register
                  </h1>
                  {/* Notifikasi sukses */}
                  {showSuccess && (
                    <div className="notification is-success is-light">
                      Registrasi berhasil! Silakan login.
                    </div>
                  )}
                  {/* Notifikasi error */}
                  {isError && message && (
                    <div className="notification is-danger is-light">
                      {message}
                    </div>
                  )}
                  <div className="field">
                    <label className="label">Nama</label>
                    <div className="control has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Nomor Handphone</label>
                    <div className="control has-icons-left">
                      <input
                        type="tel"
                        className="input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-phone"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Alamat</label>
                    <div className="control has-icons-left">
                      <input
                        type="text"
                        className="input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Alamat lengkap"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="*****"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Konfirmasi Password</label>
                    <div className="control has-icons-left">
                      <input
                        type="password"
                        className="input"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder="*****"
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Tipe Kamar</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={roomType}
                          onChange={handleRoomType}
                          required
                        >
                          <option value="">Pilih Tipe Kamar</option>
                          <option value="kecil">
                            Kecil (Rp1.600.000, kamar mandi luar)
                          </option>
                          <option value="sedang">
                            Sedang (Rp1.800.000, kamar mandi dalam)
                          </option>
                          <option value="besar">
                            Besar (Rp1.900.000, kamar mandi dalam, lebih luas)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {roomPrice && (
                    <div className="field">
                      <label className="label">Harga Sewa</label>
                      <div className="control">
                        <input
                          type="text"
                          className="input"
                          value={`Rp${roomPrice.toLocaleString()}`}
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className={`button is-success is-fullwidth is-medium ${
                        isLoading ? "is-loading" : ""
                      }`}
                      disabled={isLoading}
                    >
                      Register
                    </button>
                  </div>
                  <div className="has-text-centered mt-4">
                    <span>Sudah punya akun? </span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                      }}
                      className="has-text-link"
                    >
                      Login di sini
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
