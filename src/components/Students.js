import React, { useEffect, useState } from 'react';
import './Content.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const getStudentDetails = () => {
    fetch('https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  useEffect(() => {
    getStudentDetails();
  });
  return (
    <div className="container-home">
      <ToastContainer />
      <h1 className="main-heading1">STUDENT HOMEPAGE</h1>
      <div className="top-buttons">
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/students/find');
          }}
        >
          <span>FIND STUDENT</span>
        </button>
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/students/add');
          }}
        >
          <span>ADD STUDENT</span>
        </button>
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/students/update');
          }}
        >
          <span>UPDATE STUDENT</span>
        </button>
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/students/delete');
          }}
        >
          <span>DELETE STUDENT</span>
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {students.map((studentDetail, index) => (
            <tr key={index}>
              <td>{studentDetail.id}</td>
              <td>{studentDetail.name}</td>
              <td>{studentDetail.email_id}</td>
              <td>{studentDetail.mobile_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
