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
      zip: 10001, // Added ZIP
      phoneNumber: 5551234567, // Converted to integer
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
      zip: 90001, // Added ZIP
      phoneNumber: 5559876543, // Converted to integer
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
      zip: 60601, // Added ZIP
      phoneNumber: 5554567890, // Converted to integer
      email: "michaelj@example.com",
      password: "pass1234",
    },
    {
      name: "Emily Davis",
      address1: "101 Maple Dr",
      address2: "",
      city: "Houston",
      state: "TX",
      zip: 77001, // Added ZIP
      phoneNumber: 5552345678, // Converted to integer
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
      zip: 33101, // Added ZIP
      phoneNumber: 5556781234, // Converted to integer
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
