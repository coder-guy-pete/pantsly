import { seedUsers } from "./user-seed.js";
import { seedOrders } from "./orders-seed.js";
import { seedOrderItem } from "./orderItem-seed.js";
import { seedProductVariants } from "./productVariants-seed.js";
// import { seedTickets } from "./productVariants-seeds.js";
import sequelize from "../config/connection.js";

const seedAll = async () => {
  try {
    // Sync database, dropping and recreating tables
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    // Seed users
    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");

    // Seed Order Items
    await seedOrderItem();
    console.log("\n----- ORDER ITEMS SEEDED -----\n");

    //Seed Orders
    await seedOrders();
    console.log("\n----- ORDERS SEEDED -----\n");

    // Seed Product Variants
    await seedProductVariants();
    console.log("\n----- PRODUCT VARIANTS SEEDED -----\n");

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
