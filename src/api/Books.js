export async function searchBooks(query, limit = 20) {
  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${encodedQuery}&limit=${limit}&fields=key,title,author_name,cover_i,first_publish_year,ratings_average`
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();

    return data.docs || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}