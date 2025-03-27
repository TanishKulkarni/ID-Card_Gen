const PDFDocument = require("pdfkit");
const fs = require("fs");

const generateIDCard = (student) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`id-cards/${student.prn}.pdf`));

  doc.fontSize(20).text("Student ID Card", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`PRN: ${student.prn}`);
  doc.text(`Name: ${student.name}`);
  doc.text(`Department: ${student.department}`);
  doc.text(`Email: ${student.email}`);
  doc.text(`Phone: ${student.phone}`);

  doc.end();
};

module.exports = generateIDCard;
