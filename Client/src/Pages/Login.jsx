import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Professional color palette
  const colors = {
    primary: "#6366F1",      // Indigo-500
    primaryDark: "#4F46E5",  // Indigo-600
    secondary: "#F8FAFC",    // Slate-50
    accent: "#EC4899",       // Pink-500
    dark: "#1E293B",         // Slate-800
    light: "#F1F5F9",        // Slate-100
    border: "#E2E8F0",       // Slate-200
    text: "#64748B",         // Slate-500
    success: "#10B981",      // Emerald-500
    error: "#EF4444"         // Red-500
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "https://ev-nitjsr.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      
      // Success animation before redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 800);
      
    } catch (err) {
      setError("Server error. Try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4"
      style={{ 
        background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.light} 100%)`
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4" 
               style={{ backgroundColor: colors.primary }}>
            <LogIn size={28} color="white" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: colors.dark }}>
            Welcome Back
          </h1>
          <p className="mt-2" style={{ color: colors.text }}>
            Sign in to continue to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8"
             style={{
               border: `1px solid ${colors.border}`,
               boxShadow: `0 20px 40px rgba(99, 102, 241, 0.1)`
             }}>
          
          {error && (
            <div className="mb-6 p-3 rounded-lg text-sm flex items-center"
                 style={{ 
                   backgroundColor: `${colors.error}10`,
                   border: `1px solid ${colors.error}20`,
                   color: colors.error 
                 }}>
              <div className="w-2 h-2 rounded-full mr-2" 
                   style={{ backgroundColor: colors.error }}></div>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium mb-2" 
                     style={{ color: colors.dark }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Mail size={18} color={colors.text} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium" 
                       style={{ color: colors.dark }}>
                  Password
                </label>
                <a href="#" className="text-sm hover:underline"
                   style={{ color: colors.primary }}>
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Lock size={18} color={colors.text} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border focus:outline-none transition-all duration-200"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.secondary
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: colors.text }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2 rounded"
                style={{ accentColor: colors.primary }}
              />
              <label htmlFor="remember" className="text-sm" 
                     style={{ color: colors.text }}>
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center"
              style={{ 
                backgroundColor: colors.primary,
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = colors.primaryDark)}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = colors.primary)}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <LogIn size={18} className="ml-2" />
                </>
              )}
            </button>

            

            {/* Social Login */}
          

            {/* Sign Up Link */}
            <div className="text-center pt-6 border-t" 
                 style={{ borderColor: colors.border }}>
              <p className="text-sm" style={{ color: colors.text }}>
                Don't have an account?{' '}
                <a href="/register" className="font-medium hover:underline"
                   style={{ color: colors.primary }}>
                  Sign up now
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs" style={{ color: colors.text }}>
            By signing in, you agree to our{' '}
            <a href="#" className="hover:underline" style={{ color: colors.primary }}>
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="hover:underline" style={{ color: colors.primary }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;