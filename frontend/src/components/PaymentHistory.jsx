import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/payments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPayments(res.data);
      } catch (error) {
        setPayments([]);
      }
      setLoading(false);
    };
    fetchPayments();
  }, []);

  return (
    <div className="box" style={{ maxWidth: 700, margin: "auto" }}>
      <h2 className="title is-4">Riwayat Pembayaran</h2>
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>Belum ada pembayaran.</p>
      ) : (
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Nominal</th>
              <th>Keterangan</th>
              <th>Status</th>
              <th>Bukti</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr key={pay.uuid}>
                <td>{new Date(pay.createdAt).toLocaleString()}</td>
                <td>Rp {pay.amount.toLocaleString()}</td>
                <td>{pay.description}</td>
                <td>
                  <span
                    className={
                      pay.status === "validated"
                        ? "tag is-success"
                        : pay.status === "pending"
                        ? "tag is-warning"
                        : "tag is-danger"
                    }
                  >
                    {pay.status}
                  </span>
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
                        style={{ maxWidth: 80, maxHeight: 80 }}
                      />
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
