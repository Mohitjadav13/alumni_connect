import Event from '../models/Event.js';

// Create event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      venue,
      createdBy: req.user._id
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New helper function to clean up expired events
const cleanupExpiredEvents = async () => {
  const currentDate = new Date();
  try {
    await Event.deleteMany({
      date: { $lt: currentDate }
    });
  } catch (error) {
    console.error('Error cleaning up expired events:', error);
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    // Clean up expired events first
    await cleanupExpiredEvents();

    const currentDate = new Date();
    
    // Get events and populate creator info
    let events = await Event.find()
      .populate('createdBy', 'name email profile.basicInfo role')
      .populate('interestedUsers', 'name email profile.basicInfo profile.academic')
      .sort({ date: 1 });

    // Filter out events where:
    // 1. Faculty has been removed (createdBy is null)
    // 2. Event date is in the past
    events = events.filter(event => {
      const eventDate = new Date(event.date);
      return event.createdBy && eventDate >= currentDate;
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show interest in event
export const showInterest = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const alreadyInterested = event.interestedUsers.includes(req.user._id);
    if (alreadyInterested) {
      event.interestedUsers = event.interestedUsers.filter(
        id => id.toString() !== req.user._id.toString()
      );
    } else {
      event.interestedUsers.push(req.user._id);
    }

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is authorized to update
    if (event.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
