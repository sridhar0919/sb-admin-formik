import React, { useState } from 'react';
import './Content.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

export default function Addstudent() {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (values.email.length < 4) {
      errors.email = 'Must be 5 characters or more';
    }

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.mobile_number) {
      errors.mobile_number = 'Required';
    } else if (values.mobile_number.length < 10) {
      errors.mobile_number = 'Must contain only 10 numbers';
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile_number: '',
    },
    validate,
    onSubmit: (values) => {
      axios
        .post('https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users', {
          name: values.name,
          email_id: values.email,
          mobile_number: values.mobile_number,
        })
        .then((res) => toast.success('User added successfully'))
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container-home">
      <ToastContainer />
      <h1 className="main-heading1">ADD TEACHER</h1>
      <div className="add-form">
        <form onSubmit={formik.handleSubmit}>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              value={formik.values.name}
              id="name"
              name="name"
              placeholder="Name *"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div className="mb-2" style={{ color: 'red' }}>
              {formik.errors.name}
            </div>
          ) : null}

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              value={formik.values.email}
              id="email"
              name="email"
              placeholder="Email *"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="mb-2" style={{ color: 'red' }}>
              {formik.errors.email}
            </div>
          ) : null}
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
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.mobile_number && formik.errors.mobile_number ? (
            <div className="mb-2" style={{ color: 'red' }}>
              {formik.errors.mobile_number}
            </div>
          ) : null}
          <button type="submit" class="btn btn-primary">
            Add
          </button>
          <div>
            <button
              type="submit"
              class="btn btn-primary mt-5"
              onClick={(e) => {
                navigate('/teachers');
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
