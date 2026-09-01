import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const chat = async (req, res) => {
  try {
    const message = req.body.message;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    const outputText =
      response?.text ||
      response?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("") ||
      "No response from Gemini";

    res.json({ message: outputText });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ message: "Gemini request failed" });
  }
};



