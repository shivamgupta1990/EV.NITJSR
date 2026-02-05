import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, DollarSign, Users, Upload, PlusCircle, ArrowLeft } from "lucide-react";

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
  white: "#FFFFFF",
  cardBg: "#FFFFFF"
};

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    availableSeats: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      // console.log("file",file);
      setFormData({
        ...formData,
        [name]: file,
      });
      // Create preview URL
      setPreviewImage(URL.createObjectURL(file));
      // console.log("fileURL->",previewImage);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

    // Validate required fields
    if (!formData.title || !formData.date || !formData.location || !formData.price) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      console.log('Response->',response);
      const result = await response.json();
      console.log('REsut->',result);
      if (!response.ok) {
        setError(result.message || "Failed to add event");
        setLoading(false);
        return;
      }

      setSuccess("Event added successfully!");
      setTimeout(() => {
        navigate("/events");
      }, 1500);
    } catch (err) {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div style={{ backgroundColor: colors.secondary }} className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
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

          <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4"
               style={{ backgroundColor: colors.primary }}>
            <PlusCircle size={28} color={colors.white} />
          </div>
          <h1 className="text-3xl font-bold text-center mb-3" style={{ color: colors.dark }}>
            Create New Event
          </h1>
          <p className="text-center" style={{ color: colors.text }}>
            Fill in the details to add a new event to the platform
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden"
             style={{ border: `1px solid ${colors.border}` }}>
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 rounded-lg flex items-center"
                   style={{ 
                     backgroundColor: `${colors.error}10`,
                     border: `1px solid ${colors.error}20`,
                     color: colors.error 
                   }}>
                <div className="w-2 h-2 rounded-full mr-3" 
                     style={{ backgroundColor: colors.error }}></div>
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-lg flex items-center"
                   style={{ 
                     backgroundColor: `${colors.success}10`,
                     border: `1px solid ${colors.success}20`,
                     color: colors.success 
                   }}>
                <div className="w-2 h-2 rounded-full mr-3" 
                     style={{ backgroundColor: colors.success }}></div>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Two Column Layout for First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Event Title */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    Event Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.secondary
                      }}
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div style={{ color: colors.text }}>📝</div>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    Event Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.secondary
                      }}
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <Calendar size={18} color={colors.text} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    Location *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter venue location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.secondary
                      }}
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <MapPin size={18} color={colors.text} />
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                    Price (₹) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter ticket price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                      style={{
                        borderColor: colors.border,
                        backgroundColor: colors.secondary
                      }}
                      min="0"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <DollarSign size={18} color={colors.text} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Seats */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Available Seats
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="availableSeats"
                    placeholder="Enter number of available seats"
                    value={formData.availableSeats}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                    style={{
                      borderColor: colors.border,
                      backgroundColor: colors.secondary
                    }}
                    min="1"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Users size={18} color={colors.text} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Event Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your event in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all duration-200 resize-none"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.secondary
                  }}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                  Event Image
                </label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200"
                     style={{ 
                       borderColor: previewImage ? colors.primary : colors.border,
                       backgroundColor: previewImage ? `${colors.primary}05` : colors.secondary 
                     }}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full mb-3 flex items-center justify-center"
                           style={{ backgroundColor: colors.primary }}>
                        <Upload size={24} color={colors.white} />
                      </div>
                      <p className="font-medium mb-1" style={{ color: colors.dark }}>
                        {previewImage ? "Change Image" : "Upload Event Image"}
                      </p>
                      <p className="text-sm" style={{ color: colors.text }}>
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </label>
                  
                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm mb-2" style={{ color: colors.text }}>Preview:</p>
                      <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                        <img 
                          src={previewImage} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
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
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
                  style={{ 
                    backgroundColor: loading ? `${colors.primary}80` : colors.primary,
                    color: colors.white
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = colors.primaryDark)}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = colors.primary)}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding Event...
                    </>
                  ) : (
                    <>
                      <PlusCircle size={18} className="mr-2" />
                      Add Event
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Form Guidelines */}
        <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: colors.light }}>
          <h3 className="font-medium mb-3" style={{ color: colors.dark }}>📋 Form Guidelines:</h3>
          <ul className="space-y-2 text-sm" style={{ color: colors.text }}>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2" style={{ backgroundColor: colors.primary }}></div>
              Fields marked with * are required
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2" style={{ backgroundColor: colors.primary }}></div>
              Use clear, descriptive titles for better visibility
            </li>
            <li className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2" style={{ backgroundColor: colors.primary }}></div>
              High-quality images attract more attendees
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;