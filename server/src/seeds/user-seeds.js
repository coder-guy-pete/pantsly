import { User } from "../models/User.js";

export const seedUsers = async () => {
  await User.bulkCreate(
    [
      { username: "JollyGuru", password: "password" },
      { username: "SunnyScribe", password: "password" },
      { username: "RadiantComet", password: "password" },
    ],
    { individualHooks: true } // Ensures hooks (e.g., password hashing) are applied
  );
};
