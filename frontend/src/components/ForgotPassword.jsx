import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/forgot-password", {
        email,
      });
      setMessage(res.data.message);
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
                    Lupa Password
                  </h1>
                  {message && (
                    <div className="notification is-success">{message}</div>
                  )}
                  {error && (
                    <div className="notification is-danger">{error}</div>
                  )}
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        type="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Masukkan email Anda"
                      />
                    </div>
                  </div>
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className="button is-link is-fullwidth"
                    >
                      Kirim Link Reset
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
    </div>
  );
};

export default ForgotPassword;
