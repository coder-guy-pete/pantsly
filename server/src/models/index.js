import User from "./User.js";
import Orders from "./Orders.js";
import OrderItem from "./OrderItem.js";
import ProductVariants from "./ProductVariants.js";

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

OrderItem.hasOne(ProductVariants, {
  foreignKey: "product_Id",
});
ProductVariants.belongsTo(OrderItem, {
  foreignKey: "product_Id",
});

export { User, Orders, OrderItem, ProductVariants };
