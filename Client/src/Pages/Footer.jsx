const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">
              Event<span className="text-blue-400">Pro</span>
            </h2>
          </div>

          {/* Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/" className="hover:text-blue-300 transition">Home</a>
            <a href="/events" className="hover:text-blue-300 transition">Events</a>
            <a href="/login" className="hover:text-blue-300 transition">Login</a>
            <a href="/register" className="hover:text-blue-300 transition">Signup</a>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EventPro. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;