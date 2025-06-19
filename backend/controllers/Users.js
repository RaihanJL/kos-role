import User from "../models/UserModel.js";
import argon2 from "argon2";

// Contoh di Express + Sequelize
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "uuid",
        "name",
        "email",
        "role",
        "roomType",
        "roomPrice"
      ]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, confPassword, roomType, roomPrice } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !confPassword ||
    !roomType ||
    roomPrice === undefined ||
    roomPrice === null ||
    roomPrice === ""
  ) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  }

  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name,
      email,
      password: hashPassword,
      roomType,
      roomPrice,
      role: "user",
      status: "aktif",
    });
    res.status(201).json({ message: "Register Berhasil!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password; // Use the existing password if not provided
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password dan Confirm Password tidak cocok" });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ message: "User updated " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
