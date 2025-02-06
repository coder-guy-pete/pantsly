import OrderItem from "../models/OrderItem.js";

export const seedOrderItem = async () => {
  await OrderItem.bulkCreate([]);
};
