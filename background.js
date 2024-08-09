function updatePopupStatus(step, status) {
  chrome.runtime.sendMessage({action: "updateStatus", step: step, status: status});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "syncNow") {
    syncFlomoToReadwise().then(function(result) {
      sendResponse(result);
    });
    return true;  // Will respond asynchronously
  }
});

async function syncFlomoToReadwise() {
  // Check if API keys are set
  const data = await chrome.storage.sync.get(['flomoApi', 'readwiseApi']);
  if (!data.flomoApi || !data.readwiseApi) {
    return {success: false, message: "Please set API keys in the options page."};
  }

  try {
    // Fetch data from Flomo
    updatePopupStatus('flomo', 'in-progress');
    const flomoData = await fetchFromFlomo(data.flomoApi);
    updatePopupStatus('flomo', 'success');
    
    // Process data
    updatePopupStatus('process', 'in-progress');
    const processedData = processData(flomoData);
    updatePopupStatus('process', 'success');

    // Send data to Readwise
    updatePopupStatus('readwise', 'in-progress');
    await sendToReadwise(processedData, data.readwiseApi);
    updatePopupStatus('readwise', 'success');

    // Update last sync time
    const now = Date.now();
    await chrome.storage.sync.set({lastSyncTime: now});

    return {success: true, message: "Sync completed successfully!"};
  } catch (error) {
    console.error('Sync error:', error);
    return {success: false, message: "Sync failed. Check console for details."};
  }
}

async function fetchFromFlomo(apiKey) {
  // Implement Flomo API call here
  // This is a placeholder and needs to be implemented based on Flomo's API
  return [];
}

function processData(data) {
  // Process the data from Flomo to match Readwise's format
  // This is a placeholder and needs to be implemented based on your requirements
  return data;
}

async function sendToReadwise(data, apiKey) {
  // Implement Readwise API call here
  // This is a placeholder and needs to be implemented based on Readwise's API
}
