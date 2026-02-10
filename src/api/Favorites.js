const FAVORITES_KEY = "booktrack_favorites";

export function getFav() {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading favorites:", error);
    return [];
  }
}

export function isFav(bookKey) {
  const favorites = getFav();
  return favorites.some((book) => book.key === bookKey);
}

export function toggleFav(book) {
  try {
    const favorites = getFav();
    const exists = favorites.some((fav) => fav.key === book.key);

    if (exists) {
      const updated = favorites.filter((fav) => fav.key !== book.key);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return false;
    } else {
      favorites.push({
        key: book.key,
        title: book.title,
        author_name: book.author_name || [],
        cover_i: book.cover_i,
        first_publish_year: book.first_publish_year,
      });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return null;
  }
}

export function clearAllFav() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error("Error clearing favorites:", error);
    return false;
  }
}
