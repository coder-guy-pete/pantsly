import User from "./User";
import Orders from "./Orders";
import OrderItem from "./OrderItem";
import ProductVariant from "./ProductVariant";

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

export { User, Orders, OrderItem, ProductVariant };
