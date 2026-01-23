import mongoose from "mongoose";
import config from "../config";
import { generateHashPassword } from "../utils/hashPassword";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.database_url);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    const collections = ["users", "projects", "invites"];
    for (const name of collections) {
      await mongoose.connection.collection(name).deleteMany({});
    }
    console.log("🗑️  Cleared existing data");

    // Create users
    const users = [
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: await generateHashPassword("admin123"),
        role: "ADMIN",
        status: "ACTIVE",
        createdAt: new Date(),
      },
      {
        name: "Manager User",
        email: "manager@gmail.com",
        password: await generateHashPassword("manager123"),
        role: "MANAGER",
        status: "ACTIVE",
        createdAt: new Date(),
      },
      {
        name: "Staff User",
        email: "staff@gmail.com",
        password: await generateHashPassword("staff123"),
        role: "STAFF",
        status: "ACTIVE",
        createdAt: new Date(),
      },
    ];

    const insertedUsers = await mongoose.connection
      .collection("users")
      .insertMany(users);
    const userIds = Object.values(insertedUsers.insertedIds);
    console.log(`👤 Created users: ${userIds.length}`);

    // Create projects
    const projects = [
      {
        name: "Website Redesign",
        description: "Complete redesign of company website",
        status: "ACTIVE",
        isDeleted: false,
        createdBy: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mobile App Development",
        description: "New mobile application for iOS and Android",
        status: "ACTIVE",
        isDeleted: false,
        createdBy: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "API Integration",
        description: "Integration with third-party APIs",
        status: "ARCHIVED",
        isDeleted: false,
        createdBy: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await mongoose.connection.collection("projects").insertMany(projects);
    console.log(`📁 Created projects: ${projects.length}`);

    // Output test credentials
    console.log("\n🎉 Seed data created successfully!");

    console.log("\nTest Accounts:");
    console.log("Admin - Email: admin@admin.com, Password: admin123");
    console.log("Manager - Email: manager@admin.com, Password: manager123");
    console.log("Staff - Email: staff@admin.com, Password: staff123");

    // Close connection
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
