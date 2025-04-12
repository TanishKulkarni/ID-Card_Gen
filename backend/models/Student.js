const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    prn: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    university: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    photo: { type: String, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);