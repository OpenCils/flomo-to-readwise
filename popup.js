function updateStatus(step, status) {
  const statusElement = document.getElementById(step + 'Status');
  statusElement.className = 'status-indicator status-' + status;
}

document.getElementById('syncButton').addEventListener('click', function() {
  // Reset all statuses to waiting
  ['flomo', 'process', 'readwise'].forEach(step => updateStatus(step, 'waiting'));
  document.getElementById('errorMessage').textContent = '';

  chrome.runtime.sendMessage({action: "syncNow"}, function(response) {
    if (response.success) {
      document.getElementById('lastSync').textContent = 'Last sync: ' + new Date().toLocaleString();
    } else {
      document.getElementById('errorMessage').textContent = response.message;
    }
  });
});

document.getElementById('openOptions').addEventListener('click', function() {
  chrome.runtime.openOptionsPage();
});

// Load last sync time
chrome.storage.sync.get('lastSyncTime', function(data) {
  if (data.lastSyncTime) {
    document.getElementById('lastSync').textContent = 'Last sync: ' + new Date(data.lastSyncTime).toLocaleString();
  }
});

// Listen for status updates from background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "updateStatus") {
    updateStatus(request.step, request.status);
  }
});
