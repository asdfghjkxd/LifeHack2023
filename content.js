console.log("content script loaded");

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({
      action: "updateSelectedText",
      selectedText,
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      // Call OpenAI API to summarize the selected text
      // Replace YOUR_OPENAI_API_KEY with your actual OpenAI API key
      
      // TODO: use environment variable and hide this API key
      // or, create an API endpoint, put the API key there, and send requests
      // to this API endpoint
      // fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization:
      //       "Bearer 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",
      //   },
      //   body: JSON.stringify({
      //     prompt: "Sumarize this paragraph: " + selectedText,
      //     max_tokens: Math.round(selectedText.length * 12 / 10),
      //   }),
      // })
      Promise
        .resolve({ choices: [{ text: "lorem ipsum" }] })
        // .then((response) => response.json())
        .then((data) => {
          const summary = data.choices[0].text.trim();
          sendResponse({ summary });
        })
        .catch((error) => {
          console.error(error);
          sendResponse({ summary: "Something went wrong." });
        });
    } else {
      sendResponse({ summary: "No text selected." });
    }
  }
  return true;
});
