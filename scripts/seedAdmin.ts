import mongoose from "mongoose";
import config from "../src/config";
import { User } from "../src/models/User.model";
import { UserRole, UserStatus } from "../src/types/Auth.types";
import { generateHashPassword } from "../src/utils/hashPassword";
const seedAdmin = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(config.database_url);
    console.log("✅ Connected to MongoDB");

    // 2️⃣ Check if an admin already exists
    const existingAdmin = await User.findOne({ role: UserRole.ADMIN });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // 3️⃣ Hash password
    const hashedPassword = await generateHashPassword("ADMIN");

    // 4️⃣ Create the admin user
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      invitedAt: new Date(),
    });

    console.log("✅ Admin user created successfully:", admin.email);
    await mongoose.connection.close();
    process.exit(1);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
