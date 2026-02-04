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
        "http://localhost:5000/api/auth/login",
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

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t" 
                   style={{ borderColor: colors.border }}></div>
              <span className="flex-shrink mx-4 text-sm" 
                    style={{ color: colors.text }}>Or continue with</span>
              <div className="flex-grow border-t" 
                   style={{ borderColor: colors.border }}></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-2.5 px-4 rounded-lg border flex items-center justify-center hover:shadow-sm transition-shadow"
                style={{ borderColor: colors.border }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="py-2.5 px-4 rounded-lg border flex items-center justify-center hover:shadow-sm transition-shadow"
                style={{ 
                  borderColor: colors.border,
                  color: colors.dark
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

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