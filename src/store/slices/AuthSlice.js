export const createAuthSlice = (set, get) => ({
  isAuthModalOpen: null,
  isLoggedIn: false,
  userInfo: null,
  authMode: "login",

  setAuthModal: () => {
    set({ isAuthModalOpen: !get().isAuthModalOpen });
  },
  setIsLoggedIn: (status) => {
    set({ isLoggedIn: status });
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", status ? "true" : "false");
    }
  },
  setUserInfo: (userInfo) => {
    set({ userInfo });
    if (typeof window !== "undefined") {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  },
  setAuthMode: (mode) => set({ authMode: mode }),

  restoreAuth: () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (user && loggedIn) {
        set({ userInfo: user, isLoggedIn: true });
      }
    }
  },
});
