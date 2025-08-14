document.addEventListener('DOMContentLoaded', function() {
  const solveFlashBtn = document.getElementById('solveFlashBtn');
  const solveProBtn = document.getElementById('solveProBtn');
  const statusDiv = document.getElementById('status');

  const sendMessageToBackground = (model) => {
    statusDiv.textContent = 'Solving...';
    statusDiv.className = ''; // Reset class
    solveFlashBtn.disabled = true;
    solveProBtn.disabled = true;

    chrome.runtime.sendMessage({ action: "solveQuiz", model: model }, (response) => {
      if (chrome.runtime.lastError) {
        statusDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
        statusDiv.className = 'status-error';
      } else if (response) {
        statusDiv.textContent = response.status;
        statusDiv.className = response.success ? 'status-success' : 'status-error';
      } else {
        statusDiv.textContent = 'No response from background.';
        statusDiv.className = 'status-error';
      }
      solveFlashBtn.disabled = false;
      solveProBtn.disabled = false;
    });
  };

  solveFlashBtn.addEventListener('click', () => sendMessageToBackground('flash'));
  solveProBtn.addEventListener('click', () => sendMessageToBackground('pro'));
});