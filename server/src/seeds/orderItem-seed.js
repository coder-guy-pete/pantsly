import OrderItem from "../models/OrderItem.js";

export const seedOrderItem = async () => {
  await OrderItem.bulkCreate([
    {
      quantity: 2,
      product_variant_id: 1,
      order_id: 1
    },
    {
      quantity: 1,
      product_variant_id: 2,
      order_id: 1
    },
    {
      quantity: 3,
      product_variant_id: 3,
      order_id: 1
    },
    {
      quantity: 1,
      product_variant_id: 4,
      order_id: 2
    },
    {
      quantity: 2,
      product_variant_id: 5,
      order_id: 2
    },
    {
      quantity: 1,
      product_variant_id: 6,
      order_id: 2
    }
  ]);
};
