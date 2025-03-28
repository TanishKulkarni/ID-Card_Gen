const axios = require("axios");
const PDFDocument = require("pdfkit");
const fs = require("fs");

async function fetchImage(src) {
  const image = await axios.get(src, {
    responseType: "arraybuffer",
  });
  return image.data;
}

const generateIDCard = async (student) => {
  const doc = new PDFDocument({
    size: [350, 200], // Custom size for ID card
    margins: { top: 10, bottom: 10, left: 10, right: 10 },
  });

  // Output file
  doc.pipe(fs.createWriteStream(`id-cards/${student.prn}.pdf`));

  // Add border
  doc.rect(5, 5, 340, 190).lineWidth(2).stroke("#0000FF");

  // Add background color
  doc.rect(6, 6, 338, 188).fillAndStroke("#F0F8FF", "#0000FF");

  // Add header
  doc.fontSize(18).fillColor("#000080").text("Student ID Card", 0, 15, {
    align: "center",
  });

  // Fetch and add student photo
  const photo = await fetchImage(student.photo);
  doc.image(photo, 20, 50, { width: 80, height: 80 });

  // Add student details
  doc.fontSize(12).fillColor("#000000");
  doc.text(`PRN: ${student.prn}`, 120, 50);
  doc.text(`Name: ${student.name}`, 120, 70);
  doc.text(`Department: ${student.department}`, 120, 90);
  doc.text(`Email: ${student.email}`, 120, 110);
  doc.text(`Phone: ${student.phone}`, 120, 130);

 

  doc.end();
};

module.exports = generateIDCard;