import { useState } from "react";
import { User, Mail, Lock, CheckCircle, UserPlus, ArrowRight } from "lucide-react";

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

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.terms) {
      setError("Please accept terms & conditions");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role:'user',
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.secondary }}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
               style={{ backgroundColor: colors.primary }}>
            <UserPlus size={28} color={colors.white} />
          </div>
          <h1 className="text-3xl font-bold mb-3" style={{ color: colors.dark }}>
            Create Your Account
          </h1>
          <p className="text-lg" style={{ color: colors.text }}>
            Join our community and start booking amazing events
          </p>
        </div>

        {/* Card */}
        <div 
          className="bg-white rounded-2xl p-8"
          style={{
            border: `1px solid ${colors.border}`,
            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)'
          }}
        >
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
              <CheckCircle size={20} className="mr-3" />
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <User size={18} color={colors.text} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.secondary
                  }}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail size={18} color={colors.text} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.secondary
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock size={18} color={colors.text} />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.secondary
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: colors.text }}>
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: colors.dark }}>
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock size={18} color={colors.text} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.secondary
                  }}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 mr-3 rounded"
                style={{ accentColor: colors.primary }}
              />
              <label className="text-sm" style={{ color: colors.text }}>
                I agree to the{" "}
                <a href="#" className="font-medium hover:underline" style={{ color: colors.primary }}>
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium hover:underline" style={{ color: colors.primary }}>
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center"
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t text-center" style={{ borderColor: colors.border }}>
            <p style={{ color: colors.text }}>
              Already have an account?{" "}
              <a 
                href="#" 
                className="font-medium hover:underline inline-flex items-center"
                style={{ color: colors.primary }}
              >
                Login here
                <ArrowRight size={16} className="ml-1" />
              </a>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center text-sm" style={{ color: colors.text }}>
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.success }}></div>
            Your data is secured with 256-bit encryption
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;