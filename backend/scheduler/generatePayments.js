// backend/scheduler/generatePayments.js
import cron from "node-cron";
import Payments from "../models/PaymentModel.js";
import User from "../models/UserModel.js";

const generatePayments = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const dueDate = new Date(year, month, 25);

  // Ambil semua user aktif
  const users = await User.findAll({ where: { status: "aktif", role: "user" } });

  for (const user of users) {
    // Cek apakah sudah ada pembayaran bulan ini
    const existing = await Payments.findOne({
      where: {
        userId: user.id,
        dueDate: dueDate.toISOString().slice(0, 10),
      },
    });
    if (!existing) {
      await Payments.create({
        amount: 0, // Atur nominal default atau sesuai kebutuhan
        description: `Tagihan bulan ${dueDate.toLocaleString("default", { month: "long" })} ${year}`,
        status: "pending",
        userId: user.id,
        dueDate,
      });
    }
  }
};

// Jalankan setiap hari jam 01:00 (atau bisa setiap tanggal 25 saja: "0 1 25 * *")
cron.schedule("0 1 * * *", generatePayments);