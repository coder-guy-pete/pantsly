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
    user_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    purchase_Date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fulfillment_Date: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    purchase_amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    products: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "orders",
    sequelize,
  }
);

export default Orders;
