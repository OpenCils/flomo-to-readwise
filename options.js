document.getElementById('saveButton').addEventListener('click', () => {
  const readwiseToken = document.getElementById('readwiseToken').value;
  chrome.storage.sync.set({readwiseToken: readwiseToken}, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
});

// Load saved token when options page opens
chrome.storage.sync.get('readwiseToken', (data) => {
  if (data.readwiseToken) {
    document.getElementById('readwiseToken').value = data.readwiseToken;
  }
});
