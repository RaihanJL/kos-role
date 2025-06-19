import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/payments/admin");
      setPayments(res.data);
    } catch (error) {
      setPayments([]);
      setMessage("Gagal mengambil data pembayaran");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleValidate = async (uuid, status) => {
    try {
      await axios.patch(`http://localhost:5000/payments/${uuid}`, {
        status,
      });
      setMessage("Status pembayaran diperbarui");
      fetchPayments();
    } catch (error) {
      setMessage(error.response?.data?.msg || "Gagal memperbarui status");
    }
  };

  return (
    <div className="box" style={{ maxWidth: 1100, margin: "auto" }}>
      <h2 className="title is-4">Validasi Pembayaran</h2>
      {message && <div className="notification is-info">{message}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>Tidak ada pembayaran.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="table is-fullwidth is-striped is-hoverable is-size-7-mobile">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>User</th>
                <th>Email</th>
                <th>Nominal</th>
                <th>Keterangan</th>
                <th>Bukti</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay.uuid}>
                  <td>{new Date(pay.createdAt).toLocaleString()}</td>
                  <td>{pay.user?.name}</td>
                  <td>{pay.user?.email}</td>
                  <td>Rp {pay.amount.toLocaleString()}</td>
                  <td>{pay.description}</td>
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
                          style={{ maxWidth: 80, maxHeight: 80, width: "100%", height: "auto" }}
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
                    >
                      {pay.status}
                    </span>
                  </td>
                  <td>
                    {pay.status === "pending" && (
                      <>
                        <button
                          className="button is-small is-success mr-2"
                          onClick={() => handleValidate(pay.uuid, "validated")}
                        >
                          Validasi
                        </button>
                        <button
                          className="button is-small is-danger"
                          onClick={() => handleValidate(pay.uuid, "rejected")}
                        >
                          Tolak
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <style>
        {`
        @media (max-width: 600px) {
          .proof-img {
            max-width: 48px !important;
            max-height: 48px !important;
          }
          table.is-size-7-mobile {
            font-size: 0.85rem;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AdminPayments;