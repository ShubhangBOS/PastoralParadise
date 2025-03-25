import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";

// export const useAppStore = create()((...a) => ({
//   ...createAuthSlice,
// }));

export const useAppStore = create((set, get) => ({
  ...createAuthSlice(set, get),
}));
