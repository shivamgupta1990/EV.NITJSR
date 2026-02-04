import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, DollarSign, CheckCircle, Ticket } from "lucide-react";

// Professional static color palette
const colors = {
  primary: "#6366F1",
  primaryDark: "#4F46E5",
  secondary: "#F8FAFC",
  dark: "#1E293B",
  light: "#F1F5F9",
  border: "#E2E8F0",
  text: "#64748B",
  textLight: "#94A3B8",
  success: "#10B981",
  error: "#EF4444",
  white: "#FFFFFF",
  cardBg: "#FFFFFF"
};

/* 🔹 Fallback images */
const placeholderImages = {
  A: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  B: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  C: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  D: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  E: "https://images.unsplash.com/photo-1492684223066-e9e5a0c1b1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  F: "https://images.unsplash.com/photo-1460723239493-7e0a9c5d74e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
};

const getFallbackImage = (title) => {
  if (!title) return "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
  const firstChar = title[0].toUpperCase();
  return placeholderImages[firstChar] || placeholderImages.A;
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all events
        const eventsRes = await fetch("http://localhost:5000/api/events");
        if (!eventsRes.ok) throw new Error("Failed to fetch events");
        const eventsData = await eventsRes.json();
        setEvents(Array.isArray(eventsData) ? eventsData : []);

        // Fetch user's registered events
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const bookingsRes = await fetch("http://localhost:5000/api/bookings/my", {
              headers: { Authorization: `Bearer ${token}` },
            });
            
            if (bookingsRes.ok) {
              const bookingsData = await bookingsRes.json();
              setBookedEvents(
                Array.isArray(bookingsData)
                  ? bookingsData.map((b) =>
                      typeof b.event === "string" ? b.event : b.event._id
                    )
                  : []
              );
            }
          } catch (bookingsError) {
            console.log("Could not fetch bookings", bookingsError);
          }
        }
      } catch (err) {
        setError("Unable to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"
               style={{ borderColor: colors.primary, borderTopColor: 'transparent' }}></div>
          <p className="mt-4" style={{ color: colors.text }}>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
               style={{ backgroundColor: `${colors.error}10` }}>
            <div className="w-8 h-8" style={{ color: colors.error }}>⚠️</div>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>Unable to Load Events</h3>
          <p style={{ color: colors.text }} className="mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.white
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.secondary }} className="min-h-screen">
      {/* Header Section */}
      <div className="py-12 px-4 text-center" style={{ backgroundColor: colors.dark }}>
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
               style={{ backgroundColor: colors.primary }}>
            <Ticket size={28} color={colors.white} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.white }}>
            Discover Our <span style={{ color: colors.primary }}>Events</span>
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: colors.textLight }}>
            Browse through our curated collection of upcoming events and reserve your spot
          </p>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-4 rounded-xl"
             style={{ backgroundColor: colors.white, border: `1px solid ${colors.border}` }}>
          <div>
            <p className="text-sm" style={{ color: colors.text }}>Total Events</p>
            <p className="text-2xl font-bold" style={{ color: colors.dark }}>{events.length}</p>
          </div>
          <div className="my-4 sm:my-0">
            <p className="text-sm" style={{ color: colors.text }}>Your Registrations</p>
            <p className="text-2xl font-bold" style={{ color: colors.primary }}>{bookedEvents.length}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: colors.text }}>Available</p>
            <p className="text-2xl font-bold" style={{ color: colors.success }}>{events.length - bookedEvents.length}</p>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                 style={{ backgroundColor: colors.light }}>
              <Calendar size={32} style={{ color: colors.text }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>No Events Available</h3>
            <p style={{ color: colors.text }}>Check back later for upcoming events</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const isBooked = bookedEvents.includes(event._id);
              
              return (
                <Link
                  to={`/events/${event._id}`}
                  key={event._id}
                  className="block transition-all duration-300 hover:translate-y-[-4px] group"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image ? `http://localhost:5000${event.image}` : getFallbackImage(event.title)}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isBooked && (
                      <div className="absolute top-3 left-3">
                        <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium"
                             style={{ 
                               backgroundColor: colors.success,
                               color: colors.white
                             }}>
                          <CheckCircle size={14} className="mr-1" />
                          Booked
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3">
                      <div className="px-3 py-1 rounded-full text-sm font-medium"
                           style={{ 
                             backgroundColor: colors.primary,
                             color: colors.white
                           }}>
                        ₹{event.price}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 line-clamp-1"
                        style={{ color: colors.dark }}>
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <MapPin size={16} style={{ color: colors.text, marginRight: 8, flexShrink: 0 }} />
                        <span style={{ color: colors.text }} className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar size={16} style={{ color: colors.text, marginRight: 8, flexShrink: 0 }} />
                        <span style={{ color: colors.text }}>{event.date}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t" style={{ borderColor: colors.border }}>
                      {isBooked ? (
                        <div className="flex items-center justify-center py-2 rounded-lg"
                             style={{ 
                               backgroundColor: `${colors.success}10`,
                               color: colors.success
                             }}>
                          <CheckCircle size={16} className="mr-2" />
                          View Details
                        </div>
                      ) : (
                        <div className="text-center py-2 rounded-lg font-medium transition-all duration-300"
                             style={{ 
                               backgroundColor: colors.primary,
                               color: colors.white
                             }}
                             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}>
                          Register Now
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State for No Events */}
        {events.length === 0 && !loading && !error && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                 style={{ backgroundColor: colors.light }}>
              <Calendar size={32} style={{ color: colors.text }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>No Events Available</h3>
            <p style={{ color: colors.text }} className="mb-6">Check back later for upcoming events</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;