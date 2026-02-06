import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const processQuery = async (userMessage, history) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: "You are a helpful customer support agent for a Fashion AI startup." },
      ...history,
      { role: "user", content: userMessage }
    ],
  });

  return response.choices[0].message.content;
};