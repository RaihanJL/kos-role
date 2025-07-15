import React from "react";

const PaymentForm = ({
  modeBayar,
  currentMonthBill,
  amount,
  description,
  proof,
  setProof,
  handleSubmit,
  disabled,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">Nominal</label>
      <div className="control">
        <input
          type="text"
          className="input"
          value={`Rp${amount.toLocaleString()}`}
          readOnly
        />
      </div>
    </div>
    {currentMonthBill?.penalty > 0 && (
      <div className="notification is-warning" style={{ marginBottom: 8 }}>
        Denda keterlambatan:{" "}
        <b>Rp{currentMonthBill.penalty.toLocaleString()}</b>
      </div>
    )}
    <div className="field">
      <label className="label">Deskripsi</label>
      <div className="control">
        <input type="text" className="input" value={description} readOnly />
      </div>
    </div>
    <div className="field">
      <label className="label">Bukti Pembayaran</label>
      <div className="file has-name is-fullwidth">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setProof(e.target.files[0])}
            required
            disabled={disabled}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">Pilih file…</span>
          </span>
          <span className="file-name">
            {proof ? proof.name : "Belum ada file dipilih"}
          </span>
        </label>
      </div>
    </div>
    <button
      className="button is-primary is-fullwidth"
      type="submit"
      style={{ marginTop: 16 }}
      disabled={disabled}
    >
      Bayar Kosan
    </button>
    {currentMonthBill && currentMonthBill.status === "validated" && (
      <div className="notification is-success" style={{ marginTop: 12 }}>
        Pembayaran bulan ini sudah dilakukan.
      </div>
    )}
  </form>
);

export default PaymentForm;
