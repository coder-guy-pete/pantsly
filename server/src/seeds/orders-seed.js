import Orders from "../models/Orders.js";

export const seedOrders = async () => {
  await Orders.bulkCreate([
    {
      number: "123456",
      user_id: "user-456",
      purchase_date: "2023-10-27",
      fulfillment_date: "2023-10-29", // Could be null if not fulfilled yet
    },
    {
      number: "654321",
      user_id: "user-123",
      purchase_date: "2023-10-26",
      fulfillment_date: "2023-10-28",
    },
  ]);
};
