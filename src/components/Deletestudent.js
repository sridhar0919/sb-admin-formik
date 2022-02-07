import React, { useState } from 'react';
import './Content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export default function Updatestudent() {
  const navigate = useNavigate();
  const [id, setId] = useState(null);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    return errors;
  };

  const validate1 = (values) => {
    const errors = {};
    if (!values.idNo) {
      errors.idNo = 'Required';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: '',

      mobile_number: '',
      idNo: '',
    },
    validate,
    onSubmit: (values) => {
      axios
        .delete(
          `https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users/${id}`
        )
        .then((res) => toast.success('User deleted'))
        .catch((err) => toast.error(err));
    },
  });

  const formik1 = useFormik({
    initialValues: {
      idNo: '',
    },
    validate1,
    onSubmit: (values) => {
      axios
        .get(
          `https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users/${values.idNo}`
        )
        .then((res) => {
          setId(values.idNo);
          formik.values.name = res.data.name;

          formik.values.mobile_number = res.data.mobile_number;
        })
        .catch((err) => toast.error('User not found. Enter valid id'));
    },
  });

  return (
    <div className="container-home">
      <ToastContainer />
      <h1 className="main-heading1">DELETE STUDENT</h1>
      <form class="form-inline mb-3 ml-5" onSubmit={formik1.handleSubmit}>
        <div class="form-group mx-sm-3 mb-2">
          <input
            type="text"
            class="form-control"
            value={formik1.values.idNo}
            id="idNo"
            name="idNo"
            placeholder="Enter ID"
            onChange={formik1.handleChange}
          />
          {formik1.touched.idNo && formik1.errors.idNo ? (
            <span className="mb-2 ml-2" style={{ color: 'red' }}>
              {formik1.errors.idNo}
            </span>
          ) : null}
        </div>
        <button class="btn btn-primary mb-2">Search</button>
      </form>
      <div className="add-form">
        <form onSubmit={formik.handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={formik.values.name}
              id="name"
              placeholder="Name *"
              onChange={formik.handleChange}
            />
          </div>

          <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input
              type="tel"
              class="form-control"
              name="mobile_number"
              value={formik.values.mobile_number}
              id="mobile_number"
              placeholder="Mobile No *"
              onChange={formik.handleChange}
            />
          </div>

          <button class="btn btn-primary">DELETE</button>
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
        </form>
      </div>
    </div>
  );
}
