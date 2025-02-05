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

OrderItem.hasMany(ProductVariants, {
  foreignKey: "product_Id",
});
ProductVariants.belongsTo(Orders, {
  foreignKey: "product_Id",
});

export default { User, Orders, OrderItem, ProductVariants };
