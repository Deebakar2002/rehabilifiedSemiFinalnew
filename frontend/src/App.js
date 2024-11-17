import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './pages/Signup';
import './App.css';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentRegister from './pages/student/StudentRegister';
import StudentLogin from './pages/student/StudentLogin';
import StudentDashboard from './pages/student/StudentDashboard';
import EventProfile from './pages/EventProfile';
// import EventList from './pages/admin/event/EventList';
import Pages from './pages/Pages';
import Events from './pages/Events';
import UserManagement from './pages/admin/UserManagement';
import UserDetailAdmin from './pages/admin/UserDetailAdmin';
import SuccessfulPayment from './pages/SuccessfulPayment';
import Contact from './pages/Contact';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar displayed on all pages */}
        <Navbar />
        <div className="app-content">
          {/* Define routes for each page */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/student/signup" element={<Signup />} />
            <Route path="/pages" element={<Pages />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/events" element={<Events />} /> {/* Corrected */}
            <Route path="/events/:id" element={<EventProfile />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/admin/user-management" element={<UserManagement />} /> {/* New route for UserManagement */}
            <Route path="/user-detail-admin/:id" element={<UserDetailAdmin />} />
            <Route path="/successfulPayment" element={<SuccessfulPayment />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
