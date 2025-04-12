const Student = require("../models/Student");

// ✅ Add a Student (Handles Missing Photo Properly)
exports.addStudent = async (req, res) => {
  try {
    const { prn, name, department, university, email, phone, photo } = req.body;

    // Validate required fields
    if (!prn || !name || !department || !university || !email || !phone || !photo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if PRN or Email already exists
    const existingStudent = await Student.findOne({ $or: [{ prn }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ error: "Student with this PRN or Email already exists" });
    }
    // Create new student entry
    const newStudent = new Student({ prn, name, department, university, email, phone, photo });
    await newStudent.save();

    res.status(201).json({ message: "Student Added Successfully", student: newStudent });
  } catch (error) {
    console.error("Error in addStudent:", error);
    res.status(500).json({ error: "Failed to Add Student", details: error.message });
  }
};

// ✅ Fetch All Students (Sorted Alphabetically)
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 }); // Sort students by name
    res.json(students);
  } catch (error) {
    console.error("Error in getStudents:", error);
    res.status(500).json({ error: "Failed to Fetch Students", details: error.message });
  }
};

// ✅ Get a Student by PRN
exports.getStudentByPRN = async (req, res) => {
  try {
    const student = await Student.findOne({ prn: req.params.prn });
    if (!student) return res.status(404).json({ error: "Student Not Found" });
    res.json(student);
  } catch (error) {
    console.error("Error in getStudentByPRN:", error);
    res.status(500).json({ error: "Failed to Fetch Student", details: error.message });
  }
};

// ✅ Update a Student by PRN
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate({ prn: req.params.prn }, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ error: "Student Not Found" });
    res.json({ message: "Student Updated", updatedStudent });
  } catch (error) {
    console.error("Error in updateStudent:", error);
    res.status(500).json({ error: "Failed to Update Student", details: error.message });
  }
};

// ✅ Delete a Student by PRN
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ prn: req.params.prn });
    if (!deletedStudent) return res.status(404).json({ error: "Student Not Found" });
    res.json({ message: "Student Deleted" });
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    res.status(500).json({ error: "Failed to Delete Student", details: error.message });
  }
};
