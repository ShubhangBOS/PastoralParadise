import { create } from "zustand";

export const useAppStore = create((set) => ({
  // Query result
  queryResult:
    typeof window !== "undefined"
      ? JSON.parse(sessionStorage.getItem("queryResult")) || null
      : null,
  setQueryResult: (result) => {
    sessionStorage.setItem("queryResult", JSON.stringify(result));
    set({ queryResult: result });
  },

  // Listings
  listings: [],
  setListings: (data) => set({ listings: data }),

  // Current Listing
  currentListing: null,
  setCurrentListing: (listing) => set({ currentListing: listing }),

  // Listing Images
  imageListings: [],
  setImageListings: (images) => set({ imageListings: images }),

  // Check-in/out dates
  checkInOutDates: [],
  setCheckInOutDates: (dates) => set({ checkInOutDates: dates }),

  // Auth modal and user state
  authModal: false,
  setAuthModal: (value) => set({ authModal: value }),

  authMode: "login",
  setAuthMode: (mode) => set({ authMode: mode }),

  userInfo: null,
  setUserInfo: (info) => set({ userInfo: info }),

  isLoggedIn: false,
  setIsLoggedIn: (val) => set({ isLoggedIn: val }),
}));
