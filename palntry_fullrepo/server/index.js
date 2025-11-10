// PalNtry server: proxies chat messages to OpenAI
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. Chat will fail until you set this in server/.env');
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Missing message' });

    const prompt = `You are PalNtry assistant. Reply to the user's message in about 200 words, friendly and practical.\nUser: ${message}\nAssistant:`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500
    });

    const text = completion.choices?.[0]?.message?.content || '';
    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI request failed', detail: String(err) });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log('PalNtry server listening on', port));
