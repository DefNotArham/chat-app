import { create } from "zustand";
import axios from "axios";

const useChannelStore = create((set) => ({
  channels: [],
  channelError: null,
  errorType: null,

  loadingCreate: false,

  loadChannels: async (serverId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/server/channel/get-channels/${serverId}`,
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set({ channels: response.data.channels });

        return { success: true };
      }
    } catch (error) {}
  },

  createChannel: async (serverId, newChannel) => {
    set({ loadingCreate: true, channelError: "", errorType: "" });
    try {
      const response = await axios.post(
        `http://localhost:8000/server/channel/create-channel/${serverId}`,
        { channelName: newChannel.trim() },
        { withCredentials: true },
      );

      if (response?.data?.success) {
        set((state) => ({
          channels: [...state.channels, response?.data?.channel],
          loadingCreate: false,
        }));

        return { success: true };
      }
    } catch (error) {
      console.log(error);

      set({
        loadingCreate: false,
        channelError: error?.response?.data?.message || "Something went wrong",
        errorType: error?.response?.data?.typeError || "createChannel",
      });

      setTimeout(() => {
        set({ channelError: "", errorType: "" });
      }, 3000);
      return { success: false };
    }
  },

  deleteChannel: async (serverId, channelId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/server/channel/delete-channel/${serverId}/channel/${channelId}`,
        { withCredentials: true },
      );

      if (response?.data?.success) {
        channels: state.channels.filter((c) => c._id !== channelId);

        return { success: true };
      }
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  },
}));

export default useChannelStore;
