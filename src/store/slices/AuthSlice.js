export const createAuthSlice = (set, get) => ({
  isAuthModalOpen: false,
  isLoggedIn: false,
  userInfo: false,
  setAuthModal: () => {
    set({ isAuthModalOpen: !get().isAuthModalOpen });
  },
  setIsLoggedIn: (status) => {
    set({ isLoggedIn: status });
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
});
