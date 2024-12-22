import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  isLoading: false,
  setIsLoading: (loading: any) => set({ isLoading: loading }),
  // clearUser: () => set({ user: null }),
  fetchUser: async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        credentials: "include",
      });

      console.log("fetching user");

      if (response.ok) {
        const data = await response.json();
        set({ user: data });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));

export default useUserStore;
