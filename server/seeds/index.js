import { seedUsers } from "./user-seeds.js";
import { seedTickets } from "./ticket-seeds.js";
import { sequelize } from "../models/index.js";

const seedAll = async () => {
  try {
    // Sync database, dropping and recreating tables
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    // Seed users
    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    // Seed tickets
    await seedTickets();
    console.log("\n----- TICKETS SEEDED -----\n");

    // Exit process successfully
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);

    // Exit process with failure code
    process.exit(1);
  }
};

// Execute seeding function
seedAll();
