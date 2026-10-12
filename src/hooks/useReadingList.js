
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'ar-library-reading-list';

const VALID_STATUSES = [
  'Want to Read',
  'Currently Reading',
  'Completed',
];

export function useReadingList() {
  const [readingList, setReadingList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};

      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return {};
      }

      return Object.fromEntries(
        Object.entries(parsed).filter(
          ([id, status]) =>
            /^\d+$/.test(id) && VALID_STATUSES.includes(status)
        )
      );
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
    } catch (error) {
      console.error('Unable to save reading list:', error);
    }
  }, [readingList]);

  function setBookStatus(bookId, status) {
    setReadingList((current) => {
      if (status === null) {
        const updated = { ...current };
        delete updated[bookId];
        return updated;
      }

      if (!VALID_STATUSES.includes(status)) {
        return current;
      }

      return {
        ...current,
        [bookId]: status,
      };
    });
  }

  function getBookStatus(bookId) {
    return readingList[bookId] || '';
  }

  return {
    readingList,
    setBookStatus,
    getBookStatus,
  };
}
