import User from "./User";
import Order from "./Order";
import OrderItem from "./OrderItem";
import ProductVariant from "./ProductVariant";

// Define associations
User.hasMany(Order, {
  foreignKey: "user_Id",
});
Order.belongsTo(User, {
  foreignKey: "user_Id",
});

Order.hasMany(OrderItem, {
  foreignKey: "order_Id",
});
OrderItem.belongsTo(Order, {
  foreignKey: "order_Id",
});

OrderItem.hasMany(ProductVariant, {
  foreignKey: "product_Id",
});
ProductVariant.belongsTo(Order, {
  foreignKey: "product_Id",
});

export { User, Order, OrderItem, ProductVariant };
