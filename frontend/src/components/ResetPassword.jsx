import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post(
        `http://localhost:5000/reset-password/${token}`,
        {
          password,
          confPassword,
        }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="auth-bg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop ">
                <form
                  onSubmit={handleSubmit}
                  className="box auth-box"
                  style={{ maxWidth: 400, margin: "0 auto" }}
                >
                  <h1 className="title is-4 has-text-centered mb-4">
                    Reset Password
                  </h1>
                  {message && (
                    <div className="notification is-success">{message}</div>
                  )}
                  {error && (
                    <div className="notification is-danger">{error}</div>
                  )}
                  <div className="field">
                    <label className="label">Password Baru</label>
                    <div className="control">
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        placeholder="Password baru"
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
                        required
                        minLength={6}
                        placeholder="Konfirmasi password"
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-link is-fullwidth"
                    >
                      Reset Password
                    </button>
                  </div>
                  <div className="has-text-centered mt-3">
                    <button
                      type="button"
                      className="button is-text"
                      style={{ color: "#1976d2" }}
                      onClick={() => navigate("/")}
                    >
                      Kembali ke Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>
        {`
          @media (max-width: 600px) {
            .auth-box {
              padding: 1.5rem 0.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResetPassword;
