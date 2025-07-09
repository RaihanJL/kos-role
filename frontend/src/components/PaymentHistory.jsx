import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import PaymentHistoryPrintTable from "./PaymentHistoryPrintTable";
import "../styles/PaymentHistory.css"; // Assuming you have a CSS file for styles

const itemsPerPage = 10;

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

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

  // Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentPayments = payments.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(payments.length / itemsPerPage);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="box" style={{ maxWidth: 700, margin: "auto" }}>
      <h2 className="title is-4">Riwayat Pembayaran</h2>
      <button
        className="button is-info mb-3"
        onClick={() => window.print()}
        style={{ marginBottom: 16 }}
      >
        Print Riwayat Pembayaran
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>Belum ada pembayaran.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nominal</th>
                <th>Keterangan</th>
                <th>Status</th>
                <th>Bukti</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((pay, idx) => (
                <tr key={pay.uuid}>
                  <td>{offset + idx + 1}</td>
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
      <div className="print-table">
        <PaymentHistoryPrintTable payments={payments} />
      </div>
    </div>
  );
};

export default PaymentHistory;
