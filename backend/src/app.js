import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import studentRoutes from "./routes/student.route.js";

const app = express();

// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Cookies
app.use(cookieParser());

// Static files
app.use(express.static("public"));

// ✅ CORS - should come before routes
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH","DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
    ],
    credentials: true, // Allow cookies
  })
);

// Routes
app.use("/api", authRoutes);
app.use("/api", studentRoutes);

export { app };
