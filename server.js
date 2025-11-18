import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "apiKey: process.env.OPENAI_API_KEY
"
});

app.post("/rewrite", async (req, res) => {
  const { text, tone } = req.body;

  try {
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Rewrite the text in a " + tone + " tone." },
        { role: "user", content: text }
      ]
    });

    res.json({ output: result.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
