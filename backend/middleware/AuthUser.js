import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "Anda harus login terlebih dahulu" });
  }

  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  req.userId = user.id;
  req.role = user.role;
  next(); // Proceed to the next middleware or route handler
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User tidak ditemukan" });
  }
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Akses ditolak, hanya admin yang dapat mengakses" });
  }
  next(); // Proceed to the next middleware or route handler
};
