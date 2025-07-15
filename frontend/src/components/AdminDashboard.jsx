import RulesBox from "./RulesBox";

const AdminDashboard = ({ user, summary, pendingPayments, recentUsers }) => {
  const hargaKamar = [
    { tipe: "Kecil", harga: 1600000 },
    { tipe: "Sedang", harga: 1800000 },
    { tipe: "Besar", harga: 1900000 },
  ];
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 0",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <h1 className="title" style={{ marginBottom: 0 }}>
            Selamat Datang, <span style={{ color: "#1976d2" }}>Admin</span>
          </h1>
          <div style={{ color: "#888", fontSize: 18 }}>
            Dashboard Pengelola Kos
          </div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Admin"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "2px solid #1976d2",
            background: "#fff",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Statistik Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 32,
        }}
      >
        <div
          className="box"
          style={{
            flex: "1 1 200px",
            minWidth: 200,
            borderLeft: "5px solid #1976d2",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            Total Penghuni
          </div>
          <div style={{ fontSize: 28, color: "#1976d2" }}>
            {summary.totalUsers}
          </div>
        </div>
        <div
          className="box"
          style={{
            flex: "1 1 200px",
            minWidth: 200,
            borderLeft: "5px solid #1976d2",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            Tipe Kamar
          </div>
          <div style={{ fontSize: 28, color: "#1976d2" }}>
            {summary.totalRoomTypes}
          </div>
        </div>
        <div
          className="box"
          style={{
            flex: "1 1 200px",
            minWidth: 200,
            borderLeft: "5px solid #43a047",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            Kamar Terisi
          </div>
          <div style={{ fontSize: 28, color: "#43a047" }}>
            {summary.occupiedRooms} / {summary.totalRooms}
          </div>
        </div>
        <div
          className="box"
          style={{
            flex: "1 1 200px",
            minWidth: 200,
            borderLeft: "5px solid #d32f2f",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            Pembayaran Pending
          </div>
          <div style={{ fontSize: 28, color: "#d32f2f" }}>
            {summary.pendingPayments}
          </div>
        </div>
        <div
          className="box"
          style={{
            flex: "1 1 200px",
            minWidth: 200,
            borderLeft: "5px solid #ffa000",
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            Total Tunggakan
          </div>
          <div style={{ fontSize: 28, color: "#ffa000" }}>
            Rp{summary.totalTunggakan?.toLocaleString() || 0}
          </div>
        </div>
      </div>

      <div className="box" style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          Daftar Harga Tipe Kamar
        </div>
        <div className="responsive-table-wrapper">
          <table
            className="table is-fullwidth is-bordered"
            style={{ maxWidth: 400 }}
          >
            <thead>
              <tr>
                <th>Tipe Kamar</th>
                <th>Harga / Bulan</th>
              </tr>
            </thead>
            <tbody>
              {hargaKamar.map((item) => (
                <tr key={item.tipe}>
                  <td>{item.tipe}</td>
                  <td>
                    <span style={{ color: "#1976d2", fontWeight: 600 }}>
                      Rp{item.harga.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pembayaran Pending */}
      {pendingPayments && pendingPayments.length > 0 && (
        <div className="box" style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
            Pembayaran Menunggu Validasi
          </div>
          <table
            className="table is-fullwidth is-bordered"
            style={{ fontSize: 15 }}
          >
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
      )}

      {/* Daftar Penghuni Terbaru */}
      <div className="box" style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          Penghuni Terbaru
        </div>
        {recentUsers && recentUsers.length > 0 ? (
          <div className="responsive-table-wrapper">
            <table
              className="table is-fullwidth is-bordered"
              style={{ fontSize: 15 }}
            >
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

      {/* Rules & Pengumuman */}
      <RulesBox isAdmin={true} />

      {/* Kontak Admin */}
      <div
        className="box"
        style={{
          marginTop: 32,
          background: "#f5f7fa",
          borderLeft: "5px solid #1976d2",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          Kontak Pengelola
        </div>
        <div>
          <span style={{ fontSize: 17 }}>
            <b>WhatsApp:</b>{" "}
            <a
              href="https://wa.me/62812xxxxxxx"
              target="_blank"
              rel="noopener noreferrer"
            >
              0812-xxxx-xxxx
            </a>
            <br />
            <b>Email:</b> admin@kosan.com
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
