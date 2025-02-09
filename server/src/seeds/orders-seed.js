import Orders from "../models/Orders.js";

export const seedOrders = async () => {
  await Orders.bulkCreate([
    {
      user_id: 1,
      purchase_date: "2023-10-27",
      fulfillment_date: "2023-10-29", // Could be null if not fulfilled yet
    },
    {
      user_id: 2,
      purchase_date: "2023-10-26",
      fulfillment_date: "2023-10-28",
    },
  ]);
};
