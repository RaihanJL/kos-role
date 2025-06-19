import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Payments = () => {
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (user) {
      let nominal = 0;
      let desc = "";
      if (user.roomType === "kecil") nominal = 1600000;
      else if (user.roomType === "sedang") nominal = 1800000;
      else if (user.roomType === "besar") nominal = 1900000;

      // Keterangan otomatis, misal: "Pembayaran bulan Juni"
      const bulan = new Date().toLocaleString("default", { month: "long" });
      desc = `Pembayaran bulan ${bulan}`;

      setAmount(nominal);
      setDescription(desc);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("description", description);
    if (proof) formData.append("proof", proof);
    formData.append("dueDate", dueDate); // tambahkan dueDate

    try {
      await axios.post("http://localhost:5000/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Pembayaran berhasil diajukan!");
      setProof(null);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <div className="box" style={{ maxWidth: 400, margin: "auto" }}>
      <h2 className="title is-4">Form Pembayaran</h2>
      {message && <div className="notification is-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nominal</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={amount ? `Rp${amount.toLocaleString()}` : ""}
              readOnly
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Keterangan</label>
          <div className="control">
            <input type="text" className="input" value={description} readOnly />
          </div>
        </div>
        <div className="field">
          <label className="label">Bukti Pembayaran</label>
          <div className="control">
            <input
              type="file"
              className="input"
              accept="image/*"
              onChange={(e) => setProof(e.target.files[0])}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Tanggal Jatuh Tempo</label>
          <div className="control">
            <input
              type="date"
              className="input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="button is-primary" type="submit">
          Upload Bukti Pembayaran
        </button>
      </form>
    </div>
  );
};

export default Payments;
