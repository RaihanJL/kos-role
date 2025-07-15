import RulesBox from "./RulesBox";

const UserDashboard = ({ user, status, arrears, lastPayments }) => (
  <div className="welcome-container">
    {/* Header */}
    <div className="welcome-header">
      <div>
        <h1 className="welcome-title title">
          Selamat Datang, <span style={{ color: "#1976d2" }}>{user?.name}</span>
        </h1>
        <div className="welcome-subtitle">Dashboard Penghuni Kos</div>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="User"
        className="welcome-header-img"
      />
    </div>

    {/* Info Cards */}
    <div className="info-cards">
      {/* Info Kamar */}
      <div className="box info-box info-kamar">
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          Info Kamar
        </div>
        <div>
          <b>Kamar:</b> {user?.roomName || "-"}
          <br />
          <b>Tipe:</b> {user?.roomType || "-"}
          <br />
          <b>Harga:</b>{" "}
          {user?.roomPrice ? (
            <span style={{ color: "#1976d2" }}>
              Rp{user.roomPrice.toLocaleString()}
            </span>
          ) : (
            "-"
          )}
        </div>
      </div>

      {/* Status Pembayaran Bulan Ini */}
      <div className="box info-box status">
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          Status Pembayaran Bulan Ini
        </div>
        <div className="status-tag-wrapper">
          {status ? (
            status.status === "validated" ? (
              <span className="tag is-success is-medium">Lunas</span>
            ) : (
              <span className="tag is-warning is-medium">Belum Lunas</span>
            )
          ) : (
            <span className="tag is-light is-medium">Belum Ada Tagihan</span>
          )}
        </div>
      </div>

      {/* Tunggakan */}
      <div className="box info-box tunggakan">
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
          Tunggakan
        </div>
        {arrears && arrears.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {arrears.map((a, idx) => (
              <li key={a.dueDate || idx}>
                <span style={{ color: "#d32f2f" }}>
                  {a.dueDate
                    ? new Date(a.dueDate).toLocaleString("id-ID", {
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </span>{" "}
                - Rp{a.amount?.toLocaleString() || "-"}
              </li>
            ))}
          </ul>
        ) : (
          <span style={{ color: "#43a047" }}>Tidak ada tunggakan.</span>
        )}
      </div>
    </div>

    {/* Riwayat Pembayaran Terakhir */}
    <div className="box riwayat-box">
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
        Riwayat Pembayaran Terakhir
      </div>
      {lastPayments && lastPayments.length > 0 ? (
        <div className="responsive-table-wrapper">
          <table
            className="table is-fullwidth is-bordered"
            style={{ fontSize: 15 }}
          >
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
        </div>
      ) : (
        <span>Belum ada pembayaran.</span>
      )}
    </div>

    {/* Rules */}
    <RulesBox isAdmin={user?.role === "admin"} boxStyle={{}} />

    {/* Kontak Admin */}
    <div className="box kontak-box">
      <div className="kontak-title">Kontak Admin</div>
      <div className="kontak-content">
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
      </div>
    </div>
  </div>
);

export default UserDashboard;
