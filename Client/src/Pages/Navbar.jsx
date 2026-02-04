import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";
import { Calendar, PlusCircle, LogOut, LogIn, UserPlus, Menu, X, Home, Ticket, User } from "lucide-react";

// Professional static color palette
const colors = {
  primary: "#6366F1",
  primaryDark: "#4F46E5",
  secondary: "#F8FAFC",
  accent: "#EC4899",
  dark: "#1E293B",
  light: "#F1F5F9",
  border: "#E2E8F0",
  text: "#64748B",
  success: "#10B981",
  error: "#EF4444",
  white: "#FFFFFF"
};

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const role = getUserRole();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Scroll effect for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav 
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : colors.white,
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 20px rgba(99, 102, 241, 0.08)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)'
              }}
            >
              <Ticket size={24} color={colors.white} />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight" style={{ color: colors.dark }}>
                Event
              </span>
              <span className="text-xl font-bold tracking-tight ml-1" style={{ color: colors.primary }}>
                Pro
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/"
              className="flex items-center px-4 py-2.5 rounded-lg transition-all duration-200"
              style={{ 
                color: colors.text,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            
            <Link 
              to="/events"
              className="flex items-center px-4 py-2.5 rounded-lg transition-all duration-200"
              style={{ 
                color: colors.text,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.secondary}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Calendar size={18} className="mr-2" />
              Events
            </Link>
            
            {role === "admin" && (
              <Link 
                to="/admin/add-event"
                className="flex items-center px-4 py-2.5 rounded-lg ml-2 transition-all duration-200"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.white,
                  boxShadow: '0 2px 10px rgba(99, 102, 241, 0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
              >
                <PlusCircle size={18} className="mr-2" />
                Add Event
              </Link>
            )}

            <div className="h-6 w-px mx-2" style={{ backgroundColor: colors.border }}></div>

            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200"
                  style={{ 
                    color: colors.primary,
                    backgroundColor: 'transparent',
                    border: `1px solid ${colors.primary}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  <LogIn size={18} className="mr-2" />
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.white,
                    boxShadow: '0 2px 10px rgba(99, 102, 241, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                >
                  <UserPlus size={18} className="mr-2" />
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center px-3 py-2 rounded-lg" style={{ backgroundColor: colors.secondary }}>
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.success }}></div>
                  <span className="text-sm font-medium" style={{ color: colors.dark }}>
                    {role === "admin" ? "Admin" : "User"}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-200"
                  style={{ 
                    backgroundColor: `${colors.error}15`,
                    color: colors.error,
                    border: `1px solid ${colors.error}30`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.error;
                    e.currentTarget.style.color = colors.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.error}15`;
                    e.currentTarget.style.color = colors.error;
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg transition-all duration-200"
            style={{ 
              backgroundColor: menuOpen ? colors.primary : colors.secondary,
              color: menuOpen ? colors.white : colors.dark
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div 
            className="md:hidden mt-4 rounded-xl py-4 px-3"
            style={{ 
              backgroundColor: colors.secondary,
              border: `1px solid ${colors.border}`,
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div className="space-y-1">
              <Link 
                onClick={() => setMenuOpen(false)}
                to="/"
                className="flex items-center px-4 py-3 rounded-lg transition-all duration-200"
                style={{ color: colors.dark }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.light}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Home size={18} className="mr-3" />
                Home
              </Link>
              
              <Link 
                onClick={() => setMenuOpen(false)}
                to="/events"
                className="flex items-center px-4 py-3 rounded-lg transition-all duration-200"
                style={{ color: colors.dark }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.light}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Calendar size={18} className="mr-3" />
                Events
              </Link>
              
              {role === "admin" && (
                <Link 
                  onClick={() => setMenuOpen(false)}
                  to="/admin/add-event"
                  className="flex items-center px-4 py-3 rounded-lg transition-all duration-200"
                  style={{ 
                    color: colors.primary,
                    backgroundColor: `${colors.primary}15`
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${colors.primary}25`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${colors.primary}15`}
                >
                  <PlusCircle size={18} className="mr-3" />
                  Add Event
                </Link>
              )}

              <div className="h-px my-2" style={{ backgroundColor: colors.border }}></div>

              {!isLoggedIn ? (
                <div className="space-y-2 pt-2">
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/login"
                    className="flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    style={{ 
                      color: colors.primary,
                      border: `1px solid ${colors.primary}`,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.primary;
                    }}
                  >
                    <LogIn size={18} className="mr-3" />
                    Login
                  </Link>
                  
                  <Link
                    onClick={() => setMenuOpen(false)}
                    to="/register"
                    className="flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.white
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primaryDark}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary}
                  >
                    <UserPlus size={18} className="mr-3" />
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between px-4 py-3 rounded-lg" style={{ backgroundColor: colors.light }}>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.success }}></div>
                      <span className="font-medium" style={{ color: colors.dark }}>
                        {role === "admin" ? "Admin" : "User"}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: colors.text }}>
                      Active
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-200"
                    style={{ 
                      backgroundColor: `${colors.error}15`,
                      color: colors.error,
                      border: `1px solid ${colors.error}30`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.error;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.error}15`;
                      e.currentTarget.style.color = colors.error;
                    }}
                  >
                    <LogOut size={18} className="mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;