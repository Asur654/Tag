import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { ensureTagBotUser, generateBotReply } from "../lib/tagBot.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const botUser = await ensureTagBotUser();
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    const sidebarUsers = [
      { ...botUser.toObject(), isBot: true, profilePic: botUser.profilePic || "/avatar.png" },
      ...filteredUsers
        .filter((user) => !user._id.equals(botUser._id))
        .map((user) => ({ ...user.toObject(), isBot: false })),
    ];

    res.status(200).json(sidebarUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const botUser = await ensureTagBotUser();
    const isBotConversation = receiverId.toString() === botUser._id.toString();

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);

    // A bot response can take several seconds to generate.  Send the user's
    // message back immediately, then publish the reply over Socket.IO when it
    // is ready so the open chat updates without a page refresh.
    if (isBotConversation) {
      void (async () => {
        try {
          const botReplyText = await generateBotReply(text || "Hello!");
          const botReply = await Message.create({
            senderId: botUser._id,
            receiverId: senderId,
            text: botReplyText,
          });

          const senderSocketId = getReceiverSocketId(senderId.toString());
          if (senderSocketId) {
            io.to(senderSocketId).emit("newMessage", botReply);
          }
        } catch (botError) {
          console.error("Error sending Tag Bot reply:", botError.message);
        }
      })();
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
