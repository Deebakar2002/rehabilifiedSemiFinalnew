import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import './StudentLogin.css';
import Spinner from '../../components/Spinner';

function StudentLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setError('');
    try {
      // Call your login API
      const response = await api.post('/student/login', values);

      // Log the response to check if you get the token
      console.log(response);

      // Assuming the response contains a token on successful login
      localStorage.setItem('studentToken', response.data.token);

      // Redirect to the student dashboard after successful login
      navigate('/student/dashboard');
    } catch (error) {
      // Handle specific error responses
      console.error(error); // Log the error for debugging
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="student-login__container">
      <div className="student-login__form-container">
        <h2>Log in to Rehabilified</h2>
        {error && <p className="student-login__error-message">{error}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="student-login__input-group">
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="student-login__error-message" />
              </div>

              <div className="student-login__input-group">
                <label>Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="student-login__error-message" />
              </div>

              <button type="submit" className="student-login__button" disabled={isSubmitting || loading}>
                {loading ? <Spinner /> : 'Login'}
              </button>
            </Form>
          )}
        </Formik>

        <div className="student-login__other-options">
          <p>Other login options</p>
          <div className="student-login__social-buttons">
            <button className="student-login__social-button student-login__google">Google</button>
            <button className="student-login__social-button student-login__facebook">Facebook</button>
            <button className="student-login__social-button student-login__apple">Apple</button>
          </div>
        </div>

        <div className="student-login__footer-links">
          <p>Don't have an account? <a href="/student/register">Register Now!</a></p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
