import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const saveFavourites = async (value, uid) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
      console.log("✅ Saved favourites:", value);
    } catch (e) {
      console.log("❌ Save error:", e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
      if (value !== null) {
        const parsed = JSON.parse(value);
        console.log("✅ Loaded favourites:", parsed);
        setFavourites(parsed);
      } else {
        console.log("ℹ️ No saved favourites for:", uid);
        setFavourites([]); // <- Important!
      }
    } catch (e) {
      console.log("❌ Load error:", e);
    } finally {
      setLoaded(true);
    }
  };

  const add = (restaurant) => {
    setFavourites((prev) => [...prev, restaurant]);
  };

  const remove = (restaurant) => {
    setFavourites((prev) =>
      prev.filter((x) => x.placeId !== restaurant.placeId)
    );
  };

  // Load on login
  useEffect(() => {
    if (user && user.uid) {
      setLoaded(false); // reset load flag
      loadFavourites(user.uid);
    } else {
      setFavourites([]); // clear on logout
    }
  }, [user]);

  // Save only AFTER load is finished
  useEffect(() => {
    if (loaded && user && user.uid) {
      console.log("📦 Triggered SAVE after load");
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, loaded, user]);

  // Debug logs
  useEffect(() => {
    console.log("🔍 Favourites state:", favourites);
    console.log("👤 Current user:", user?.uid);
    console.log("✅ Loaded flag:", loaded);
  }, [favourites, user, loaded]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
