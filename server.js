import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Load API key from Render's environment variables
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rewrite endpoint
app.post("/rewrite", async (req, res) => {
  const { text, tone } = req.body;

  try {
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `Rewrite the text in a ${tone} tone.` },
        { role: "user", content: text }
      ]
    });

    res.json({ output: result.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// IMPORTANT: Use Render’s assigned port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
