import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import PaymentHistoryPrintTable from "./PaymentHistoryPrintTable";
import "../styles/PaymentHistory.css";
import { useSelector } from "react-redux";

const itemsPerPage = 10;

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/payments", {
          withCredentials: true, // <-- tambahkan ini
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
    <div className="box payment-history-container">
      <h2
        style={{
          color: "rgb(25, 118, 210)",
          marginBottom: 16,
        }}
        className="title is-3"
      >
        Riwayat Pembayaran
      </h2>
      <button
        className="button is-info mb-3"
        onClick={() => window.print()}
        style={{ marginBottom: 16 }}
      >
        Print Riwayat Pembayaran
      </button>
      {loading ? (
        <div className="payment-status-loading">Loading...</div>
      ) : payments.length === 0 ? (
        <p>Belum ada pembayaran.</p>
      ) : (
        <div className="payment-status-table-wrapper">
          <table className="table is-fullwidth modern-status-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Kamar</th>
                <th>Tipe Kamar</th>
                <th>Nominal</th>
                <th>Keterangan</th>
                <th>Status</th>
                <th>Bukti</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.map((pay, idx) => (
                <tr key={pay.uuid}>
                  <td>{offset + idx + 1}.</td>
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
                  <td className="payment-history-room">
                    {pay.User?.roomNumber || user?.roomNumber || "-"}
                  </td>
                  <td className="payment-history-roomtype">
                    {pay.User?.roomType || user?.roomType || "-"}
                  </td>
                  <td>
                    <span className="payment-status-nominal">
                      Rp {pay.amount.toLocaleString()}
                    </span>
                    {pay.penalty > 0 && (
                      <>
                        <span className="payment-status-penalty">
                          + Rp{pay.penalty.toLocaleString()}
                        </span>
                        <br />
                        <span className="payment-status-total">
                          Total: Rp{(pay.amount + pay.penalty).toLocaleString()}
                        </span>
                      </>
                    )}
                  </td>
                  <td>
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
                  <td>
                    <span
                      className={
                        pay.status === "validated"
                          ? "tag is-success payment-status-status"
                          : pay.status === "pending"
                          ? "tag is-warning payment-status-status"
                          : "tag is-danger payment-status-status"
                      }
                    >
                      {pay.status === "validated"
                        ? "Lunas"
                        : pay.status === "pending"
                        ? "Menunggu"
                        : "Ditolak"}
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
                          className="proof-img"
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
