import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
  const naviaget= useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) return setError("Unauthorized");

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Failed to add event");
        return;
      }

      setSuccess("Event added successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        availableSeats: "",
        image: null,
      });
      naviaget("/home");
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Add New Event
        </h2>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {success && <p className="text-green-600 text-center mt-3">{success}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input name="title" placeholder="Event Title" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" required />

          <textarea name="description" placeholder="Description"
            onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

          <input type="date" name="date" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" />

          <input name="location" placeholder="Location" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md" />

          <input type="number" name="price" placeholder="Price"
            onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

          <input type="number" name="availableSeats" placeholder="Seats"
            onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

          {/* ✅ Image Upload */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          <button className="w-full bg-indigo-600 text-white py-2 rounded-md">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
