import { GoogleGenAI } from "@google/genai";

export const generateVideoSummary = async (videoTitle: string, author: string): Promise<string> => {
  // NOTE: In a real app, this would use the video transcript or subtitles.
  // Here we simulate it by asking Gemini to hallucinate a summary based on the title.
  
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set the API_KEY environment variable to use AI features.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a short, engaging, and funny summary (under 100 words) for a hypothetical video titled "${videoTitle}" by the creator "${author}". The summary should sound like a Bilibili video description.`,
    });
    
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate summary. Please try again later.";
  }
};