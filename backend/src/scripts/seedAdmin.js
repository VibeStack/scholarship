import dotenv from "dotenv";
import mongoose from "mongoose";
import { Admin } from "../models/admin.model.js";
import connectDB from "../db/index.js";

dotenv.config({ path: "./.env" });

const seedAdmin = async () => {
  try {
    await connectDB(); // uses your db/index.js logic

    const adminExists = await Admin.findOne({ email: "dswgndec@gmail.com" });

    if (adminExists) {
      console.log("⚠️ Admin already exists!");
    } else {
      const admin = new Admin({
        username: "parminder",
        email: "dswgndec@gmail.com",
        password: "12345678",
      });

      await admin.save();
      console.log("✅ Admin inserted successfully");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedAdmin();
