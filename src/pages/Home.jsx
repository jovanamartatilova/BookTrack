import { useEffect, useState } from "react";
import { searchBooks } from "../api/Books";
import { toggleFav, isFav } from "../api/Favorites";
import { Link } from "react-router-dom";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (initialLoad) {
      loadPopularBooks();
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad && query.trim()) {
      const timer = setTimeout(() => {
        searchBooksHandler();
      }, 500);
      return () => clearTimeout(timer);
    } else if (!initialLoad && !query.trim()) {
      loadPopularBooks();
    }
  }, [query, initialLoad]);

  async function loadPopularBooks() {
    setLoading(true);
    setError(null);
    try {
      console.log("Loading popular books...");
      const data = await searchBooks("bestseller", 50);
      console.log("Loaded books:", data.length);
      setBooks(data);
      if (data.length === 0) {
        setError("No books found. Try a different search.");
      }
    } catch (e) {
      console.error("Error loading popular books:", e);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function searchBooksHandler() {
    if (!query.trim()) {
      loadPopularBooks();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log("Searching for:", query);
      const data = await searchBooks(query, 50);
      console.log("Search results:", data.length);
      setBooks(data);
      if (data.length === 0) {
        setError(`No results found for "${query}". Try different keywords.`);
      }
    } catch (e) {
      console.error("Error searching books:", e);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchBooksHandler();
    } else {
      loadPopularBooks();
    }
  };

  const handleToggleFav = (book) => {
    toggleFav(book);
    forceUpdate({});
  };

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="relative text-white overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)' }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
          ></div>
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(79, 70, 229, 0.3)' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
            >
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                style={{ color: '#fde047' }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">100 Books Available</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Discover Books That
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ background: 'linear-gradient(to right, #fef3c7, #fde047, #facc15)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                Inspire Your Mind
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#bfdbfe' }}
            >
              Explore our vast digital library, save your favorites, and track your reading journey. Your next great adventure starts here.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8">
              <div className="relative group">
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-2xl blur-xl transition-all"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                ></div>
                
                <div className="relative flex items-center bg-white rounded-2xl shadow-2xl">
                  <svg 
                    className="absolute left-6 w-6 h-6"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: '#9ca3af' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title, author, or topic..."
                    className="w-full pl-16 pr-32 py-5 text-lg bg-transparent rounded-2xl focus:outline-none"
                    style={{ color: '#111827' }}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-8 py-3 text-white rounded-xl font-semibold transition-all transform shadow-lg"
                    style={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)' }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(to right, #1d4ed8, #4338ca)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(to right, #2563eb, #4f46e5)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#4ade80' }}
                ></div>
                <span style={{ color: '#bfdbfe' }}>Free Forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#4ade80' }}
                ></div>
                <span style={{ color: '#bfdbfe' }}>50+ Categories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Section */}
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {query ? `Search Results for "${query}"` : 'Popular Books'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {loading ? "Searching..." : error ? error : `${books.length} books found`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 aspect-[2/3] rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Books Grid */}
          {!loading && books.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {books.map((book) => {
                const cover = book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/180x270/6B7280/ffffff?text=No+Cover";
                const id = book.key.replace("/works/", "");
                const isFavorite = isFav(book.key);

                return (
                  <div key={book.key} className="group flex flex-col h-full">
                    <Link to={`/book/${id}`} className="block mb-3">
                      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md group-hover:shadow-xl transition-shadow">
                        <img
                          src={cover}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-col flex-1">
                      <Link to={`/book/${id}`} className="mb-1">
                        <h3 
                          className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] transition-colors"
                          onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                          onMouseLeave={(e) => e.target.style.color = ''}
                        >
                          {book.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                        {book.author_name?.[0] || "Unknown"}
                      </p>
                      
                      <button
                        onClick={() => handleToggleFav(book)}
                        className="mt-auto w-full py-2 px-3 rounded-lg text-xs font-medium transition-all shadow-md"
                        style={{ 
                          backgroundColor: isFavorite ? '#ef4444' : '#e5e7eb',
                          color: isFavorite ? '#ffffff' : '#374151'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = isFavorite ? '#dc2626' : '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = isFavorite ? '#ef4444' : '#e5e7eb';
                        }}
                      >
                        {isFavorite ? "♥ Saved" : "♡ Add to Favorites"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && books.length === 0 && (
            <div className="text-center py-20">
              <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">
                {error || "No books found"}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                Try searching with different keywords or browse popular books
              </p>
              <button
                onClick={loadPopularBooks}
                className="px-6 py-3 text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#2563eb' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
              >
                Load Popular Books
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}