const InfoKamar = ({ user }) => (
  <div className="box info-box">
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
);

export default InfoKamar;