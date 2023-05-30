document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarizeBtn");
  const selectedText = document.getElementById("selectedText");
  const summary = document.getElementById("generatedText");

  summarizeBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "summarize" },
        (response) => {
          summary.textContent = response.summary;
        }
      );
    });
  });

  chrome.tabs.executeScript({ file: "content.js" });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateSelectedText") {
      selectedText.value = request.selectedText;
    }
  });
});
