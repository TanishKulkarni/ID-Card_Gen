const express = require("express");
const { addStudent, getStudents, getStudentByPRN, updateStudent, deleteStudent, generateIDCard } = require("../controllers/studentController");

const router = express.Router();
router.post("/", addStudent);
router.get("/", getStudents);
router.get("/:prn", getStudentByPRN);
router.put("/:prn", updateStudent);
router.delete("/:prn", deleteStudent);
router.get("/:prn/id-card", generateIDCard);

module.exports = router;
