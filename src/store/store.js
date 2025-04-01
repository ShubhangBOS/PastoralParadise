import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";
import { createProcessSlice } from "./slices/ProcessSlice";

// export const useAppStore = create()((...a) => ({
//   ...createAuthSlice,
// }));

export const useAppStore = create((set, get) => ({
  ...createAuthSlice(set, get),
  ...createProcessSlice(set, get),
}));
