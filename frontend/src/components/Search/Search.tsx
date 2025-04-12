import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { LiaIdCard } from "react-icons/lia";


import { Student } from '../../models/studentModel';

import { getAll } from '../../api/students';
import { generateIdCard } from '../../api/students';

import './Search.css';

const Search = () => {
  const showErrorToastMessage = () => {
    toast.error("An Error Occurred", {
      position: "top-right"
    });
  };

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAll();
        setStudents(data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
        showErrorToastMessage()
        setError('Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleGenerate = async (prn: string) => {
    await generateIdCard(prn)
  };

  return (
    <div className="search-page">
      <h1>Search Students</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && students.length > 0 && (
        <table className="search-table">
          <thead>
            <tr>
              <th>PR Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.prn}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => handleGenerate(student.prn)}>
                      <LiaIdCard size={"25px"} className='icon'/>
                      Generate ID Card
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && students.length === 0 && <p>No students found!</p>}
      <ToastContainer />
    </div>
  );
};

export default Search;
