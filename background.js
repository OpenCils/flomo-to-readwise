chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('periodicSync', { periodInMinutes: 60 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'periodicSync') {
    syncFlomoToReadwise();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "syncNow") {
    syncFlomoToReadwise().then(() => {
      sendResponse({success: true});
    }).catch(() => {
      sendResponse({success: false});
    });
    return true;  // Indicates we will send a response asynchronously
  }
});

async function syncFlomoToReadwise() {
  // TODO: Implement the actual sync logic here
  console.log('Syncing Flomo to Readwise...');
  
  // For now, just update the last sync time
  const now = Date.now();
  await chrome.storage.sync.set({lastSyncTime: now});
}
