import React from "react";

const PaymentRow = ({ pay, onValidate, no, showAction }) => (
  <tr key={pay.uuid}>
    <td>{no}</td>
    <td>
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
    <td>{pay.user?.name}</td>
    <td>{pay.user?.email}</td>
    <td>{pay.user?.roomType || "-"}</td>
    <td>
      <span>
        Rp {pay.amount.toLocaleString()}
        {pay.penalty > 0 && (
          <>
            {" "}
            <span style={{ color: "#d90429", fontWeight: 600 }}>
              + Rp{pay.penalty.toLocaleString()}
            </span>
            <br />
            <span style={{ color: "#1976d2", fontWeight: 600 }}>
              Total: Rp{(pay.amount + pay.penalty).toLocaleString()}
            </span>
          </>
        )}
      </span>
    </td>
    <td>
      {pay.description}
      {pay.description?.toLowerCase().includes("tunggakan") &&
        pay.months &&
        Array.isArray(pay.months) &&
        pay.months.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {pay.months.map((due, i) => (
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
    <td>
      {pay.proof ? (
        <a
          href={`http://localhost:5000/uploads/${pay.proof}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`http://localhost:5000/uploads/${pay.proof}`}
            alt="Bukti"
            style={{
              maxWidth: 80,
              maxHeight: 80,
              width: "100%",
              height: "auto",
              borderRadius: 6,
              border: "1px solid #e0e7ef",
            }}
            className="proof-img"
          />
        </a>
      ) : (
        "-"
      )}
    </td>
    <td>
      <span
        className={
          pay.status === "validated"
            ? "tag is-success"
            : pay.status === "pending"
            ? "tag is-warning"
            : "tag is-danger"
        }
        style={{
          fontWeight: 600,
          fontSize: "0.95rem",
          minWidth: 90,
          display: "inline-block",
          textAlign: "center",
          borderRadius: 8,
        }}
      >
        {pay.status === "validated"
          ? "Tervalidasi"
          : pay.status === "pending"
          ? "Menunggu"
          : "Ditolak"}
      </span>
    </td>
    <td>
      {showAction && pay.status === "pending" && (
        <div style={{ display: "flex", gap: 6 }}>
          <button
            className="button is-small is-success"
            onClick={() => {
              if (
                window.confirm(
                  "Apakah Anda yakin ingin memvalidasi pembayaran ini?"
                )
              ) {
                onValidate(pay.uuid, "validated");
              }
            }}
            title="Validasi"
          >
            <span className="icon is-small">
              <i className="fas fa-check"></i>
            </span>
          </button>
          <button
            className="button is-small is-danger"
            onClick={() => {
              if (
                window.confirm(
                  "Apakah Anda yakin ingin MENOLAK pembayaran ini?"
                )
              ) {
                onValidate(pay.uuid, "rejected");
              }
            }}
            title="Tolak"
          >
            <span className="icon is-small">
              <i className="fas fa-times"></i>
            </span>
          </button>
        </div>
      )}
    </td>
  </tr>
);

export default PaymentRow;