const StudentAuth = require('../models/StudentAuth');
const StudentProfile = require('../models/StudentProfile');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course'); // Import the Course model
const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');

// Register a new student
const registerStudent = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const existingStudent = await StudentAuth.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const student = await StudentAuth.create({ email, password });
    const studentProfile = new StudentProfile({
      studentId: student._id,
      email,
      fullName,
    });
    await studentProfile.save();

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ token, studentId: student._id, message: 'Student registered successfully' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a student
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await StudentAuth.findOne({ email });
    if (!student || !(await student.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(200).json({ token, studentId: student._id, message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get student dashboard
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.student._id; // Ensure req.student is defined

    const profile = await StudentProfile.findOne({ studentId }).populate('courses');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update student profile
// Update student profile
const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { fullName, profession, address, phone } = req.body;
  let profilePhotoUrl;

  try {
    // Handle uploaded file for profile picture
    if (req.file) {
      profilePhotoUrl = `/uploads/${req.file.filename}`; // Construct the URL
    }

    const updatedProfile = await StudentProfile.findByIdAndUpdate(
      id,
      {
        fullName,
        profession,
        address,
        phone,
        profilePicture: profilePhotoUrl || undefined,
      },
      { new: true, runValidators: true } // Return the updated document with validators
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch courses
// Controller to get courses for a student
const getCourses = async (req, res) => {
  try {
    const studentId = req.student._id; // Assuming req.user contains authenticated user info
    console.log("Student wala student profile student id: ", studentId)
    // Find registrations by student ID and populate event details
    const registrations = await EventRegistration.find({ student: studentId })
      .populate('event', 'title startDate endDate profileImage') // Populate only necessary fields from Event model
      .select('selectedDays paymentStatus'); // Select only necessary fields from EventRegistration

    // Format response data
    const courses = registrations.map((registration) => ({
      _id: registration._id,
      event: registration.event,
      selectedDays: registration.selectedDays,
      paymentStatus: registration.paymentStatus,
    }));

    res.json({ courses });
  } catch (error) {
    console.error('Error fetching registered courses:', error);
    res.status(500).json({ message: 'Failed to load courses. Please try again later.' });
  }
};

// Fetch downloadable resources
const getResources = async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ studentId: req.student._id });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ notes: profile.notes, videos: profile.videos });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all students for admin
const getAllStudents = async (req, res) => {
  console.log('Received request for all students');
  try {
    const students = await StudentProfile.find().lean();
    console.log('Fetched students detials');
    res.json(students);
  } catch (error) {
    console.error('Error in getAllStudents:', error);
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

const addFeedback = async (req, res) => {
  const { studentId, feedback } = req.body;

  if (!studentId || !feedback) {
    return res.status(400).json({ message: 'Student ID and feedback are required.' });
  }

  try {
    const studentProfile = await StudentProfile.findOne({ studentId });

    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }

    // Add feedback to the student's profile
    studentProfile.feedbacks.push({ feedback });
    await studentProfile.save();

    res.status(200).json({
      message: 'Feedback added successfully.',
      feedbacks: studentProfile.feedbacks
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while adding feedback.', error });
  }
};


module.exports = {
  registerStudent,
  loginStudent,
  getStudentDashboard,
  updateProfile,
  getCourses,
  getResources,
  getAllStudents,
  addFeedback,
};
