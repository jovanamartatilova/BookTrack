import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Section - Larger */}
          <div className="md:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              {/* Logo */}
			  <Link to="/" className="flex items-center space-x-3">
			{<img src={logo} alt="BookTrack Logo" className="h-10 w-10 object-contain" />}
			</Link>
              <h3 className="text-3xl font-bold">BookTrack</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Your personal digital library for discovering and tracking amazing books. Read more, learn more, grow more.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="text-sm">100 Books</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Free Forever</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="h-8 w-1 bg-blue-500 mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center"><span className="mr-2">›</span> Home</Link></li>
              <li><Link to="/explore" className="text-gray-300 hover:text-white transition-colors flex items-center"><span className="mr-2">›</span> Explore Books</Link></li>
              <li><Link to="/favorites" className="text-gray-300 hover:text-white transition-colors flex items-center"><span className="mr-2">›</span> My Favorites</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center"><span className="mr-2">›</span> About Us</Link></li>
              <li><Link to="/account" className="text-gray-300 hover:text-white transition-colors flex items-center"><span className="mr-2">›</span> My Account</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="h-8 w-1 bg-blue-500 mr-3"></span>
              Categories
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>Fiction</li>
              <li>Programming</li>
              <li>Science</li>
              <li>Business</li>
              <li>Biography</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="h-8 w-1 bg-blue-500 mr-3"></span>
              Contact
            </h3>
            <a 
              href="mailto:hello@booktrack.com" 
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg"
            >
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Email Us</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              &copy; 2026 BookTrack. Made with <span className="text-red-500">❤</span> for book lovers.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}