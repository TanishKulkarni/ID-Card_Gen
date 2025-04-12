import axios from 'axios';
import { jsPDF } from 'jspdf';

import { Student } from '../models/studentModel';

export const addStudent = async (student: Student) => {
  const path = process.env.BASE_URL + '/students/';
  try {
    const response = await axios.post(path, student, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const getAll = async (): Promise<Student[]> => {
  const path = process.env.BASE_URL + '/students/';
  console.log(path)
  
  try {
    const response = await axios.get<Student[]>(path);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

export const generateIdCard = async (prn: string) => {
  const path = process.env.BASE_URL + `/students/${prn}`;

  try {
    // Fetch student data from the backend
    const response = await axios.get(path);
    const student = response.data;

    const photoResponse = await axios.get(student.photo, {
      responseType: 'arraybuffer',
    });
    const photoBlob = new Blob([photoResponse.data], { type: 'image/jpeg' });
    const photoURL = URL.createObjectURL(photoBlob);

    // Generate PDF using jsPDF
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [350, 200],
    });

    doc.setDrawColor(0, 0, 255);
    doc.setLineWidth(2);
    doc.rect(5, 5, 340, 190);

    doc.setFillColor(240, 248, 255);
    doc.rect(6, 6, 338, 188, 'F');

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 128);
    doc.text('Student ID Card', 175, 30, { align: 'center' });

    doc.addImage(photoURL, 'JPEG', 20, 50, 80, 80);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`PRN: ${student.prn}`, 120, 50);
    doc.text(`Name: ${student.name}`, 120, 70);
    doc.text(`Department: ${student.department}`, 120, 90);
    doc.text(`University: ${student.university}`, 120, 110);
    doc.text(`Email: ${student.email}`, 120, 130);
    doc.text(`Phone: ${student.phone}`, 120, 150);

    doc.save(`id-card-${prn}.pdf`);
  } catch (error) {
    console.error('Error generating ID card:', error);
    throw error;
  }
};