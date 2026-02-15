# Multi-AI Backend

Backend server for the Multi-AI chatbot application with real API integrations.

## Supported AI Models

- **OpenAI GPT-4** - Advanced language model from OpenAI
- **Anthropic Claude** - Claude 3.5 Sonnet model
- **Google Gemini** - Gemini Pro model

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure API Keys

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Then edit the `.env` file and add your API keys:

```env
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=AIza...
PORT=3001
```

### 3. Get API Keys

#### OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key

#### Anthropic API Key

1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key

#### Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key

### 4. Run the Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check

```
GET /health
```

### Chat

```
POST /api/chat
```

**Request Body:**

```json
{
  "message": "Your message here",
  "model": "gpt" | "claude" | "gemini",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "model": "gpt",
  "response": "AI response here",
  "timestamp": "2026-02-15T07:22:28.000Z"
}
```

## Error Handling

The API returns appropriate error messages if:

- API keys are missing or invalid
- Message is empty
- Model is not specified or invalid
- API rate limits are exceeded

## Notes

- Keep your API keys secure and never commit them to version control
- Monitor your API usage to avoid unexpected charges
- Each AI provider has different pricing and rate limits
