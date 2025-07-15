export default function AdminPendingPayments({ pendingPayments }) {
  if (!pendingPayments || pendingPayments.length === 0) return null;
  return (
    <div className="box" style={{ marginBottom: 32 }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
        Pembayaran Menunggu Validasi
      </div>
      <table className="table is-fullwidth is-bordered" style={{ fontSize: 15 }}>
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>User</th>
            <th>Nominal</th>
            <th>Keterangan</th>
            <th>Bukti</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingPayments.slice(0, 5).map((p) => (
            <tr key={p.uuid}>
              <td>
                {new Date(p.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>{p.user?.name}</td>
              <td>Rp{p.amount.toLocaleString()}</td>
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
              <td>
                {p.proof ? (
                  <a
                    href={`http://localhost:5000/uploads/${p.proof}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`http://localhost:5000/uploads/${p.proof}`}
                      alt="Bukti"
                      style={{
                        maxWidth: 60,
                        maxHeight: 60,
                        borderRadius: 4,
                      }}
                    />
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <span className="tag is-warning">{p.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <a href="/admin/payments" className="button is-link is-small">
          Lihat Semua Pembayaran
        </a>
      </div>
    </div>
  );
}