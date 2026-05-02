import { create } from "zustand";
import axios from "axios";
import useAuthStore from "./Auth.Store";

const useUserStore = create((set) => ({
  user: null,
  status: "online",
  changeStatus: async (newStatus) => {
    try {
      await axios.patch(
        "http://localhost:8000/user/change-status",
        { status: newStatus },
        { withCredentials: true },
      );

      set({
        status: newStatus,
      });

      const { user } = useAuthStore.getState();
      useAuthStore.setState({ user: { ...user, status: newStatus } });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useUserStore;
