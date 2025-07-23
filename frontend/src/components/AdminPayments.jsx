import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import PaymentRow from "./PaymentRow";
import "../styles/AdminPayments.css";

const itemsPerPage = 10;

const sortOptions = [
  { value: "createdAt", label: "Tanggal" },
  { value: "amount", label: "Nominal" },
  { value: "status", label: "Status" },
];

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPagePending, setCurrentPagePending] = useState(0);
  const [currentPagePaid, setCurrentPagePaid] = useState(0);

  // Search & Sort state
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

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

  // Filter & sort logic
  const filteredPayments = payments
    .filter((pay) => {
      const q = search.toLowerCase();
      return (
        pay.user?.name?.toLowerCase().includes(q) ||
        pay.user?.email?.toLowerCase().includes(q) ||
        pay.description?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      let valA, valB;
      if (sortBy === "createdAt") {
        valA = new Date(a.createdAt);
        valB = new Date(b.createdAt);
      } else if (sortBy === "amount") {
        valA = a.amount;
        valB = b.amount;
      } else if (sortBy === "status") {
        valA = a.status;
        valB = b.status;
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

  // Pisahkan pembayaran pending & sudah bayar
  const pendingPayments = filteredPayments.filter(
    (pay) => pay.status === "pending"
  );
  const paidPayments = filteredPayments.filter(
    (pay) => pay.status !== "pending"
  );

  // Pagination logic
  const offsetPending = currentPagePending * itemsPerPage;
  const currentPending = pendingPayments.slice(
    offsetPending,
    offsetPending + itemsPerPage
  );
  const pageCountPending = Math.ceil(pendingPayments.length / itemsPerPage);

  const offsetPaid = currentPagePaid * itemsPerPage;
  const currentPaid = paidPayments.slice(offsetPaid, offsetPaid + itemsPerPage);
  const pageCountPaid = Math.ceil(paidPayments.length / itemsPerPage);

  const handlePageClickPending = ({ selected }) =>
    setCurrentPagePending(selected);
  const handlePageClickPaid = ({ selected }) => setCurrentPagePaid(selected);

  return (
    <div className="admin-payments-container">
      <div className="admin-payments-header">
        <h2 className="admin-payments-title">Validasi Pembayaran</h2>
        {message && <div className="notification is-info">{message}</div>}
      </div>

      {/* Search & Sort */}
      <div className="admin-payments-controls">
        <input
          className="input"
          type="text"
          placeholder="Cari nama, email, atau keterangan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPagePending(0);
            setCurrentPagePaid(0);
          }}
        />
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >{`Sort: ${opt.label}`}</option>
          ))}
        </select>
        <button
          className="button"
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
        >
          {sortDir === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      </div>

      {/* Tabel Pending */}
      <div style={{ marginTop: 30 }}>
        <h3
          className="subtitle is-5"
          style={{ fontWeight: 700, color: "#1976d2" }}
        >
          User Belum Membayar / Menunggu Validasi
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : currentPending.length === 0 ? (
          <p>Tidak ada pembayaran menunggu validasi.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table admin-payments-table is-fullwidth is-striped is-hoverable is-size-7-mobile">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Kamar</th>
                  <th>Tipe Kamar</th>
                  <th>Nominal</th>
                  <th>Keterangan</th>
                  <th>Bukti</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentPending.map((pay, idx) => (
                  <PaymentRow
                    key={pay.uuid}
                    pay={pay}
                    onValidate={handleValidate}
                    no={offsetPending + idx + 1}
                    showAction={true}
                  />
                ))}
              </tbody>
            </table>
            <div className="custom-pagination-wrapper">
              <ReactPaginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCountPending}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClickPending}
                containerClassName={"custom-pagination"}
                pageClassName={"custom-page"}
                previousClassName={"custom-prev"}
                nextClassName={"custom-next"}
                activeClassName={"is-current"}
                disabledClassName={"is-disabled"}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabel Sudah Bayar */}
      <div style={{ marginTop: 40 }}>
        <h3
          className="subtitle is-5"
          style={{ fontWeight: 700, color: "#388e3c" }}
        >
          Tabel Pembayaran User
        </h3>
        {loading ? (
          <p>Loading...</p>
        ) : currentPaid.length === 0 ? (
          <p>Tidak ada pembayaran selesai.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table admin-payments-table is-fullwidth is-striped is-hoverable is-size-7-mobile">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Kamar</th>
                  <th>Tipe Kamar</th>
                  <th>Nominal</th>
                  <th>Keterangan</th>
                  <th>Bukti</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentPaid.map((pay, idx) => (
                  <PaymentRow
                    key={pay.uuid}
                    pay={pay}
                    onValidate={handleValidate}
                    no={offsetPaid + idx + 1}
                    showAction={false}
                  />
                ))}
              </tbody>
            </table>
            <div className="custom-pagination-wrapper">
              <ReactPaginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCountPaid}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClickPaid}
                containerClassName={"custom-pagination"}
                pageClassName={"custom-page"}
                previousClassName={"custom-prev"}
                nextClassName={"custom-next"}
                activeClassName={"is-current"}
                disabledClassName={"is-disabled"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
