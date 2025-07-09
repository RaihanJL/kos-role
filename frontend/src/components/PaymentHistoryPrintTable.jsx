import React from "react";

const PaymentHistoryPrintTable = ({ payments }) => (
  <div>
    <div
      className="print-table"
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 16,
      }}
    >
      Riwayat Pembayaran
    </div>
    <table
      className="print-table"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 24,
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #000", padding: 8 }}>No</th>
          <th style={{ border: "1px solid #000", padding: 8 }}>Tanggal</th>
          <th style={{ border: "1px solid #000", padding: 8 }}>Nominal</th>
          <th style={{ border: "1px solid #000", padding: 8 }}>Keterangan</th>
          <th style={{ border: "1px solid #000", padding: 8 }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((pay, idx) => (
          <tr key={pay.uuid}>
            <td style={{ border: "1px solid #000", padding: 8 }}>{idx + 1}</td>
            <td style={{ border: "1px solid #000", padding: 8 }}>
              {new Date(pay.createdAt).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              {new Date(pay.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </td>
            <td style={{ border: "1px solid #000", padding: 8 }}>
              Rp {pay.amount.toLocaleString()}
            </td>
            <td style={{ border: "1px solid #000", padding: 8 }}>
              {pay.description}
            </td>
            <td style={{ border: "1px solid #000", padding: 8 }}>
              {pay.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="print-signature" style={{ marginTop: 40, width: "100%" }}>
      <div style={{ textAlign: "left", marginRight: 40 }}>
        <div>Admin,</div>
        <img
          src="/signature-admin.png"
          alt="Tanda Tangan Admin"
          style={{ width: 120, margin: "16px 0" }}
        />
        <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
          Narny Syamsuddin
        </div>
        <div style={{ fontSize: 12 }}>Tanda Tangan</div>
      </div>
    </div>
  </div>
);

export default PaymentHistoryPrintTable;
