import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";
import { createProcessSlice } from "./slices/ProcessSlice";
import { createListingSlice } from "./slices/ListingsSlice";
import { useBookingStore } from "./slices/BookingSlice";
import { persist } from "zustand/middleware";

export const useAppStore = create((set, get) => ({
  ...createAuthSlice(set, get),
  ...createProcessSlice(set, get),
  ...createListingSlice(set, get),
  ...useBookingStore(set, get),
}));
