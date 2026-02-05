import Event from "../Models/event.js";


export const createEvent = async (req, res) => {
  try {
    

    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      price: Number(req.body.price),
      availableSeats: Number(req.body.availableSeats || 0),
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("CREATE EVENT ERROR ❌:", error);
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
