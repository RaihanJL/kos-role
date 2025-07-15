const hargaKamar = [
  {
    tipe: "Kecil",
    harga: 1600000,
    fasilitas: [
      "Kamar mandi luar",
      "Kasur single",
      "Lemari pakaian",
      "Meja belajar",
      "Listrik & air",
    ],
  },
  {
    tipe: "Sedang",
    harga: 1800000,
    fasilitas: [
      "Kamar mandi dalam",
      "Kasur single",
      "Lemari pakaian",
      "Meja belajar",
      "Listrik & air",
    ],
  },
  {
    tipe: "Besar",
    harga: 1900000,
    fasilitas: [
      "Kamar mandi dalam (lebih luas)",
      "Kasur queen",
      "Lemari pakaian besar",
      "Meja belajar",
      "AC",
      "Listrik & air",
    ],
  },
];

export default function AdminRoomPriceTable() {
  return (
    <div className="box" style={{ marginBottom: 32 }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
        Daftar Harga Tipe Kamar
      </div>
      <table className="table is-fullwidth is-bordered" style={{ maxWidth: 600 }}>
        <thead>
          <tr>
            <th>Tipe Kamar</th>
            <th>Harga / Bulan</th>
            <th>Fasilitas</th>
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
              <td>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {item.fasilitas.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}