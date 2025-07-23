import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import "../styles/AuthModern.css"; // Tambahkan file CSS custom

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectError, setRedirectError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (location.state?.error) {
      setRedirectError(location.state.error);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    setRedirectError("");
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="auth-bg">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop is-6-tablet">
                <form onSubmit={Auth} className="box auth-box">
                  <div className="has-text-centered mb-4">
                    <span className="icon is-large auth-logo">
                      <i className="fas fa-user-circle fa-3x"></i>
                    </span>
                  </div>
                  <h1 className="title is-3 has-text-centered mb-4">Sign In</h1>
                  {(redirectError || (isError && message)) && (
                    <div className="notification is-danger is-light">
                      {redirectError ? redirectError : message}
                    </div>
                  )}
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
                  <div className="field mt-5">
                    <button
                      type="submit"
                      className={`button is-success is-fullwidth is-medium ${
                        isLoading ? "is-loading" : ""
                      }`}
                    >
                      Login
                    </button>
                  </div>
                  <div className="has-text-centered mt-4">
                    <span>Belum punya akun? </span>

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/register");
                      }}
                      className="has-text-link"
                    >
                      Daftar di sini
                    </a>
                  </div>
                  <div className="has-text-centered mt-2">
                    <a
                      href="#"
                      className="has-text-link"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/forgot-password");
                      }}
                    >
                      Lupa Password ?
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

export default Login;
