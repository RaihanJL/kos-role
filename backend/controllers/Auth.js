import User from "../models/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

  // CEK STATUS SUSPEND
  if (user.status === "suspend") {
    return res
      .status(403)
      .json({ message: "Akun Anda disuspend. Hubungi admin." });
  }

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ message: "Password salah" });

  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  const roomType = user.roomType;
  const roomPrice = user.roomPrice;
  res.status(200).json({
    uuid,
    name,
    email,
    role,
    roomType,
    roomPrice,
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "Anda harus login terlebih dahulu" });
  }
  const user = await User.findOne({
    attributes: [
      "uuid",
      "name",
      "email",
      "role",
      "roomType",
      "roomPrice",
      "phone", // tambahkan ini
      "address", // tambahkan ini
    ],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(200).json({ message: "Anda telah logout" });
  });
};
