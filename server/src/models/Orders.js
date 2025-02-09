import { DataTypes, Model } from "sequelize";
import sequelize from "../config/connection.js";

class Orders extends Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //Foreign Key
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    purchase_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fulfillment_date: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    tableName: "orders",
    sequelize,
  }
);

export default Orders;
