import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    //Foreign Key
    product_variant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product_Variants",
        key: "id",
      },
    },
    //Foreign Key
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "orders",
        key: "id",
      },
    },
  },
  {
    tableName: "orderItems",
    sequelize,
  }
);

export default OrderItem;
