import React, { useState } from 'react';
import './Content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export default function Findstudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.idNo) {
      errors.idNo = 'Required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      idNo: '',
    },
    validate,
    onSubmit: (values) => {
      axios
        .get(
          `https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users/${values.idNo}`
        )
        .then((res) => {
          setId(res.data.id);
          setName(res.data.name);
          setEmail(res.data.email_id);
          setMobileNumber(res.data.mobile_number);
        })
        .catch((err) => toast.error('User not found. Enter valid id'));
    },
  });

  return (
    <div>
      <div className="container-home">
        <ToastContainer />
        <h1 className="main-heading1">FIND STUDENT</h1>
        <form class="form-inline mb-3 ml-5" onSubmit={formik.handleSubmit}>
          <div class="form-group mx-sm-3 mb-2">
            <input
              type="text"
              class="form-control"
              value={formik.values.idNo}
              id="idNo"
              name="idNo"
              placeholder="Enter ID"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.idNo && formik.errors.idNo ? (
              <span className="mb-2 ml-2" style={{ color: 'red' }}>
                {formik.errors.idNo}
              </span>
            ) : null}
          </div>
          <button class="btn btn-primary mb-2">Search</button>
        </form>
        <div className="mt-5 ml-3">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            type="submit"
            class="btn btn-primary mt-5"
            onClick={(e) => {
              navigate('/');
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
