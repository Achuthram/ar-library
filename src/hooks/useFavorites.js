
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ar-library-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((bookId) => bookId !== id)
        : [...current, id]
    );
  }

  return { favorites, toggleFavorite };
}
