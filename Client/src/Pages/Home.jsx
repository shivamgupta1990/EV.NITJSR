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

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch {
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Discover & Book Amazing Events
        </h1>
        <p className="mt-4 text-lg">
          Concerts, conferences, meetups & more
        </p>
        <Link
          to="/events"
          className="inline-block mt-6 bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
        >
          Explore Events
        </Link>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upcoming Events
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading events...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              className="block bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
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

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  📍 {event.location}
                </p>
                <p className="text-sm text-gray-500">
                  📅 {event.date}
                </p>
                <p className="mt-2 font-semibold text-indigo-600">
                  ₹{event.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {!loading && events.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No upcoming events
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
