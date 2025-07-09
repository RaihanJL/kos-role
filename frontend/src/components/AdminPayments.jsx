import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../styles/AdminPayments.css"; // Assuming you have a CSS file for styles

const itemsPerPage = 10;

const PaymentRow = ({ pay, onValidate, no }) => (
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
            style={{
              maxWidth: 80,
              maxHeight: 80,
              width: "100%",
              height: "auto",
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
      >
        {pay.status}
      </span>
    </td>
    <td>
      {pay.status === "pending" && (
        <>
          <button
            className="button is-small is-success mr-2"
            onClick={() => {
              if (
                window.confirm(
                  "Apakah Anda yakin ingin memvalidasi pembayaran ini?"
                )
              ) {
                onValidate(pay.uuid, "validated");
              }
            }}
          >
            Validasi
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
          >
            Tolak
          </button>
        </>
      )}
    </td>
  </tr>
);

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/payments/admin");
      setPayments(res.data);
    } catch (error) {
      setPayments([]);
      setMessage("Gagal mengambil data pembayaran");
    }
    setLoading(false);
  };

  const handleValidate = async (uuid, status) => {
    try {
      await axios.patch(`http://localhost:5000/payments/${uuid}`, { status });
      setMessage("Status pembayaran diperbarui");
      fetchPayments();
    } catch (error) {
      setMessage(error.response?.data?.msg || "Gagal memperbarui status");
    }
  };

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentPayments = payments.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(payments.length / itemsPerPage);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

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
                <th>No</th>
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
              {currentPayments.map((pay, idx) => (
                <PaymentRow
                  key={pay.uuid}
                  pay={pay}
                  onValidate={handleValidate}
                  no={offset + idx + 1} // Kirim nomor ke PaymentRow
                />
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"custom-pagination"}
            pageClassName={"custom-page"}
            previousClassName={"custom-prev"}
            nextClassName={"custom-next"}
            activeClassName={"is-current"}
            disabledClassName={"is-disabled"}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
