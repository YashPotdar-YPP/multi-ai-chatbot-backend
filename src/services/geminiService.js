import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/index.js';

// Initialize Gemini client directly if you want, but the handler creates models
const genAI = new GoogleGenerativeAI(config.google.apiKey);

export async function handleGemini(message, conversationHistory) {
    try {
        // Use the latest Gemini 1.5 Flash model (stable, fast and efficient)
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash'
        });

        // Build conversation history for Gemini
        const chat = model.startChat({
            history: conversationHistory.map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            })),
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini Error:', error);

        // If gemini-2.5-flash fails, try gemini-2.0-flash as fallback
        if (error.message.includes('not found') || error.message.includes('404')) {
            console.log('Trying fallback model: gemini-2.0-flash');
            try {
                const fallbackModel = genAI.getGenerativeModel({
                    model: 'gemini-2.0-flash'
                });

                const chat = fallbackModel.startChat({
                    history: conversationHistory.map((msg) => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: msg.content }],
                    })),
                    generationConfig: {
                        maxOutputTokens: 1000,
                        temperature: 0.7,
                    },
                });

                const result = await chat.sendMessage(message);
                const response = await result.response;
                return response.text();
            } catch (fallbackError) {
                throw new Error(`Gemini API Error: ${fallbackError.message}`);
            }
        }

        throw new Error(`Gemini API Error: ${error.message}`);
    }
}
