import { useState, useEffect } from "react";
import { getFav } from "../api/Favorites";

export default function Account() {
  const [favorites, setFavorites] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [memberSince] = useState("January 2026");

  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) {
      setIsSignedIn(true);
      setUserName(savedUser);
    }
    setFavorites(getFav());
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (name.trim()) {
      localStorage.setItem("userName", name);
      setUserName(name);
      setIsSignedIn(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    setUserName("");
    setIsSignedIn(false);
  };

  if (!isSignedIn) {
    return (
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#dbeafe' }}
            >
              <svg 
                className="w-10 h-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: '#2563eb' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to BookTrack</h2>
            <p className="text-gray-600 dark:text-gray-400">Sign in to track your reading journey</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent"
                placeholder="Enter your name"
                style={{ outlineColor: '#2563eb' }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = ''}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-white rounded-lg font-semibold transition-colors shadow-md"
              style={{ backgroundColor: '#2563eb' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            No password required. Your data is stored locally on your device.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            My Account
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your reading journey and manage your account settings
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="px-6 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
        >
          Sign Out
        </button>
      </div>

      {/* Profile Card */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 mb-8 shadow-lg border-2"
        style={{ borderColor: '#dbeafe' }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
            style={{ backgroundColor: '#dbeafe', color: '#1e40af' }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{userName}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">Member since {memberSince}</p>
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full"
              style={{ backgroundColor: '#eff6ff' }}
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ color: '#2563eb' }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span 
                className="font-medium"
                style={{ color: '#1d4ed8' }}
              >
                Active Member
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Reading Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Reading Progress</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">This Month</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Books Saved</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{favorites.length} / 30</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all"
                style={{ 
                  width: `${Math.min((favorites.length / 30) * 100, 100)}%`,
                  backgroundColor: '#2563eb'
                }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Goal</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">3 / 5 books</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full" 
                style={{ width: '60%', backgroundColor: '#3b82f6' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}