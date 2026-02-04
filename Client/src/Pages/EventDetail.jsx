import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, DollarSign, Users, ArrowLeft, CheckCircle, CreditCard, Shield } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
  warning: "#F59E0B",
  white: "#FFFFFF",
  cardBg: "#FFFFFF"
};

/* 🔹 Fallback images */
const placeholderImages = {
  A: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  B: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  C: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  D: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  E: "https://images.unsplash.com/photo-1492684223066-e9e5a0c1b1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
};

const getFallbackImage = (title) => {
  if (!title) return placeholderImages.E;
  const firstChar = title[0].toUpperCase();
  return placeholderImages[firstChar] || placeholderImages.E;
};

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchEventAndBooking = async () => {
      try {
        const eventRes = await fetch(`${API_BASE_URL}/api/events/${id}`);
        if (!eventRes.ok) throw new Error("Failed to fetch event");
        const eventData = await eventRes.json();
        setEvent(eventData);

        const token = localStorage.getItem("token");
        if (token) {
          const bookingRes = await fetch(`${API_BASE_URL}/api/bookings/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (bookingRes.ok) {
            const bookingData = await bookingRes.json();
            const bookedEventIds = Array.isArray(bookingData)
              ? bookingData.map((b) => (typeof b.event === "string" ? b.event : b.event._id))
              : [];

            if (bookedEventIds.includes(id)) {
              setIsRegistered(true);
            }
          }
        }
      } catch {
        setError("Unable to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndBooking();
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to register for this event");
      navigate("/login");
      return;
    }
    setShowPayment(true);
  };

  const handleFakePayment = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setProcessing(true);
    try {
      const res = await fetch("https://ev-nitjsr-hro2.vercel.app/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: event._id }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsRegistered(true);
        setShowPayment(false);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.secondary }}>
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 rounded-full border-t-transparent animate-spin"
               style={{ borderColor: colors.primary, borderTopColor: 'transparent' }}></div>
          <p className="mt-4" style={{ color: colors.text }}>Loading event details...</p>
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
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>Unable to Load Event</h3>
          <p style={{ color: colors.text }} className="mb-6">{error}</p>
          <button
            onClick={() => navigate("/events")}
            className="px-6 py-2.5 rounded-lg font-medium transition-all duration-300"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.white
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: colors.secondary }} className="min-h-screen">
      {/* Header with Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm mb-6 transition-all duration-200"
          style={{ 
            color: colors.text,
            backgroundColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primary;
            e.currentTarget.style.backgroundColor = colors.secondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.text;
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Events
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Event Image Hero */}
        <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8">
          <img
            src={event.image ? `${API_BASE_URL}${event.image}` : getFallbackImage(event.title)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-lg opacity-90">{event.description?.substring(0, 100)}...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8"
                 style={{ 
                   border: `1px solid ${colors.border}`,
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                 }}>
              
              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-4"
                       style={{ backgroundColor: colors.primary }}>
                    <MapPin size={20} color={colors.white} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.text }}>Location</p>
                    <p className="font-semibold" style={{ color: colors.dark }}>{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-4"
                       style={{ backgroundColor: colors.primary }}>
                    <Calendar size={20} color={colors.white} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.text }}>Date & Time</p>
                    <p className="font-semibold" style={{ color: colors.dark }}>{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-4"
                       style={{ backgroundColor: colors.primary }}>
                    <DollarSign size={20} color={colors.white} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: colors.text }}>Ticket Price</p>
                    <p className="font-semibold" style={{ color: colors.dark }}>₹{event.price}</p>
                  </div>
                </div>

                {event.availableSeats && (
                  <div className="flex items-center p-4 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-4"
                         style={{ backgroundColor: colors.primary }}>
                      <Users size={20} color={colors.white} />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: colors.text }}>Available Seats</p>
                      <p className="font-semibold" style={{ color: colors.dark }}>{event.availableSeats}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.dark }}>Event Description</h3>
                <div className="prose max-w-none">
                  <p className="leading-relaxed" style={{ color: colors.text }}>
                    {event.description || "No description available for this event."}
                  </p>
                </div>
              </div>

              {/* Registration Status */}
              <div className="border-t pt-8" style={{ borderColor: colors.border }}>
                {isRegistered ? (
                  <div className="flex items-center justify-center p-6 rounded-xl"
                       style={{ 
                         backgroundColor: `${colors.success}10`,
                         border: `1px solid ${colors.success}20`
                       }}>
                    <CheckCircle size={24} className="mr-3" style={{ color: colors.success }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: colors.success }}>You are Registered</h4>
                      <p className="text-sm mt-1" style={{ color: colors.text }}>
                        Your ticket has been confirmed for this event.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.dark }}>Ready to Join?</h3>
                    <p className="mb-6" style={{ color: colors.text }}>
                      Secure your spot at this exclusive event
                    </p>
                    <button
                      onClick={handleRegister}
                      className="px-8 py-3 rounded-lg font-medium transition-all duration-300 inline-flex items-center"
                      style={{ 
                        backgroundColor: colors.primary,
                        color: colors.white,
                        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                    >
                      <CreditCard size={20} className="mr-2" />
                      Register Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-6"
                 style={{ 
                   border: `1px solid ${colors.border}`,
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                 }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>Ticket Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span style={{ color: colors.text }}>Standard Ticket</span>
                  <span className="font-bold" style={{ color: colors.dark }}>₹{event.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: colors.text }}>Booking Fee</span>
                  <span style={{ color: colors.success }}>Free</span>
                </div>
                <div className="border-t pt-4" style={{ borderColor: colors.border }}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold" style={{ color: colors.dark }}>Total Amount</span>
                    <span className="text-xl font-bold" style={{ color: colors.primary }}>₹{event.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6"
                 style={{ 
                   border: `1px solid ${colors.border}`,
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
                 }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.dark }}>Event Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.success }}></div>
                  <span style={{ color: colors.text }}>Certificate of Participation</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.success }}></div>
                  <span style={{ color: colors.text }}>Refreshments Included</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.success }}></div>
                  <span style={{ color: colors.text }}>Networking Opportunities</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.success }}></div>
                  <span style={{ color: colors.text }}>Digital Event Materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && !isRegistered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
               style={{ 
                 border: `1px solid ${colors.border}`,
                 boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
               }}>
            {/* Modal Header */}
            <div className="p-6 border-b" style={{ borderColor: colors.border }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: colors.dark }}>Complete Registration</h3>
                <button
                  onClick={() => setShowPayment(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: colors.text }}
                >
                  ✕
                </button>
              </div>
              <p style={{ color: colors.text }}>Secure payment for: <strong>{event.title}</strong></p>
            </div>

            {/* Payment Form */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 p-4 rounded-lg"
                   style={{ backgroundColor: colors.secondary }}>
                <span style={{ color: colors.text }}>Total Amount</span>
                <span className="text-2xl font-bold" style={{ color: colors.primary }}>₹{event.price}</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none"
                    style={{ 
                      borderColor: colors.border,
                      backgroundColor: colors.secondary
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none"
                      style={{ 
                        borderColor: colors.border,
                        backgroundColor: colors.secondary
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none"
                      style={{ 
                        borderColor: colors.border,
                        backgroundColor: colors.secondary
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="flex items-center p-3 rounded-lg mb-6"
                   style={{ backgroundColor: `${colors.primary}05` }}>
                <Shield size={18} className="mr-2" style={{ color: colors.primary }} />
                <p className="text-sm" style={{ color: colors.text }}>
                  Your payment is secured with 256-bit encryption
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    backgroundColor: colors.white,
                    color: colors.text,
                    border: `2px solid ${colors.border}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.secondary;
                    e.currentTarget.style.borderColor = colors.text;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.white;
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleFakePayment}
                  disabled={processing}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  style={{ 
                    backgroundColor: processing ? `${colors.primary}80` : colors.primary,
                    color: colors.white
                  }}
                  onMouseEnter={(e) => !processing && (e.currentTarget.style.backgroundColor = colors.primaryDark)}
                  onMouseLeave={(e) => !processing && (e.currentTarget.style.backgroundColor = colors.primary)}
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} className="mr-2" />
                      Pay ₹{event.price}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetail;