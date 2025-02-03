import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    //Foreign Key
    orderId: {
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
