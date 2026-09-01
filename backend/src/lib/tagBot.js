import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../models/user.model.js";

dotenv.config();

const BOT_EMAIL = "tagbot@chatapp.local";
const BOT_NAME = "Tag Bot";
const GEMINI_TIMEOUT_MS = 8_000;
const FALLBACK_REPLY = "Hi! I'm Tag Bot. I'm here to help with quick chat replies.";

export async function ensureTagBotUser() {
  let botUser = await User.findOne({ email: BOT_EMAIL });

  if (!botUser) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("tagbot123", salt);

    botUser = await User.create({
      fullName: BOT_NAME,
      email: BOT_EMAIL,
      password: hashedPassword,
      profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    });
  }

  return botUser;
}

export async function generateBotReply(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "demo" || apiKey === "your_gemini_api_key") {
    return "Hi! I’m Tag Bot. I can help with quick replies, brainstorming, and friendly chat support.";
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey });

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `You are Tag Bot, a friendly assistant inside a chat app. Keep answers short, helpful, and conversational. User says: ${prompt}`,
      }),
      new Promise((resolve) => setTimeout(() => resolve(null), GEMINI_TIMEOUT_MS)),
    ]);

    if (!response) return FALLBACK_REPLY;

    const text =
      response?.text ||
      response?.output?.text ||
      response?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ||
      "Hi! I’m Tag Bot. How can I help?";

    return String(text).trim() || "Hi! I’m Tag Bot. How can I help?";
  } catch (error) {
    console.error("Gemini bot error:", error);
    return "Hi! I’m Tag Bot. I’m here to help with quick chat replies.";
  }
}
