const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

async function summarizeText(text) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${API_KEY}`,
//     },
//     body: JSON.stringify({
//       prompt: text,
//       max_tokens: 50,
//     }),
//   });
//   const data = await response.json();
  const data = { choices: [{ text: "lorem ipsum" }] };
  return data.choices[0].text.trim();
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "summarize") {
    const selectedText = request.selectedText;
    if (selectedText.length > 0) {
      try {
        const summary = await summarizeText(selectedText);
        sendResponse({ summary: summary });
      } catch (error) {
        sendResponse({ error: error.message });
      }
    } else {
      sendResponse({ error: "No text selected." });
    }
    return true;
  }
});
