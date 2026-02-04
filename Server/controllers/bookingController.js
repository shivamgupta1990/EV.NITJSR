import Booking from "../Models/Booking.js";
import Event from "../Models/event.js";

// Register for event (after payment)
export const registerEvent = async (req, res) => {
  const { eventId } = req.body;

  // Check already registered
  const alreadyBooked = await Booking.findOne({
    user: req.user._id,
    event: eventId,
  });

  if (alreadyBooked) {
    return res.status(400).json({ message: "Already registered" });
  }

  const event = await Event.findById(eventId);
  if (!event || event.availableSeats <= 0) {
    return res.status(400).json({ message: "Event full or not found" });
  }

  // Reduce seats
  event.availableSeats -= 1;
  await event.save();

  const booking = await Booking.create({
    user: req.user._id,
    event: eventId,
  });

  res.status(201).json(booking);
};


// GET my bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .select("event")
      .lean();

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};



export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Prevent double booking
    const existing = await Booking.findOne({
      user: userId,
      event: eventId,
    });

    if (existing) {
      return res.status(400).json({ message: "Already registered" });
    }

    const booking = await Booking.create({
      user: userId,
      event: eventId,
      paymentStatus: "paid",
    });

    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
};
