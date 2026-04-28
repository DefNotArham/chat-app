import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,

  checkAuth: async () => {
    set({ loading: true });

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/checkAuth",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        set({
          user: response.data.user,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true },
      );

      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;
