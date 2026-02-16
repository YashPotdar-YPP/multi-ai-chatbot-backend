import OpenAI from 'openai';
import { config } from '../config/index.js';
import { handleGemini } from './geminiService.js';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: config.openai.apiKey,
});

export async function handleOpenAI(message, conversationHistory) {
    try {
        // Build messages array from conversation history
        const messages = conversationHistory.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
        }));

        // Add the new user message
        messages.push({
            role: 'user',
            content: message,
        });

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-5-nano',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
            });

            return completion.choices[0].message.content;
        } catch (error) {
            if (error.status === 404 || error.code === 'model_not_found') {
                console.log('GPT-5 not available, falling back to GPT-4...');
                const fallbackCompletion = await openai.chat.completions.create({
                    model: 'gpt-4',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000,
                });
                return fallbackCompletion.choices[0].message.content;
            }

            if (error.status === 429 || error.code === 'insufficient_quota') {
                console.warn('OpenAI quota exceeded, falling back to Gemini...');
                return await handleGemini(message, conversationHistory);
            }

            throw error;
        }
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error(`OpenAI API Error: ${error.message}`);
    }
}
