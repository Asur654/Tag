import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isBotLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true, isBotLoading: false });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set((state) => ({
        messages: state.messages.some((m) => String(m._id) === String(res.data._id))
          ? state.messages
          : [...state.messages, res.data],
        ...(selectedUser.isBot ? { isBotLoading: true } : {}),
      }));

      // Socket.IO delivers replies immediately. This fallback also picks up a
      // reply if the socket reconnects while Gemini is responding.
      if (selectedUser.isBot) {
        void get().waitForBotReply(selectedUser._id, res.data.createdAt);
      }
    } catch (error) {
      if (selectedUser?.isBot) {
        set({ isBotLoading: false });
      }
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  waitForBotReply: async (botUserId, sentAt) => {
    const sentTime = new Date(sentAt).getTime();

    try {
      for (let attempt = 0; attempt < 25; attempt += 1) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const { selectedUser, messages } = get();
        if (String(selectedUser?._id) !== String(botUserId)) return;

        const replyAlreadyReceived = messages.some(
          (message) =>
            String(message.senderId) === String(botUserId) &&
            new Date(message.createdAt).getTime() > sentTime
        );
        if (replyAlreadyReceived) {
          set({ isBotLoading: false });
          return;
        }

        try {
          const res = await axiosInstance.get(`/messages/${botUserId}`);
          const hasReply = res.data.some(
            (message) =>
              String(message.senderId) === String(botUserId) &&
              new Date(message.createdAt).getTime() > sentTime
          );

          if (hasReply) {
            set({ messages: res.data, isBotLoading: false });
            return;
          }
        } catch {
          // The next short retry handles a temporary connection interruption.
        }
      }
    } finally {
      const { selectedUser } = get();
      if (String(selectedUser?._id) === String(botUserId)) {
        set({ isBotLoading: false });
      }
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.on("newMessage", (newMessage) => {
      const isRelevantMessage =
        String(newMessage.senderId) === String(selectedUser._id) ||
        String(newMessage.receiverId) === String(selectedUser._id);

      if (!isRelevantMessage) return;

      set((state) => {
        const alreadyExists = state.messages.some(
          (message) => String(message._id) === String(newMessage._id)
        );

        const isFromBot =
          state.selectedUser?.isBot &&
          String(newMessage.senderId) === String(state.selectedUser._id);

        if (alreadyExists) {
          return isFromBot ? { isBotLoading: false } : state;
        }

        return {
          messages: [...state.messages, newMessage],
          ...(isFromBot ? { isBotLoading: false } : {}),
        };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser, isBotLoading: false }),
}));
