export default function AdminSummaryCards({ summary }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
      <div className="box" style={{ flex: "1 1 200px", minWidth: 200, borderLeft: "5px solid #1976d2" }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Total Penghuni</div>
        <div style={{ fontSize: 28, color: "#1976d2" }}>{summary.totalUsers}</div>
      </div>
      <div className="box" style={{ flex: "1 1 200px", minWidth: 200, borderLeft: "5px solid #1976d2" }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Tipe Kamar</div>
        <div style={{ fontSize: 28, color: "#1976d2" }}>{summary.totalRoomTypes}</div>
      </div>
      <div className="box" style={{ flex: "1 1 200px", minWidth: 200, borderLeft: "5px solid #43a047" }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Kamar Terisi</div>
        <div style={{ fontSize: 28, color: "#43a047" }}>
          {summary.occupiedRooms} / {summary.totalRooms}
        </div>
      </div>
      <div className="box" style={{ flex: "1 1 200px", minWidth: 200, borderLeft: "5px solid #d32f2f" }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Pembayaran Pending</div>
        <div style={{ fontSize: 28, color: "#d32f2f" }}>{summary.pendingPayments}</div>
      </div>
      <div className="box" style={{ flex: "1 1 200px", minWidth: 200, borderLeft: "5px solid #ffa000" }}>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>Total Tunggakan</div>
        <div style={{ fontSize: 28, color: "#ffa000" }}>
          Rp{summary.totalTunggakan?.toLocaleString() || 0}
        </div>
      </div>
    </div>
  );
}