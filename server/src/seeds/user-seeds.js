import User from "../models/User.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      {
        name: "John Doe",
        address1: "123 Main St",
        address2: "Apt 4B",
        city: "New York",
        state: "NY",
        phoneNumber: "555-123-4567",
        email: "johndoe@example.com",
        password: hashPassword("password123"), // Hashed password
        isAdmin: false,
      },
      {
        name: "Jane Smith",
        address1: "456 Elm St",
        address2: null,
        city: "Los Angeles",
        state: "CA",
        phoneNumber: "555-987-6543",
        email: "janesmith@example.com",
        password: hashPassword("securePass!"), // Hashed password
        isAdmin: true,
      },
      {
        name: "Michael Johnson",
        address1: "789 Oak Ave",
        address2: "Suite 100",
        city: "Chicago",
        state: "IL",
        phoneNumber: "555-456-7890",
        email: "michaelj@example.com",
        password: hashPassword("pass1234"), // Hashed password
        isAdmin: false,
      },
      {
        name: "Emily Davis",
        address1: "101 Maple Dr",
        address2: "",
        city: "Houston",
        state: "TX",
        phoneNumber: "555-234-5678",
        email: "emilyd@example.com",
        password: hashPassword("12345secure"), // Hashed password
        isAdmin: false,
      },
      {
        name: "David Wilson",
        address1: "222 Birch Rd",
        address2: null,
        city: "Miami",
        state: "FL",
        phoneNumber: "555-678-1234",
        email: "davidw@example.com",
        password: hashPassword("floridaMan2023"), // Hashed password
        isAdmin: true,
      },
    ],
    { individualHooks: true } // Ensures hooks (e.g., password hashing) are applied
  );
};
