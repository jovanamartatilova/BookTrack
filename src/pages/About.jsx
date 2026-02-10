export default function About() {
  const features = [
    {
      title: "Smart Search",
      description: "Find any book instantly with our powerful search engine powered by Open Library API"
    },
    {
      title: "Personal Library",
      description: "Save your favorite books and build your personalized digital collection"
    },
    {
      title: "Vast Collection",
      description: "Access to millions of books across all genres and categories"
    },
    {
      title: "Dark Mode",
      description: "Read comfortably day or night with our eye-friendly dark theme"
    },
    {
      title: "Responsive Design",
      description: "Seamless experience across all devices - mobile, tablet, and desktop"
    },
    {
      title: "Lightning Fast",
      description: "Quick loading times and smooth performance for the best user experience"
    }
  ];

  const stats = [
    { number: "100", label: "Books Available" },
    { number: "7", label: "Categories" },
    { number: "100%", label: "Free" },
    { number: "24/7", label: "Access" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About BookTrack
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Your personal digital library that helps you discover, track, and organize your favorite books all in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="rounded-xl p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700"
          >
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: '#2563eb' }}
            >
              {stat.number}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg mb-16"
      >
        <div className="flex items-center mb-6">
          <div 
            className="h-12 w-1 mr-4"
            style={{ backgroundColor: '#2563eb' }}
          ></div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          We believe that reading is the foundation of knowledge and personal growth. Our mission is to make books accessible to everyone, everywhere. BookTrack was created to solve a simple problem: how do we help book lovers discover great books and keep track of their reading journey?
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          By integrating with Open Library's vast database, we provide free access to millions of books across all genres. Whether you're into fiction, programming, science, or history - we've got you covered.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Why Choose BookTrack?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#dbeafe' }}
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: '#2563eb' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Privacy First</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Your data stays on your device. We don't track or sell your information.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#dbeafe' }}
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: '#2563eb' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Always Free</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Access to millions of books without any subscription or hidden fees.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#dbeafe' }}
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: '#2563eb' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">User Focused</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Every feature is designed with your reading experience in mind.</p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Start Reading?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of readers who have already discovered their next favorite book with BookTrack.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/" 
            className="px-8 py-4 text-white rounded-lg font-semibold transition-colors shadow-lg"
            style={{ backgroundColor: '#2563eb' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Start Exploring
          </a>
          <a 
            href="/explore" 
            className="px-8 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-lg"
          >
            Browse Categories
          </a>
        </div>
      </div>
    </div>
  );
}