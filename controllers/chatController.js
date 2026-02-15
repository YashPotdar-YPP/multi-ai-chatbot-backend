import { handleOpenAI } from '../services/openaiService.js';
import { handleClaude } from '../services/anthropicService.js';
import { handleGemini } from '../services/geminiService.js';

export const processChatRequest = async (req, res) => {
    try {
        const { message, model, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!model) {
            return res.status(400).json({ error: 'Model selection is required' });
        }

        let response;

        switch (model.toLowerCase()) {
            case 'gpt':
            case 'gpt-4':
                response = await handleOpenAI(message, conversationHistory);
                break;

            case 'claude':
                response = await handleClaude(message, conversationHistory);
                break;

            case 'gemini':
                response = await handleGemini(message, conversationHistory);
                break;

            default:
                return res.status(400).json({ error: 'Invalid model selection' });
        }

        res.json({
            success: true,
            model: model,
            response: response,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error processing chat request:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'An error occurred while processing your request',
        });
    }
};
