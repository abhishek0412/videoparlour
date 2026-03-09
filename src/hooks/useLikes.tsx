import { useState, useCallback } from "react";

const STORAGE_KEY = "videoparlour_likes";

function getLikes(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveLikes(likes: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...likes]));
}

function useLikes() {
  const [likes, setLikes] = useState<Set<string>>(getLikes);

  const isLiked = useCallback((id: string) => likes.has(id), [likes]);

  const toggleLike = useCallback((id: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveLikes(next);
      return next;
    });
  }, []);

  return { isLiked, toggleLike };
}

export default useLikes;
