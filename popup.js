document.getElementById('syncButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: "syncNow"}, (response) => {
    if (response.success) {
      document.getElementById('lastSync').textContent = `Last sync: ${new Date().toLocaleString()}`;
    } else {
      alert('Sync failed. Please check your settings.');
    }
  });
});

// Load last sync time when popup opens
chrome.storage.sync.get('lastSyncTime', (data) => {
  if (data.lastSyncTime) {
    document.getElementById('lastSync').textContent = `Last sync: ${new Date(data.lastSyncTime).toLocaleString()}`;
  }
});
