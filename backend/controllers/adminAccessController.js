
const StudentProfile = require('../models/StudentProfile');
const EventRegistration = require('../models/EventRegistration');
// const jwt = require('jsonwebtoken');
// const Course = require('../models/Course'); 

const getStudentById = async (req, res) => {
    const { id } = req.params;
  
    console.log("coming to it.");
    console.log("Admin student profile student id: ", id)
    try {
      const studentProfile = await StudentProfile.findById(id);
      
      if (!studentProfile) {
        return res.status(404).json({ message: 'Student profile not found' });
      }
      console.log("studentProfile for admin:", studentProfile);
      res.status(200).json(studentProfile);
    } catch (error) {
      console.error('Error fetching student details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// Get event registrations for a student
const getEventRegistrations = async (req, res) => {
  try {
    const { id } = req.params; // Get student ID from request params
     // Log ID
     console.log("Fetching registrations for student with ID:", id);
    const studentidfind = await StudentProfile.findById(id);
    console.log("Fetching registrations for student with ID:", studentidfind.id);
    const registrations = await EventRegistration.find({ student: studentidfind.studentId });
    res.json(registrations);
    console.log("Registerdated data: **8 : ", registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  // Send meeting link

// Controller to handle sending the meeting link and saving to the student's profile
const sendMeetingLink = async (req, res) => {
  const { userId, meetingLink, meetingDate, meetingTime } = req.body;

  try {
    // Update only the specified fields without affecting other fields
    const studentProfile = await StudentProfile.findByIdAndUpdate(
      userId,
      { meetingLink, meetingDate, meetingTime },
      { new: true, runValidators: true } // Ensures validators are run only on provided fields
    );

    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    console.log(userId,meetingLink,meetingTime,meetingDate);
    res.status(200).json({ message: 'Meeting link and details sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send meeting link' });
  }
};

const uploadNotesAndVideosUser = async (req,res) => {
  const { id } = req.body;
  try {
    const student = await StudentProfile.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (req.files['notes']) {
      const notesFile = req.files['notes'][0];
      student.notes.push({ title: notesFile.originalname, url: notesFile.path });
    }

    if (req.files['video']) {
      const videoFile = req.files['video'][0];
      student.videos.push({ title: videoFile.originalname, url: videoFile.path });
    }

    console.log('upload videos and notes: ', student);
    await student.save();
    res.json({ message: 'Files uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading files', error: error.message });
  }
}

  module.exports = {getStudentById, sendMeetingLink, getEventRegistrations, uploadNotesAndVideosUser};