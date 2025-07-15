export default function AdminRecentUsers({ recentUsers }) {
  return (
    <div className="box" style={{ marginBottom: 32 }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
        Penghuni Terbaru
      </div>
      {recentUsers && recentUsers.length > 0 ? (
        <table className="table is-fullwidth is-bordered" style={{ fontSize: 15 }}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kamar</th>
              <th>Tipe</th>
              <th>Harga</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.roomName || "-"}</td>
                <td>{u.roomType || "-"}</td>
                <td>
                  {u.roomPrice ? `Rp${u.roomPrice.toLocaleString()}` : "-"}
                </td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <span>Belum ada penghuni baru.</span>
      )}
      <div style={{ marginTop: 12 }}>
        <a href="/users" className="button is-link is-small">
          Lihat Semua Penghuni
        </a>
      </div>
    </div>
  );
}