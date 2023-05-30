const API_KEY = "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";

function summarizeText(text) {
  return fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      prompt: text,
      max_tokens: 50,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const summary = data.choices[0].text.trim();
      return summary;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw new Error("An error occurred while summarizing the text.");
    });
}

function injectContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["content.mjs"],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener((tab) => {
    injectContentScript(tab.id);
  });
});

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
