import Orders from "../models/Orders.js";

export const seedOrders = async () => {
  await Orders.bulkCreate([
    {
      number: "123456",
      user_id: "user-456",
      purchase_date: "2023-10-27",
      fulfillment_date: "2023-10-29", // Could be null if not fulfilled yet
      purchase_amount: 123.45,
      products: [
        {
          id: "product-789",
          name: "Product X",
          image: "https://placehold.co/100x100",
          quantity: 2,
        },
        {
          id: "product-987",
          name: "Product Y",
          image: "https://placehold.co/100x100",
          quantity: 1,
        },
      ],
    },
    {
      number: "654321",
      user_id: "user-123",
      purchase_date: "2023-10-26",
      fulfillment_date: "2023-10-28",
      purchase_amount: 54.32,
      products: [
        {
          id: "product-654",
          name: "Product Z",
          image: "https://placehold.co/100x100",
          quantity: 3,
        },
      ],
    },
  ]);
};
