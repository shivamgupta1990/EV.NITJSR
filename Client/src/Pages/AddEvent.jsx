import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, DollarSign, Users, PlusCircle, ArrowLeft, FileText } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
  "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
];

const colors = {
  primary: "#6366F1",
  primaryDark: "#4F46E5",
  secondary: "#F8FAFC",
  dark: "#1E293B",
  light: "#F1F5F9",
  border: "#E2E8F0",
  text: "#64748B",
  success: "#10B981",
  error: "#EF4444",
  white: "#FFFFFF",
};

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    availableSeats: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to add events");
      setLoading(false);
      return;
    }

    if (!formData.title || !formData.date || !formData.location || !formData.price) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    const randomImage =
      EVENT_IMAGES[Math.floor(Math.random() * EVENT_IMAGES.length)];

    const payload = {
      ...formData,
      price: Number(formData.price),
      availableSeats: Number(formData.availableSeats || 0),
      image: randomImage,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Failed to add event");
        setLoading(false);
        return;
      }

      setSuccess("Event added successfully!");
      setTimeout(() => navigate("/events"), 1500);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4" style={{ backgroundColor: colors.secondary }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white transition-colors duration-200 mb-4"
            style={{ color: colors.text }}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ backgroundColor: `${colors.primary}15` }}>
              <PlusCircle size={32} style={{ color: colors.primary }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.dark }}>
              Create New Event
            </h1>
            <p className="text-lg" style={{ color: colors.text }}>
              Fill in the details to organize your event
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border" style={{ 
              backgroundColor: `${colors.error}10`, 
              borderColor: colors.error 
            }}>
              <p className="font-medium" style={{ color: colors.error }}>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 rounded-lg border" style={{ 
              backgroundColor: `${colors.success}10`, 
              borderColor: colors.success 
            }}>
              <p className="font-medium" style={{ color: colors.success }}>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                Event Title *
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <PlusCircle size={20} style={{ color: colors.text }} />
                </div>
                <input
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.dark,
                    backgroundColor: colors.secondary 
                  }}
                  required
                />
              </div>
            </div>

            {/* Date and Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Event Date *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Calendar size={20} style={{ color: colors.text }} />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.dark,
                      backgroundColor: colors.secondary 
                    }}
                    required
                  />
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Location *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <MapPin size={20} style={{ color: colors.text }} />
                  </div>
                  <input
                    name="location"
                    placeholder="Enter venue"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.dark,
                      backgroundColor: colors.secondary 
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Price and Seats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Price (₹) *
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <DollarSign size={20} style={{ color: colors.text }} />
                  </div>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.dark,
                      backgroundColor: colors.secondary 
                    }}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Seats Field */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Available Seats
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Users size={20} style={{ color: colors.text }} />
                  </div>
                  <input
                    type="number"
                    name="availableSeats"
                    placeholder="Unlimited"
                    value={formData.availableSeats}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                    style={{ 
                      borderColor: colors.border,
                      color: colors.dark,
                      backgroundColor: colors.secondary 
                    }}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                Description
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3">
                  <FileText size={20} style={{ color: colors.text }} />
                </div>
                <textarea
                  name="description"
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all resize-none"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.dark,
                    backgroundColor: colors.secondary 
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ 
                  backgroundColor: colors.primary,
                  boxShadow: `0 4px 14px 0 ${colors.primary}40`
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding Event...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={22} />
                    <span>Create Event</span>
                  </>
                )}
              </button>
              
              <p className="text-sm text-center mt-4" style={{ color: colors.text }}>
                Fields marked with * are required
              </p>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-lg text-center" style={{ backgroundColor: `${colors.primary}08` }}>
          <p className="text-sm" style={{ color: colors.text }}>
            A random image will be assigned to your event automatically
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;