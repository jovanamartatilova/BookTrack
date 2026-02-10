import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toggleFav, isFav } from "../api/Favorites";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, forceUpdate] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((r) => r.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleToggleFav = () => {
    if (book) {
      const bookData = {
        key: `/works/${id}`,
        title: book.title,
        author_name: book.authors ? [book.authors[0]?.author?.key] : [],
        cover_i: book.covers?.[0],
        first_publish_year: book.created?.value?.split("-")[0],
      };
      toggleFav(bookData);
      forceUpdate({});
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-200 dark:bg-gray-700 aspect-[2/3] rounded-lg"></div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Book not found</p>
        <button
          onClick={handleBack}
          style={{ color: '#2563eb' }}
          onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.color = '#2563eb'}
        >
          Go Back
        </button>
      </div>
    );
  }

  const desc =
    typeof book.description === "string"
      ? book.description
      : book.description?.value || "No description available for this book.";

  const cover = book.covers?.[0]
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : "https://via.placeholder.com/300x450/4B5563/ffffff?text=No+Cover";

  const isFavorite = isFav(`/works/${id}`);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="inline-flex items-center text-gray-600 dark:text-gray-400 mb-8 transition-colors"
        onMouseEnter={(e) => e.target.style.color = '#2563eb'}
        onMouseLeave={(e) => e.target.style.color = ''}
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      {/* Book Detail */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cover */}
        <div>
          <img
            src={cover}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x450/4B5563/ffffff?text=No+Cover";
            }}
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleToggleFav}
            className="w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors text-white"
            style={{ backgroundColor: isFavorite ? '#ef4444' : '#2563eb' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = isFavorite ? '#dc2626' : '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = isFavorite ? '#ef4444' : '#2563eb'}
          >
            {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
          </button>
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {book.title}
          </h1>

          {book.subtitle && (
            <h2 className="text-xl text-gray-700 dark:text-gray-300 mb-4">
              {book.subtitle}
            </h2>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {book.created?.value && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Published: {new Date(book.created.value).getFullYear()}
              </div>
            )}
          </div>

          {/* Tags */}
          {book.subjects && book.subjects.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {book.subjects.slice(0, 10).map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">About this book</h3>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}