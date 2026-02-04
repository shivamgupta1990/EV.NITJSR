import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* 🔹 Fallback images based on first character */
const placeholderImages = {
  A: "https://source.unsplash.com/400x300/?concert",
  B: "https://source.unsplash.com/400x300/?music",
  C: "https://source.unsplash.com/400x300/?conference",
  D: "https://source.unsplash.com/400x300/?dance",
  E: "https://source.unsplash.com/400x300/?event",
  F: "https://source.unsplash.com/400x300/?festival",
};

const getFallbackImage = (title) => {
  if (!title) return "https://source.unsplash.com/400x300/?event";
  const firstChar = title[0].toUpperCase();
  return (
    placeholderImages[firstChar] ||
    "https://source.unsplash.com/400x300/?event"
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);

  useEffect(() => {
    // Fetch all events
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []));

    // Fetch user's registered events
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) =>
          setBookedEvents(
            Array.isArray(data)
              ? data.map((b) =>
                typeof b.event === "string" ? b.event : b.event._id
              )
              : []
          )
        );
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link
          to={`/events/${event._id}`}
          key={event._id}
          className="block bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          {/* Event Image */}
          <img
            src={
              event.image
                ? `http://localhost:5000${event.image}`
                : getFallbackImage(event.title)
            }
            alt={event.title}
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600">
              📍 {event.location}
            </p>
            <p className="font-semibold text-indigo-600 mt-1">
              ₹{event.price}
            </p>

            {bookedEvents.includes(event._id) ? (
              <span className="block mt-3 text-green-600 font-semibold">
                Registered
              </span>
            ) : (
              <span className="block mt-3 bg-indigo-600 text-white text-center py-2 rounded-md">
                Register
              </span>
            )}
          </div>
        </Link>
      ))}


      {events.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          No events available
        </p>
      )}
    </div>
  );
};

export default Events;
