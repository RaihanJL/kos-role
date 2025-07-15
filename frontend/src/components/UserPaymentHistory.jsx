const RiwayatPembayaranUser = ({ lastPayments }) => (
  <div className="box riwayat-box">
    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
      Riwayat Pembayaran Terakhir
    </div>
    {lastPayments && lastPayments.length > 0 ? (
      <table className="table is-fullwidth is-bordered" style={{ fontSize: 15 }}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nominal</th>
            <th>Status</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {lastPayments.map((p) => (
            <tr key={p.uuid}>
              <td>
                {new Date(p.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>Rp{p.amount.toLocaleString()}</td>
              <td>
                <span
                  className={
                    p.status === "validated"
                      ? "tag is-success"
                      : p.status === "pending"
                      ? "tag is-warning"
                      : "tag is-danger"
                  }
                >
                  {p.status}
                </span>
              </td>
              <td>
                {p.description}
                {p.months &&
                  Array.isArray(p.months) &&
                  p.months.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {p.months.map((due, i) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <span>Belum ada pembayaran.</span>
    )}
  </div>
);

export default RiwayatPembayaranUser;