const axios = require("axios");
const PDFDocument = require("pdfkit");
const fs = require("fs");

async function fetchImage(src) {
  const image = await axios
      .get(src, {
          responseType: 'arraybuffer'
      })
  return image.data;
}

const generateIDCard = async (student) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(`id-cards/${student.prn}.pdf`));

  doc.fontSize(20).text("Student ID Card", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`PRN: ${student.prn}`);
  doc.text(`Name: ${student.name}`);
  doc.text(`Department: ${student.department}`);
  doc.text(`Email: ${student.email}`);
  doc.text(`Phone: ${student.phone}`);
  const logo = await fetchImage(`${student.photo}`);
  doc.image(logo, 0, 200);

  doc.end();
};

module.exports = generateIDCard;
