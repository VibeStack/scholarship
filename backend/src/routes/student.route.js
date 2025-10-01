import express from "express";
import { Student } from "../models/student.model.js";

const studentRoutes = express.Router();

// POST → Add new student
studentRoutes.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "✅ Student created successfully", student });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(400).json({ message: "❌ Failed to create student", error: error.message });
  }
});

studentRoutes.get("/students", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "❌ Failed to fetch students", error: error.message });
  }
});

// PATCH → Update student by applicantId (from request body)
studentRoutes.patch("/students", async (req, res) => {
  const { applicantId, ...updateData } = req.body;

  if (!applicantId) {
    return res.status(400).json({ message: "❌ applicantId is required to update student" });
  }

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { applicantId: applicantId.trim() },
      { $set: updateData },
      { new: true, runValidators: true } // return updated document
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "❌ Student not found" });
    }

    res.status(200).json({ message: "✅ Student updated successfully", student: updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(400).json({ message: "❌ Failed to update student", error: error.message });
  }
});


export default studentRoutes;
