import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles/Payments.css";
import ArrearsTable from "./ArrearsTable";
import PaymentForm from "./PaymentForm";
import PaymentFormArrears from "./PaymentFormArrear";

const Payments = () => {
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState(null);
  const [message, setMessage] = useState("");
  const [arrears, setArrears] = useState(null);
  const [modeBayar, setModeBayar] = useState("kosan");
  const [currentMonthBill, setCurrentMonthBill] = useState(null);
  const [selectedArrears, setSelectedArrears] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const selectedNominal = arrears?.arrears
    ?.filter((item) => selectedArrears.includes(item.dueDate))
    .reduce((sum, item) => sum + (item.amount || 0) + (item.penalty || 0), 0);

  const rekeningAdmin = {
    bank: "BCA",
    nomor: "1234567890",
    nama: "Admin Kos",
  };

  const keperluanPembayaran = [
    "Uang sewa kamar",
    "Biaya listrik & air",
    "Iuran kebersihan",
    "Denda (jika ada tunggakan)",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/payments/current-month", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setCurrentMonthBill(res.data);
        setAmount(res.data?.total || 0);
        setDescription(res.data?.description || "Pembayaran bulan ini");
      })
      .catch(() => {
        setCurrentMonthBill(null);
        setAmount(0);
        setDescription("Pembayaran bulan ini");
      });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/users/${user.id}/arrears`)
        .then((res) => setArrears(res.data))
        .catch(() => setArrears(null));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Bayar tunggakan (multiple)
    if (
      arrears &&
      arrears.hasArrears &&
      selectedArrears.length > 0 &&
      modeBayar === "tunggakan"
    ) {
      formData.append("months", JSON.stringify(selectedArrears));
      formData.append("description", "Pembayaran tunggakan");
      formData.append("proof", proof);
      formData.append("userId", user.id);
      await axios.post(
        "http://localhost:5000/payments/pay-multiple",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("Pembayaran tunggakan berhasil diajukan!");
      setProof(null);
      setSelectedArrears([]);
      setShowModal(true);
      return;
    }

    // Bayar kosan bulan ini
    if (modeBayar === "kosan") {
      formData.append("amount", currentMonthBill?.amount || 0);
      formData.append("penalty", currentMonthBill?.penalty || 0);
      formData.append("description", description);
      formData.append("dueDate", currentMonthBill?.dueDate);
      formData.append("userId", user.id);
      if (proof) formData.append("proof", proof);
    }

    try {
      await axios.post("http://localhost:5000/payments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Pembayaran berhasil diajukan!");
      setProof(null);
      setShowModal(true);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <div className="payments-container">
      {/* Sisi kiri: Tunggakan */}
      <div className="payments-arrears">
        <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
          Tunggakan
        </h3>
        {arrears && arrears.hasArrears ? (
          <>
            <div
              className="notification is-danger"
              style={{ marginBottom: 12 }}
            >
              Anda memiliki tunggakan pembayaran berikut:
            </div>
            <ArrearsTable
              arrears={arrears}
              selectedArrears={selectedArrears}
              setSelectedArrears={setSelectedArrears}
            />
            <div style={{ marginTop: 12, fontWeight: 600 }}>
              Total tunggakan:{" "}
              <span style={{ color: "#d90429" }}>
                Rp{selectedNominal ? selectedNominal.toLocaleString() : "0"}
              </span>
            </div>
          </>
        ) : (
          arrears && (
            <div className="notification is-success">
              Tidak ada tunggakan pembayaran.
            </div>
          )
        )}
      </div>

      {/* Sisi kanan: Form pembayaran */}
      <div className="payments-form">
        <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
          Form Pembayaran
        </h3>

        {/* Info rekening admin */}
        <div
          className="notification is-link"
          style={{
            marginBottom: 16,
            background: "#e3f2fd",
            color: "#0d47a1",
            border: "1px solid #90caf9",
          }}
        >
          <b>Transfer ke rekening berikut:</b>
          <br />
          <span>
            <b>Bank:</b> {rekeningAdmin.bank}
            <br />
            <b>No. Rekening:</b> {rekeningAdmin.nomor}
            <br />
            <b>Atas Nama:</b> {rekeningAdmin.nama}
          </span>
        </div>

        {/* Daftar keperluan pembayaran */}
        <div
          className="notification"
          style={{
            marginBottom: 16,
            background: "#fffde7",
            color: "#795548",
            border: "1px solid #ffe082",
          }}
        >
          <b>Keperluan pembayaran:</b>
          <ul style={{ marginTop: 6, marginBottom: 0, paddingLeft: 18 }}>
            {keperluanPembayaran.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ marginRight: 16 }}>
            <input
              type="radio"
              name="modeBayar"
              value="kosan"
              checked={modeBayar === "kosan"}
              onChange={() => setModeBayar("kosan")}
              disabled={
                currentMonthBill && currentMonthBill.status === "validated"
              }
            />{" "}
            Bayar Kosan
          </label>
          <label>
            <input
              type="radio"
              name="modeBayar"
              value="tunggakan"
              checked={modeBayar === "tunggakan"}
              onChange={() => setModeBayar("tunggakan")}
              disabled={!arrears || !arrears.hasArrears}
            />{" "}
            Bayar Tunggakan
          </label>
        </div>
        {message && <div className="notification is-info">{message}</div>}

        {/* Pesan jika semua sudah lunas */}
        {modeBayar === "kosan" && !currentMonthBill && (
          <div className="notification is-success" style={{ marginBottom: 16 }}>
            Semua pembayaran bulan ini sudah dilakukan.
          </div>
        )}

        {/* Form Bayar Kosan Bulan Ini */}
        {modeBayar === "kosan" && currentMonthBill && (
          <PaymentForm
            modeBayar={modeBayar}
            currentMonthBill={currentMonthBill}
            amount={amount}
            description={description}
            proof={proof}
            setProof={setProof}
            handleSubmit={handleSubmit}
            disabled={currentMonthBill.status === "validated"}
          />
        )}

        {/* Form Bayar Tunggakan */}
        {modeBayar === "tunggakan" && (
          <PaymentFormArrears
            arrears={arrears}
            selectedArrears={selectedArrears}
            setSelectedArrears={setSelectedArrears}
            selectedNominal={selectedNominal}
            proof={proof}
            setProof={setProof}
            handleSubmit={handleSubmit}
            disabled={!arrears || !arrears.hasArrears}
          />
        )}
      </div>
    </div>
  );
};

export default Payments;
