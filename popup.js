document.addEventListener("DOMContentLoaded", () => {
  const summarizeBtn = document.getElementById("summarizeBtn");
  const selectedText = document.getElementById("selectedText");
  const summary = document.getElementById("generatedText");
  const downloadBtn = document.getElementById("downloadBtn");

  summarizeBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "summarize" },
        response => {
          if (response.summary) {
            summary.textContent = response.summary;
          }
        }
      );
    });
  });

  downloadBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(summary.textContent)
      .then(() => console.log("Text copied to clipboard"));
  });

  document.addEventListener("mouseup", () => {
    const text = window.getSelection().toString().trim();
    if (text.length > 0) {
      selectedText.value = text;
    }
  });
});
