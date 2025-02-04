import User from "./User";
import Products from "./Products";
import Order from "./Order";
import OrderItem from "./OrderItem";
import ProductVariant from "./ProductVariant";

// Define associations
User.hasMany(Order, {
  foreignKey: "userId",
});
Order.belongsTo(User, {
  foreignKey: "userId",
});

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
});
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
});

Products.hasMany(ProductVariant, {
  foreignKey: "productId",
});
ProductVariant.belongsTo(Products, {
  foreignKey: "productId",
});

export { User, Products, Order, OrderItem, ProductVariant };

