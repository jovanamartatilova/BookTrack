import { useState, useEffect } from "react";
import { getFav, toggleFav } from "../api/Favorites";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setBooks(getFav());
  };

  const handleRemove = (book) => {
    toggleFav(book);
    loadFavorites();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 font-montserrat">
          My Favorites
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {books.length} {books.length === 1 ? "book" : "books"} saved
        </p>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            No favorites yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Start adding books you love to your favorites collection
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#2563eb' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => {
            const cover = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://via.placeholder.com/180x270/4B5563/ffffff?text=No+Cover";
            const id = book.key.replace("/works/", "");

            return (
              <div key={book.key} className="group">
                <Link to={`/book/${id}`} className="block mb-3">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="space-y-1">
                  <Link to={`/book/${id}`}>
                    <h3 
                      className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 transition-colors"
                      onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                      onMouseLeave={(e) => e.target.style.color = ''}
                    >
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                    {book.author_name?.[0] || "Unknown"}
                  </p>
                  
                  <button
                    onClick={() => handleRemove(book)}
                    className="w-full mt-2 py-1.5 px-3 rounded text-xs font-medium text-white transition-colors"
                    style={{ backgroundColor: '#ef4444' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}