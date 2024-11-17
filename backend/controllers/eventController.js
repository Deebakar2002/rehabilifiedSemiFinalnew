// controllers/eventController.js
const Event = require('../models/Event');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    // Don't add the full URL here, just return the relative path
    const eventsWithImagePaths = events.map(event => {
      const eventObj = event.toObject();
      if (eventObj.profileImage) {
        eventObj.profileImage = eventObj.profileImage; // Just keep the relative path
      }
      return eventObj;
    });
    res.status(200).json(eventsWithImagePaths);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve events" });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, subtitle, description, duration, maxDuration, startDate, endDate, actualPrice, discountedPrice } = req.body;
    const profileImage = req.file ? req.file.path.replace('\\', '/') : null;

    const newEvent = new Event({
      title,
      subtitle,
      description,
      duration,
      maxDuration,
      startDate,
      endDate,
      actualPrice,
      discountedPrice,
      profileImage
    });

    await newEvent.save();
    
    // Return the new event without modifying the image path
    const eventObj = newEvent.toObject();
    res.status(201).json(eventObj);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: "Event not found Deebakar." });
    }

    // Return the event without modifying the image path
    const eventObj = event.toObject();
    res.status(200).json(eventObj);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve event" });
  }
};  