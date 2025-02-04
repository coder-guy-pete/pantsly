import User from "./User.js";
import Orders from "./Orders.js";
import OrderItem from "./OrderItem.js";
import ProductVariant from "./ProductVariant.js";

// Define associations
User.hasMany(Orders, {
  foreignKey: "user_Id",
});
Orders.belongsTo(User, {
  foreignKey: "user_Id",
});

Orders.hasMany(OrderItem, {
  foreignKey: "order_Id",
});
OrderItem.belongsTo(Orders, {
  foreignKey: "order_Id",
});

OrderItem.hasMany(ProductVariant, {
  foreignKey: "product_Id",
});
ProductVariant.belongsTo(Order, {
  foreignKey: "product_Id",
});

export default { User, Orders, OrderItem, ProductVariant };
