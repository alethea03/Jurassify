import { useState } from "react";

export interface UserFavorite {
  dinoId: string;
  note?: string;
  dinoName?: string;
  image?: string;
}

export const useUser = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // toggle false to test "not logged in"
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);

  // Toggle a dino as favorite
  const toggleFavorite = (dinoId: string, dinoName?: string, image?: string) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.dinoId === dinoId);
      if (exists) {
        return prev.filter(fav => fav.dinoId !== dinoId);
      } else {
        return [...prev, { dinoId, dinoName, image }];
      }
    });
  };

  // Add or update a note for a dino
  const addOrUpdateNote = (favWithNote: UserFavorite) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.dinoId === favWithNote.dinoId);
      if (exists) {
        return prev.map(fav =>
          fav.dinoId === favWithNote.dinoId ? { ...fav, note: favWithNote.note } : fav
        );
      } else {
        return [...prev, favWithNote];
      }
    });
  };

  // Check if dino is favorited
  const isDinoFavorited = (dinoId: string) => favorites.some(fav => fav.dinoId === dinoId);

  return {
    isLoggedIn,
    setIsLoggedIn,
    favorites,
    toggleFavorite,
    addOrUpdateNote,
    isDinoFavorited,
  };
};
