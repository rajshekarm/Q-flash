import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const processQuery = async (userMessage, history) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo", // High intelligence for complex support
        messages: [
            { 
                role: "system", 
                content: "You are Q-Flash, a high-performance AI assistant. Your goal is to provide concise, accurate, and rapid responses." 
            },
            ...history,
            { role: "user", content: userMessage }
        ],
        temperature: 0.7,
    });

    return response.choices[0].message.content;
};