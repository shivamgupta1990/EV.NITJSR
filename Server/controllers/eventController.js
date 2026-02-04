import Event from "../Models/event.js";

// ADMIN → Add Event
// export const createEvent = async (req, res) => {
//   try {
//     const event = await Event.create({
//       ...req.body,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      price: req.body.price,
      availableSeats: req.body.availableSeats,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER → View Events
export const getEvents = async (req, res) => {
  const events = await Event.find();
//   console.log("events in server->",events);
  return res.json(events);
};
