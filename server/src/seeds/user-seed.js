import bcrypt from "bcrypt";
import User from "../models/user.js";

export const seedUsers = async () => {
  const saltRounds = 10;

  const usersToSeed = [
    {
      name: "John Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      phoneNumber: "555-123-4567",
      email: "johndoe@example.com",
      password: "password123",
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
      password: "securePass!",
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
      password: "pass1234",
    },
    {
      name: "Emily Davis",
      address1: "101 Maple Dr",
      address2: "",
      city: "Houston",
      state: "TX",
      phoneNumber: "555-234-5678",
      email: "emilyd@example.com",
      password: "12345secure",
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
      password: "floridaMan2023",
      isAdmin: true,
    },
  ];

  const hashedUsers = await Promise.all(
    usersToSeed.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return { ...user, password: hashedPassword };
    })
  );

  await User.bulkCreate(hashedUsers);
};
