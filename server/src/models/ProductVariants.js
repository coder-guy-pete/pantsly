import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class ProductVariants extends Model {}

ProductVariants.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //Foreign Key
    product_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "order",
        key: "id",
      },
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.ENUM("red", "blue", "green", "black", "white"),
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM("small", "medium", "large", "extra-large"),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    sell_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock_Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reorder_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reorder_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reorder_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_URL: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    tableName: "product_Variants",
    sequelize,
  }
);

export default ProductVariants;
