import React, { useEffect, useState } from 'react';
import './Content.css';
import { useNavigate } from 'react-router-dom';

export default function Students() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  const getTeacherDetails = () => {
    fetch('https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users')
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  };

  useEffect(() => {
    getTeacherDetails();
  });
  return (
    <div className="container-home">
      <h1 className="main-heading1">TEACHER HOMEPAGE</h1>
      <div className="top-buttons">
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/teachers/find');
          }}
        >
          <span>FIND TEACHER</span>
        </button>
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/teachers/add');
          }}
        >
          <span>ADD TEACHER</span>
        </button>
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/teachers/update');
          }}
        >
          <span>UPDATE TEACHER</span>
        </button>
        <button
          className="button-design"
          onClick={(e) => {
            navigate('/teachers/delete');
          }}
        >
          <span>DELETE TEACHER</span>
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Teacher Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile Number</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacherDetail, index) => (
            <tr key={index}>
              <td>{teacherDetail.id}</td>
              <td>{teacherDetail.name}</td>
              <td>{teacherDetail.email_id}</td>
              <td>{teacherDetail.mobile_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
