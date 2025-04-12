import React, { useState } from 'react';
import { addStudent } from '../../api/students';
import { ToastContainer, toast } from "react-toastify";

import './Create.css';

const Create = () => {
  const showSuccessToastMessage = () => {
    toast.success("Student Added Successfully", {
      position: "top-right"
    });
  };

  const showErrorToastMessage = () => {
    toast.error("An Error Occurred", {
      position: "top-right"
    });
  };

  const [formData, setFormData] = useState<{
    prn: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
    department: string;
    university: string;
  }>({
    prn: '',
    name: '',
    email: '',
    phone: '',
    photo: '',
    department: '',
    university: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    try {
      await addStudent(formData)
      showSuccessToastMessage();
    } catch (error) {
      showErrorToastMessage();
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="create-page">
      <h1>Add Student</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="prn">PR Number</label>
          <input
            type="text"
            id="prn"
            name="prn"
            value={formData.prn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo Link</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="university">University</label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Create;