document.addEventListener("mouseup", function () {
  var selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    chrome.runtime.sendMessage({
      action: "updateSelectedText",
      selectedText: selectedText,
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "summarize") {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      // Call OpenAI API to summarize the selected text
      // Replace YOUR_OPENAI_API_KEY with your actual OpenAI API key
      fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          prompt: selectedText,
          max_tokens: 50,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          var summary = data.choices[0].text.trim();
          sendResponse({ summary: summary });
        })
        .catch((error) => console.error(error));
    } else {
      sendResponse({ summary: "No text selected." });
    }
  }
  return true;
});