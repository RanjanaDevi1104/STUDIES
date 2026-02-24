import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import PasswordRoute from "./Router/LoginRouter.js";
import coursesroute from "./Router/BcaRoute.js";
import router from "./Router/MailRouter.js";
import router2 from "./Router/EnrollmentRouter.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

// routes
server.use("/api/auth", PasswordRoute);
server.use("/api", coursesroute);
server.use("/api", router);
server.use("/api/enroll", router2);

const PORT = process.env.PORT || 5000;

// connect DB then start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

startServer();