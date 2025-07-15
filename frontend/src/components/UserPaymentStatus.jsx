const StatusPembayaran = ({ status }) => (
  <div className="box info-box status">
    <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
      Status Pembayaran Bulan Ini
    </div>
    <div>
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
);

export default StatusPembayaran;