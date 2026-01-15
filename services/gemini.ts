
import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

export const getSmartSuggestions = async (cartItems: CartItem[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const itemsList = cartItems.map(item => `${item.name} (${item.quantity}x)`).join(", ");
    
    const prompt = `I am using a grocery app. I currently have the following in my cart: ${itemsList || 'nothing'}. 
    Please suggest 2-3 other items that would complement what I'm buying (e.g., if I have bread, suggest butter or jam). 
    Also, briefly give a small tip or recipe idea based on these items. Keep it under 60 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Fresh fruit and dairy go great together!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Try our fresh bakery section for artisan breads!";
  }
};
