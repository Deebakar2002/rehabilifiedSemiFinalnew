import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './StudentRegister.css';
import Spinner from '../../components/Spinner';

function StudentRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await api.post('/student/register', {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      setSuccess(true);
      // Redirect to the student dashboard after successful registration
      navigate('/student/dashboard'); // Adjust the path as needed
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="student-register__container">
      <div className="student-register__form-container">
        <h2>Register for Rehabilified</h2>
        {error && <p className="student-register__error-message">{error}</p>}
        {success && <p className="student-register__success-message">Registration successful!</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="student-register__input-group">
                <label>Full Name</label>
                <Field type="text" name="fullName" />
                <ErrorMessage name="fullName" component="div" className="student-register__error-message" />
              </div>

              <div className="student-register__input-group">
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="student-register__error-message" />
              </div>

              <div className="student-register__input-group">
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="student-register__error-message" />
              </div>

              <div className="student-register__input-group">
                <label>Confirm Password</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="student-register__error-message" />
              </div>

              <button type="submit" className="student-register__button" disabled={isSubmitting || loading}>
                {loading ? <Spinner /> : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default StudentRegister;
