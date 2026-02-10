import { useEffect, useState } from "react";
import { searchBooks } from "../api/Books";
import { toggleFav, isFav } from "../api/Favorites";
import { Link } from "react-router-dom";

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();

  const categories = [
    { id: "all", name: "All Books", query: "book" },
    { id: "fiction", name: "Fiction", query: "fiction" },
    { id: "programming", name: "Programming", query: "programming" },
    { id: "science", name: "Science", query: "science" },
    { id: "history", name: "History", query: "history" },
    { id: "business", name: "Business", query: "business" },
    { id: "art", name: "Art & Design", query: "art design" },
    { id: "biography", name: "Biography", query: "biography" },
  ];

  useEffect(() => {
    loadBooks();
  }, [selectedCategory]);

  async function loadBooks() {
    setLoading(true);
    try {
      const category = categories.find(c => c.id === selectedCategory);
      const data = await searchBooks(category.query, 100);
      setBooks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleToggleFav = (book) => {
    toggleFav(book);
    forceUpdate({});
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Explore Our Collection
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse through our extensive digital library by category
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-3 min-w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-white shadow-lg"
              style={{
                backgroundColor: selectedCategory === category.id ? '#2563eb' : '#ffffff',
                color: selectedCategory === category.id ? '#ffffff' : '#374151',
                transform: selectedCategory === category.id ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.target.style.backgroundColor = '#ffffff';
                }
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Books Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {loading ? "Loading books..." : `${books.length} books available`}
        </p>
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
                    className="mt-auto w-full py-2 px-3 rounded-lg text-xs font-medium transition-all text-white shadow-md"
                    style={{ backgroundColor: isFavorite ? '#ef4444' : '#e5e7eb', color: isFavorite ? '#ffffff' : '#374151' }}
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
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No books found in this category.
          </p>
        </div>
      )}
    </div>
  );
}