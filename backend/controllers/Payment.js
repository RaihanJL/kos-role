import Payments from "../models/PaymentModel.js";
import User from "../models/UserModel.js";
import multer from "multer";
import path from "path";
import { sendEmail } from "../utils/sendEmail.js";

// User membuat pembayaran
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload = multer({ storage: storage });

export const createPayment = async (req, res) => {
  try {
    const { amount, description } = req.body;
    let proof = null;
    if (req.file) {
      proof = req.file.filename;
    }

    // Tentukan dueDate setiap tanggal 25
    const today = new Date();
    let dueDate = new Date(today.getFullYear(), today.getMonth(), 25);
    if (today.getDate() > 25) {
      // Jika sudah lewat tanggal 25, set ke bulan depan
      dueDate = new Date(today.getFullYear(), today.getMonth() + 1, 25);
    }

    await Payments.create({
      amount,
      description,
      proof,
      userId: req.userId,
      dueDate: req.body.dueDate,
    });

    await sendEmail(
      "kosanhm7no.23@gmail.com", // Ganti dengan email admin
      "Pembayaran Baru Masuk",
      `<p>Ada pembayaran baru dari user ID: <b>${req.userId}</b>.<br>Silakan cek dashboard admin untuk validasi pembayaran.</p>`
    );
    res.status(201).json({ msg: "Pembayaran berhasil diajukan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// User melihat riwayat pembayaran miliknya
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll({
      where: { userId: req.userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Admin melihat semua pembayaran
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.findAll({
      include: [{ model: User, attributes: ["name", "email"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Admin validasi pembayaran
export const validatePayment = async (req, res) => {
  try {
    const { status } = req.body; // "validated" atau "rejected"
    const payment = await Payments.findOne({ where: { uuid: req.params.id } });
    if (!payment)
      return res.status(404).json({ msg: "Pembayaran tidak ditemukan" });

    await Payments.update({ status }, { where: { uuid: req.params.id } });

    // Ambil user terkait
    const user = await User.findByPk(payment.userId);
    if (user && user.email) {
      await sendEmail(
        user.email,
        "Status Pembayaran Anda",
        `<p>Pembayaran Anda telah di <b>${status}</b>.</p>`
      );
    }

    res.json({ msg: "Status pembayaran diperbarui & email dikirim" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
