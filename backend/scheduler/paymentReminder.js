import cron from "node-cron";
import Payments from "../models/PaymentModel.js";
import Users from "../models/UserModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// Fungsi untuk mengirim email pengingat dan sanksi
const sendReminders = async () => {
  console.log("[REMINDER] Scheduler berjalan:", new Date().toISOString());
  const today = new Date();
  const payments = await Payments.findAll({
    where: {
      status: "pending",
    },
    include: [{ model: Users }],
  });

  for (const payment of payments) {
    const dueDate = new Date(payment.dueDate);
    const user = payment.user;
    if (!user) continue;

    // Hitung selisih hari
    const diffTime = today - dueDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Pengingat sebelum jatuh tempo (H-10, H-5, H-1, H0)
    for (const h of [10, 5, 1, 0]) {
      if (
        Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24)) === h &&
        payment.status === "pending"
      ) {
        console.log(
          `[REMINDER] Akan mengirim email ke user: ${user.email} | Nama: ${
            user.name
          } | dueDate: ${dueDate.toISOString()} | Status: ${payment.status}`
        );
        await sendEmail(
          user.email,
          "Pengingat Pembayaran",
          `<p>Pembayaran Anda akan jatuh tempo pada ${dueDate.toLocaleDateString()}. Segera lakukan pembayaran.</p>`
        );
      }
    }

    // Pengingat keterlambatan (H+1, H+5, H+10, H+15, H+20)
    if ([1, 5, 10, 15, 20].includes(diffDays)) {
      let sanksi = "";
      if (diffDays === 1) sanksi = "SP1";
      if (diffDays === 5) sanksi = "SP2";
      if (diffDays === 10) sanksi = "SP3";
      if (diffDays === 15) sanksi = "SP4 + Denda Rp100.000";
      if (diffDays === 20) sanksi = "Akun Anda akan disuspend";

      await sendEmail(
        user.email,
        "Peringatan Keterlambatan Pembayaran",
        `<p>Pembayaran Anda telah terlambat ${diffDays} hari.<br/>${
          sanksi ? "Sanksi: " + sanksi : ""
        }</p>`
      );

      // SP dan denda bisa disimpan di database jika ingin
      if (diffDays === 15) {
        payment.penalty = 100000;
        await payment.save();
      }
      // Suspend akun di H+20
      if (diffDays === 20) {
        user.status = "suspend";
        await user.save();
      }
    }
  }
};

cron.schedule("* * * * *", sendReminders);
