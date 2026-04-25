import { autoResizeTextarea, setLoading } from "/shared/utils.js";

// Get UI elements
const giftForm = document.getElementById("gift-form");
const userInput = document.getElementById("user-input");
const outputContent = document.getElementById("output-content");

function start() {
  userInput.addEventListener("input", () => autoResizeTextarea(userInput));
  giftForm.addEventListener("submit", handleGiftRequest);
}

async function handleGiftRequest(e) {
  e.preventDefault();

  const userPrompt = userInput.value.trim();
  const examplePrompts = [
    "A thoughtful gift for a book lover",
    "A unique present for a tech enthusiast",
    "A creative gift for a friend who loves cooking",
    "A relaxing spa day for a stressed-out friend"
  ];
  if (!userPrompt) return;

  setLoading(true);

  try {

    const response = await fetch('/api/gift', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userPrompt, examplePrompts })
    })

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Request failed (${response.status}): ${text || response.statusText}`);
    }

    const data = await response.json()

    outputContent.textContent = data.message ?? "No message returned.";
  } catch (error) {
    console.error(error);
    outputContent.textContent = "Something went wrong. Check the console.";
  } finally {
    setLoading(false);
  }
}

start();
