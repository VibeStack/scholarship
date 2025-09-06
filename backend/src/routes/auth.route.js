import { Router } from "express";
import { Admin } from "../models/admin.model.js";

const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const admin = await Admin.findOne({ username, email });

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.json({ success: false, message: "Invalid password" });
    }

    return res.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default authRoutes;
