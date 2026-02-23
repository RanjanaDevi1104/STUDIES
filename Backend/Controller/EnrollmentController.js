import EntrollmentModel from "../Model/EntrollmentModel.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// CREATE ENROLLMENT
export const createEnrollment = async (req, res) => {
  try {
    const { course } = req.body;

    if (!course) {
      return res.status(400).json({ message: "Course is required" });
    }

    // Create enrollment document
    const newEnrollment = new EntrollmentModel({
      userid: req.user._id,
      Name: req.user.name,
      Email: req.user.email,
      course
    });

    await newEnrollment.save();

    // --- Send email using Resend ---
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",   // change after domain verification
        to: process.env.EMAIL_USER,        // admin email OR user email
        subject: "Enrollment Confirmation",
        html: `
          <h2>Enrollment Confirmation</h2>
          <p>Hello <strong>${req.user.name}</strong>,</p>
          <p>You have successfully enrolled in the course: <strong>${course}</strong>.</p>
          <p>Thank you for enrolling!</p>
        `
      });

      console.log("Email sent successfully");
    } catch (emailError) {
      console.error("Email send error:", emailError);
    }

    // Respond to frontend
    res.status(201).json({
      success: true,
      message: "Enrollment created successfully and email sent",
      data: newEnrollment
    });

  } catch (error) {
    console.error("createEnrollment error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating enrollment",
      error: error.message
    });
  }
};

// GET ENROLLMENTS FOR LOGGED-IN USER
export const getEnrollments = async (req, res) => {
  try {
    const data = await EntrollmentModel.find({ userid: req.user._id });
    res.status(200).json({ count: data.length, data });
  } catch (error) {
    console.error("getEnrollments error:", error);
    res.status(500).json({
      message: "Error fetching enrollments",
      error: error.message
    });
  }
};

// GET ALL ENROLLMENTS (Admin)
export const getAllEnrollments = async (req, res) => {
  try {
    const data = await EntrollmentModel.find();
    res.status(200).json({ count: data.length, data });
  } catch (error) {
    console.error("getAllEnrollments error:", error);
    res.status(500).json({
      message: "Error fetching all enrollments",
      error: error.message
    });
  }
};