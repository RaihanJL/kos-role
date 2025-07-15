import React from "react";
import ArrearsTable from "./ArrearsTable";

const PaymentFormArrears = ({
  arrears,
  selectedArrears,
  setSelectedArrears,
  selectedNominal,
  proof,
  setProof,
  handleSubmit,
  disabled,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">Pilih tunggakan yang ingin dibayar:</label>
      <ArrearsTable
        arrears={arrears}
        selectedArrears={selectedArrears}
        setSelectedArrears={setSelectedArrears}
        disabled={disabled}
      />
    </div>
    <div className="field">
      <label className="label">Total Nominal</label>
      <div className="control">
        <input
          type="text"
          className="input"
          value={
            selectedNominal !== undefined && selectedNominal !== null
              ? `Rp${selectedNominal.toLocaleString()}`
              : "-"
          }
          readOnly
          style={{ background: "#f5f5f5" }}
        />
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
      Bayar Tunggakan
    </button>
    {disabled && (
      <div className="notification is-success" style={{ marginTop: 12 }}>
        Tidak ada tunggakan yang bisa dibayar.
      </div>
    )}
  </form>
);

export default PaymentFormArrears;
