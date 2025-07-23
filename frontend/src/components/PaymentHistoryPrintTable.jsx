import React from "react";
import { useSelector } from "react-redux";

const PaymentHistoryPrintTable = ({ payments }) => {
  // Ambil user dari redux untuk fallback jika data user tidak ada di payment
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="print-table"
      style={{
        width: "100%",
        background: "#fff",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <div
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
            <th style={{ border: "1px solid #000", padding: 8 }}>Kamar</th>
            <th style={{ border: "1px solid #000", padding: 8 }}>Tipe Kamar</th>
            <th style={{ border: "1px solid #000", padding: 8 }}>Nominal</th>
            <th style={{ border: "1px solid #000", padding: 8 }}>Keterangan</th>
            <th style={{ border: "1px solid #000", padding: 8 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay, idx) => (
            <tr key={pay.uuid}>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {idx + 1}
              </td>
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
                {pay.User?.roomNumber || user?.roomNumber || "-"}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {pay.User?.roomType || user?.roomType || "-"}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                Rp {pay.amount.toLocaleString()}
                {pay.penalty > 0 && (
                  <>
                    <br />
                    <span style={{ color: "#d90429" }}>
                      + Rp{pay.penalty.toLocaleString()}
                    </span>
                    <br />
                    <span style={{ color: "#1976d2", fontWeight: 700 }}>
                      Total: Rp{(pay.amount + pay.penalty).toLocaleString()}
                    </span>
                  </>
                )}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {pay.description}
                {pay.description?.toLowerCase().includes("tunggakan") &&
                  pay.months &&
                  Array.isArray(pay.months) &&
                  pay.months.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {pay.months.map((due) => (
                        <li key={due}>
                          {new Date(due).toLocaleString("id-ID", {
                            month: "long",
                            year: "numeric",
                          })}
                        </li>
                      ))}
                    </ul>
                  )}
              </td>
              <td style={{ border: "1px solid #000", padding: 8 }}>
                {pay.status === "validated"
                  ? "Lunas"
                  : pay.status === "pending"
                  ? "Menunggu"
                  : "Ditolak"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="print-footer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 40,
          width: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div>Admin,</div>
          <img
            src="/signature-admin.png"
            alt="Tanda Tangan Admin"
            style={{ width: 120, margin: "16px 0" }}
          />
          <div style={{ fontWeight: "bold", marginTop: 8 }}>
            Narny Syamsuddin
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryPrintTable;
