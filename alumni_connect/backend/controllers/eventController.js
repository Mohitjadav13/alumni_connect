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

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name');
    res.json(events);
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
