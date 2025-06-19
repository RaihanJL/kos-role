import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate("/"); // redirect ke halaman login
    }
  }, [isSuccess, navigate]);

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
  // Pastikan roomPrice dikirim sebagai angka
  dispatch(
    RegisterUser({
      name,
      email,
      password,
      confPassword,
      roomType,
      roomPrice: Number(roomPrice), // pastikan number
    })
  );
};

  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form onSubmit={handleRegister} className="box">
                  {isError && message && (
                    <p className="has-text-centered has-text-danger">
                      {message}
                    </p>
                  )}
                  <h1 className="title is-2 has-text-centered">Register</h1>
                  <div className="field">
                    <label className="label">Nama</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="*****"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Konfirmasi Password</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={confPassword}
                        onChange={(e) => setConfPassword(e.target.value)}
                        placeholder="*****"
                        required
                      />
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
                      className="button is-success is-fullwidth"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Register"}
                    </button>
                  </div>
                  <div className="has-text-centered mt-2">
                    <span>Sudah punya akun? </span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                      }}
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
