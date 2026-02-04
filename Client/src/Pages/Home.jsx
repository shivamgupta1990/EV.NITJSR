import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Professional static color palette
const colors = {
  primary: "#6366F1",      // Indigo
  primaryDark: "#4F46E5",  // Darker Indigo
  secondary: "#F8FAFC",    // Light background
  dark: "#1E293B",         // Dark text
  light: "#F1F5F9",        // Light background
  border: "#E2E8F0",       // Border color
  text: "#64748B",         // Text color
  textLight: "#94A3B8",    // Lighter text
  success: "#10B981",      // Green
  white: "#FFFFFF",
  cardBg: "#FFFFFF"
};

/* 🔹 Fallback images based on first character */
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

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`
          ${import.meta.env.VITE_BACKEND_URL}/api/events`);

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        const eventsArray = Array.isArray(data) ? data : [];
        setEvents(eventsArray);
        
        // Get first 3 events as featured
        setFeaturedEvents(eventsArray.slice(0, 3));
      } catch {
        setError("Unable to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ backgroundColor: colors.secondary }}>
      
      {/* Hero Section - Static solid color */}
      <section 
        className="py-20 text-center px-4"
        style={{ backgroundColor: colors.dark }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
               style={{ backgroundColor: colors.primary }}>
            <Calendar size={36} color={colors.white} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{ color: colors.white }}>
            Premium Events, <span style={{ color: colors.primary }}>Unforgettable</span> Experiences
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto"
             style={{ color: colors.textLight }}>
            Discover exclusive concerts, professional conferences, and curated meetups. 
            Book your next memorable experience with confidence.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-all duration-300"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.white
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            Explore All Events
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4"
               style={{ backgroundColor: colors.primary }}>
            <Calendar size={24} color={colors.white} />
          </div>
          <h2 className="text-3xl font-bold mb-3"
              style={{ color: colors.dark }}>
            Featured Events
          </h2>
          <p className="text-lg max-w-2xl mx-auto"
             style={{ color: colors.text }}>
            Handpicked experiences for our discerning community
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 rounded-full border-t-transparent animate-spin"
                 style={{ borderColor: colors.primary, borderTopColor: 'transparent' }}></div>
            <p className="mt-4" style={{ color: colors.text }}>
              Loading premium events...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                 style={{ backgroundColor: `${colors.error}10` }}>
              <div className="w-8 h-8" style={{ color: colors.error }}>⚠️</div>
            </div>
            <p className="text-lg font-medium mb-2"
               style={{ color: colors.dark }}>
              Unable to load events
            </p>
            <p style={{ color: colors.text }}>
              Please try again later
            </p>
          </div>
        )}

        {/* Featured Events Grid */}
        {featuredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredEvents.map((event) => (
              <div 
                key={event._id}
                className="overflow-hidden rounded-xl transition-all duration-300 hover:translate-y-[-4px]"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={
                      event.image
                        ? `${API_BASE_URL}${event.image}`
                        : getFallbackImage(event.title)
                    }
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
                       style={{ 
                         backgroundColor: colors.primary,
                         color: colors.white
                       }}>
                    ₹{event.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold"
                        style={{ color: colors.dark }}>
                      {event.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <MapPin size={16} style={{ color: colors.text, marginRight: 8 }} />
                      <span style={{ color: colors.text }}>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} style={{ color: colors.text, marginRight: 8 }} />
                      <span style={{ color: colors.text }}>{event.date}</span>
                    </div>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="inline-flex items-center justify-center w-full py-2.5 rounded-lg font-medium transition-all duration-300"
                    style={{ 
                      backgroundColor: colors.light,
                      color: colors.primary,
                      border: `1px solid ${colors.border}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.light;
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Events Section */}
        <div className="pt-12 border-t"
             style={{ borderColor: colors.border }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold"
                  style={{ color: colors.dark }}>
                All Upcoming Events
              </h3>
              <p style={{ color: colors.text }} className="mt-1">
                Browse our complete calendar of events
              </p>
            </div>
            <Link
              to="/events"
              className="px-5 py-2.5 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              View All
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link
                  to={`/events/${event._id}`}
                  key={event._id}
                  className="block transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}
                >
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={
                          event.image
                            ? `${API_BASE_URL}${event.image}`
                            : getFallbackImage(event.title)
                        }
                        alt={event.title}
                        className="w-full h-full object-cover"
                        style={{ minHeight: '120px' }}
                      />
                    </div>
                    
                    <div className="w-2/3 p-4">
                      <h4 className="font-semibold mb-2 line-clamp-1"
                          style={{ color: colors.dark }}>
                        {event.title}
                      </h4>
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-sm">
                          <MapPin size={14} style={{ color: colors.text, marginRight: 6 }} />
                          <span style={{ color: colors.text }} className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar size={14} style={{ color: colors.text, marginRight: 6 }} />
                          <span style={{ color: colors.text }}>{event.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold" style={{ color: colors.primary }}>
                          ₹{event.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                   style={{ backgroundColor: colors.light }}>
                <Calendar size={24} style={{ color: colors.text }} />
              </div>
              <p className="text-lg font-medium mb-2"
                 style={{ color: colors.dark }}>
                No upcoming events scheduled
              </p>
              <p style={{ color: colors.text }}>
                Check back soon for new events
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center"
               style={{ backgroundColor: colors.white }}>
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
               style={{ backgroundColor: colors.primary }}>
            <Calendar size={28} color={colors.white} />
          </div>
          <h2 className="text-3xl font-bold mb-4"
              style={{ color: colors.dark }}>
            Ready to Experience Something Extraordinary?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto"
             style={{ color: colors.text }}>
            Join thousands of satisfied attendees who've made memories with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="px-8 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              Browse Events
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 rounded-lg font-medium transition-all duration-300"
              style={{ 
                backgroundColor: colors.white,
                color: colors.primary,
                border: `2px solid ${colors.primary}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.white;
                e.currentTarget.style.color = colors.primary;
              }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;