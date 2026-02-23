import express from "express";
import { createEnrollment, getAllEnrollments, getEnrollments } from "../Controller/EnrollmentController.js";
import { verifyUser } from "../Middleware/EntrollmentMiddleware.js";

const router = express.Router();

// Create enrollment (requires login)
router.post("/create", verifyUser, createEnrollment);

// Get enrollments of logged-in user
router.get("/get/:id", verifyUser, getEnrollments);

// Get all enrollments (admin)
router.get("/get", getAllEnrollments);

export default router;
