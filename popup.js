document.addEventListener("DOMContentLoaded", function () {
  var summarizeBtn = document.getElementById("summarizeBtn");
  var selectedText = document.getElementById("selectedText");
  var summary = document.getElementById("summary");

  summarizeBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "summarize" },
        function (response) {
          summary.textContent = response.summary;
        }
      );
    });
  });

  chrome.tabs.executeScript({ file: "content.js" });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "updateSelectedText") {
      selectedText.value = request.selectedText;
    }
  });
});
