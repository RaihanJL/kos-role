import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../styles/PaymentStatus.css";

const StatusPembayaranBulanan = () => {
  const { user } = useSelector((state) => state.auth);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const generateMonths = (year) => {
    return Array.from({ length: 12 }, (_, i) => ({
      year,
      month: i,
    }));
  };

  const isPaid = (payments, year, month) => {
    return payments.some(
      (pay) =>
        pay.status === "validated" &&
        new Date(pay.dueDate).getFullYear() === year &&
        new Date(pay.dueDate).getMonth() === month
    );
  };

  const getNominal = (payments, year, month) => {
    const pay = payments.find(
      (pay) =>
        new Date(pay.dueDate).getFullYear() === year &&
        new Date(pay.dueDate).getMonth() === month
    );
    if (pay && pay.amount)
      return { amount: pay.amount, penalty: pay.penalty || 0 };
    if (user && user.roomPrice) return { amount: user.roomPrice, penalty: 0 };
    return { amount: 0, penalty: 0 };
  };

  const isTunggakan = (year, month) => {
    const now = new Date();
    const bulanIni = now.getFullYear() * 12 + now.getMonth();
    const bulanCek = year * 12 + month;
    return bulanCek < bulanIni && !isPaid(payments, year, month);
  };

  const yearOptions = [selectedYear - 1, selectedYear, selectedYear + 1];

  return (
    <div className="box payment-status-container">
      <h2 style={{
        color: "rgb(25, 118, 210)", marginBottom: 16
      }} className="title is-3 payment-status-title">
        Status Pembayaran Bulanan
      </h2>
      <div style={{ marginBottom: 24 }}>
        <label className="payment-status-year-label">Tahun:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="payment-status-year-select"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="payment-status-loading">Loading...</div>
      ) : (
        <div className="payment-status-table-wrapper">
          <table className="table is-bordered is-fullwidth modern-status-table">
            <thead>
              <tr>
                <th style={{ width: 180 }}>Bulan</th>
                <th style={{ width: 200 }}>Nominal</th>
                <th style={{ width: 140 }}>Tunggakan</th>
                <th style={{ width: 140 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {generateMonths(selectedYear).map(({ year, month }) => {
                const paid = isPaid(payments, year, month);
                const { amount, penalty } = getNominal(payments, year, month);
                const tunggakan = isTunggakan(year, month);
                return (
                  <tr key={`${year}-${month}`}>
                    <td style={{ fontWeight: 500 }}>
                      {new Date(year, month).toLocaleString("id-ID", {
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      <span className="payment-status-nominal">
                        Rp{amount.toLocaleString()}
                      </span>
                      {penalty > 0 && (
                        <span className="payment-status-penalty">
                          + Denda Rp{penalty.toLocaleString()}
                        </span>
                      )}
                      {penalty > 0 && (
                        <div className="payment-status-total">
                          Total: Rp{(amount + penalty).toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {tunggakan ? (
                        <span className="tag is-danger is-light payment-status-tunggakan">
                          <i className="fas fa-exclamation-circle" />
                          Tunggakan
                        </span>
                      ) : (
                        <span
                          className="tag is-light payment-status-tunggakan"
                          style={{ color: "#aaa" }}
                        >
                          -
                        </span>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {paid ? (
                        <span className="tag is-success is-light payment-status-status">
                          <i className="fas fa-check-circle" />
                          Lunas
                        </span>
                      ) : (
                        <span className="tag is-warning is-light payment-status-status">
                          <i className="fas fa-clock" />
                          Belum Bayar
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StatusPembayaranBulanan;
