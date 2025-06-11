import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100], // Name must be between 3 and 100 characters
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        notEmpty: true,
        
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        notEmpty: true,
        
      }
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Products);
Products.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id'
});

export default Products;
