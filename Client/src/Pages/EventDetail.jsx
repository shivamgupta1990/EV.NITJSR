import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* 🔹 Fallback image */
const getFallbackImage = () =>
  "https://source.unsplash.com/800x400/?event";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEventAndBooking = async () => {
      try {
        // Fetch event details
        const eventRes = await fetch(
          `http://localhost:5000/api/events/${id}`
        );
        if (!eventRes.ok) throw new Error("Failed to fetch event");
        const eventData = await eventRes.json();
        setEvent(eventData);

        // Fetch user's bookings (if logged in)
        const token = localStorage.getItem("token");
        if (token) {
          const bookingRes = await fetch(
            "http://localhost:5000/api/bookings/my",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const bookingData = await bookingRes.json();

          const bookedEventIds = Array.isArray(bookingData)
            ? bookingData.map((b) =>
                typeof b.event === "string"
                  ? b.event
                  : b.event._id
              )
            : [];

          if (bookedEventIds.includes(id)) {
            setIsRegistered(true);
          }
        }
      } catch {
        setError("Unable to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndBooking();
  }, [id]);

  /* 🔥 MOCK PAYMENT HANDLER */
  const handleFakePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to register for this event");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ eventId: event._id }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Payment successful 🎉");
        setIsRegistered(true);
        setShowPayment(false);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch {
      alert("Server error. Try again later.");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading event...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Event Image */}
      <img
        src={
          event.image
            ? `http://localhost:5000${event.image}`
            : getFallbackImage()
        }
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      {/* Event Content */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-800">
          {event.title}
        </h2>

        <div className="mt-2 text-gray-600 space-y-1">
          <p>📍 {event.location}</p>
          <p>📅 {event.date}</p>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-2xl font-semibold text-indigo-600">
            ₹{event.price}
          </p>

          {isRegistered ? (
            <span className="bg-green-100 text-green-700 px-6 py-3 rounded-md font-semibold">
              Registered
            </span>
          ) : (
            <button
              onClick={() => setShowPayment(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Register
            </button>
          )}
        </div>
      </div>

      {/* 🔥 FAKE PAYMENT MODAL */}
      {!isRegistered && showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center">
              Secure Payment
            </h3>

            <p className="mb-2">
              Event: <b>{event.title}</b>
            </p>
            <p className="mb-4">
              Amount: <b>₹{event.price}</b>
            </p>

            <input
              type="text"
              placeholder="Card Number"
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Expiry Date"
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full border px-3 py-2 mb-4 rounded"
            />

            <button
              onClick={handleFakePayment}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Pay Now
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
