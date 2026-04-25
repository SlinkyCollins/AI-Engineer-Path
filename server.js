import express from "express";

const app = express();
app.use(express.json());

app.post("/api/gift", (req, res) => {
  const { userPrompt } = req.body
  console.log(userPrompt)

  res.json({ message: `You wished for: "${userPrompt}"` });
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
