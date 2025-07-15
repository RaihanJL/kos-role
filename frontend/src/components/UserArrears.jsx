const TunggakanUser = ({ arrears }) => (
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
);

export default TunggakanUser;