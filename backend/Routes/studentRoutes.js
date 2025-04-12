const express = require("express");
const { 
  addStudent, 
  getStudents, 
  getStudentByPRN, 
  updateStudent, 
  deleteStudent 
} = require("../controllers/studentController");

const router = express.Router();
router.post("/", addStudent);
router.get("/", getStudents);
router.get("/:prn", getStudentByPRN);
router.put("/:prn", updateStudent);
router.delete("/:prn", deleteStudent);

module.exports = router;
