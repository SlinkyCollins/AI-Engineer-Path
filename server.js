import express from "express";

const app = express();
app.use(express.json());

app.post("/api/gift", (req, res) => {
  const { userPrompt } = req.body
  const { examplePrompts } = req.body
  console.log(userPrompt)
  console.log(examplePrompts)

  res.json({ message: `You wished for: "${userPrompt}". Example prompts were: ${examplePrompts.join(", ")}` });
  res.end();
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
