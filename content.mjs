const selectedText = window.getSelection().toString().trim();

chrome.runtime.sendMessage(
  { action: "summarize", selectedText: selectedText },
  (response) => {
    if (response && response.summary) {
      console.log("Summary:", response.summary);
      // Do something with the summary, such as displaying it in a tooltip or popup
    } else if (response && response.error) {
      console.error("Error:", response.error);
    }
  }
);
