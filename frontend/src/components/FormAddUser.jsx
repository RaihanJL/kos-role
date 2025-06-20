import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post("http://localhost:5000/users", {
        name,
        email,
        password,
        confPassword,
        role,
        roomType,
        roomPrice,
      });
      navigate("/users");
    } catch (error) {
      if (error.response && error.response.data) {
        setMsg(error.response.data.message);
      } else {
        setMsg("An error occurred while saving the product.");
      }
    }
  };
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveUser}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="*****"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tipe Kamar</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={roomType}
                      onChange={(e) => {
                        setRoomType(e.target.value);
                        // Otomatis set harga sesuai tipe kamar
                        if (e.target.value === "kecil") setRoomPrice(1600000);
                        else if (e.target.value === "sedang")
                          setRoomPrice(1800000);
                        else if (e.target.value === "besar")
                          setRoomPrice(1900000);
                        else setRoomPrice(0);
                      }}
                    >
                      <option value="">Pilih Tipe Kamar</option>
                      <option value="kecil">Kecil</option>
                      <option value="sedang">Sedang</option>
                      <option value="besar">Besar</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Kamar</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={roomPrice}
                    readOnly
                    placeholder="Harga kamar"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddUser;
