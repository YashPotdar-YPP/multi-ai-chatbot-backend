import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/index.js';

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: config.anthropic.apiKey,
});

export async function handleClaude(message, conversationHistory) {
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

        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            messages: messages,
        });

        return response.content[0].text;
    } catch (error) {
        console.error('Claude Error:', error);
        throw new Error(`Claude API Error: ${error.message}`);
    }
}
