import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    openai: {
        apiKey: process.env.OPENAI_API_KEY,
    },
    anthropic: {
        apiKey: process.env.ANTHROPIC_API_KEY,
    },
    google: {
        apiKey: process.env.GOOGLE_API_KEY,
    }
};
