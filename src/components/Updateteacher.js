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
      email: '',
      mobile_number: '',
      idNo: '',
    },
    validate,
    onSubmit: (values) => {
      axios
        .put(`https://616f9a8a715a630017b39d25.mockapi.io/api/v1/users/${id}`, {
          name: values.name,
          mobile_number: values.mobile_number,
          email_id: values.email,
        })
        .then((res) => toast.success('User updated successfully'))
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
          formik.values.email = res.data.email_id;
          formik.values.mobile_number = res.data.mobile_number;
        })
        .catch((err) => toast.error('User not found. Enter valid id'));
    },
  });

  return (
    <div className="container-home">
      <ToastContainer />
      <h1 className="main-heading1">UPDATE TEACHER</h1>
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
              name="email"
              value={formik.values.email}
              id="email"
              placeholder="Email *"
              onChange={formik.handleChange}
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
            />
          </div>
          {formik.touched.mobile_number && formik.errors.mobile_number ? (
            <div className="mb-2" style={{ color: 'red' }}>
              {formik.errors.mobile_number}
            </div>
          ) : null}
          <button type="submit" class="btn btn-primary">
            UPDATE
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
