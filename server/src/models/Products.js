import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class Products extends Model {}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
  },
  {
    tableName: "products",
    sequelize,
  }
);

export default Products;
