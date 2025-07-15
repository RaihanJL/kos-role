import React from "react";
import "../styles/ArrearsTable.css";

const ArrearsTable = ({
  arrears,
  selectedArrears,
  setSelectedArrears,
  disabled = false,
}) => {
  if (!arrears || !arrears.arrears) return null;
  return (
    <div className="arrears-table-wrapper">
      <table className="arrears-table">
        <thead>
          <tr>
            <th style={{ width: 160 }}>Bulan</th>
            <th style={{ width: 120 }}>Nominal</th>
            <th style={{ width: 100 }}>Denda</th>
          </tr>
        </thead>
        <tbody>
          {arrears.arrears.map((item, idx) => (
            <tr key={idx}>
              <td>
                <label className="arrears-checkbox-label">
                  <input
                    type="checkbox"
                    value={item.dueDate}
                    checked={selectedArrears.includes(item.dueDate)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedArrears([...selectedArrears, item.dueDate]);
                      } else {
                        setSelectedArrears(
                          selectedArrears.filter((d) => d !== item.dueDate)
                        );
                      }
                    }}
                    disabled={disabled}
                    className="arrears-checkbox"
                  />
                  <span className="arrears-month">
                    {new Date(item.dueDate).toLocaleString("id-ID", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </label>
              </td>
              <td>
                <span className="arrears-nominal">
                  Rp{item.amount.toLocaleString()}
                </span>
              </td>
              <td>
                {item.penalty && item.penalty > 0 ? (
                  <span className="arrears-penalty">
                    +Rp{item.penalty.toLocaleString()}
                  </span>
                ) : (
                  <span className="arrears-penalty-none">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArrearsTable;
