export default function AdminRecentUsers({ recentUsers }) {
  return (
    <div className="box" style={{ marginBottom: 32 }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
        Penghuni Terbaru
      </div>
      {recentUsers && recentUsers.length > 0 ? (
        <div className="responsive-table-wrapper" style={{ overflowX: "auto" }}>
          <table
            className="table is-fullwidth is-bordered"
            style={{ fontSize: 15, minWidth: 600 }}
          >
            <thead>
              <tr>
                <th>Nama</th>
                <th>Nomor Kamar</th>
                <th>Tipe</th>
                <th>Harga</th>
                <th>Email</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.roomNumber ? `Kamar ${u.roomNumber}` : "-"}</td>
                  <td>{u.roomType || "-"}</td>
                  <td>
                    {u.roomPrice ? `Rp${u.roomPrice.toLocaleString()}` : "-"}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      className={`tag is-${
                        u.status === "aktif" ? "success" : "danger"
                      }`}
                    >
                      {u.status === "aktif" ? "Aktif" : "Suspend"}
                    </span>
                    {u.role === "admin" && (
                      <span className="tag is-info" style={{ marginLeft: 6 }}>
                        Admin
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
