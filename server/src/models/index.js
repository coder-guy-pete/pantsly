import User from "./User.js";
import Orders from "./Orders.js";
import OrderItem from "./OrderItem.js";
import ProductVariants from "./ProductVariants.js";

// Define associations
User.hasMany(Orders, {
  foreignKey: "user_id",
});
Orders.belongsTo(User, {
  foreignKey: "user_id",
});

Orders.hasMany(OrderItem, {
  foreignKey: "order_id",
});
OrderItem.belongsTo(Orders, {
  foreignKey: "order_id",
});

OrderItem.belongsTo(ProductVariants, {
  foreignKey: "product_variant_id",
});

// ProductVariants.belongsTo(OrderItem, {
//   foreignKey: "product_variant_id",
// });

export { User, Orders, OrderItem, ProductVariants };
