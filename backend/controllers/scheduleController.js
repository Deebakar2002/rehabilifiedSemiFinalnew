const StudentProfile = require('../models/StudentProfile'); // Import the StudentProfile model

// Controller function to get schedule details by student ID
exports.getScheduleDetails = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Fetch the student profile based on studentId
    const meetingData = await StudentProfile.findOne({ studentId })
      .select('meetingLink meetingDate meetingTime') // Select only relevant fields
      .populate('studentId', 'email fullName'); // Optionally populate related student details

    if (!meetingData) {
      return res.status(404).json({ message: 'Meeting not found for the provided student ID' });
    }

    // Return only necessary meeting data
    res.status(200).json({
      link: meetingData.meetingLink,
      date: meetingData.meetingDate,
      time: meetingData.meetingTime,
    });
  } catch (error) {
    console.error('Error fetching meeting details:', error);
    res.status(500).json({ message: 'Failed to fetch meeting details', error: error.message });
  }
};
