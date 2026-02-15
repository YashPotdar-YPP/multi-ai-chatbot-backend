import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import chatRoutes from './routes/chatRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Multi-AI Backend is running' });
});

// Start server
app.listen(config.port, () => {
    console.log(`🚀 Multi-AI Backend server is running on port ${config.port}`);
    console.log(`📡 Health check: http://localhost:${config.port}/health`);
    console.log(`💬 Chat endpoint: http://localhost:${config.port}/api/chat`);

    // Check API keys
    console.log('\n🔑 API Keys Status:');
    console.log(`   OpenAI: ${config.openai.apiKey ? '✅ Configured' : '❌ Missing'}`);
    console.log(`   Anthropic: ${config.anthropic.apiKey ? '✅ Configured' : '❌ Missing'}`);
    console.log(`   Google: ${config.google.apiKey ? '✅ Configured' : '❌ Missing'}`);
    console.log('\n📌 Using Gemini 2.5 Flash (latest model)');
});