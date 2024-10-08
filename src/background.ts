chrome.runtime.onMessage.addListener((message) => {
  console.log(`Received message: ${message}`);
  if (message.page) {
    chrome.storage.local.set({ lastPage: message.page }, () => {
      console.log(`Last read page saved: ${message.page}`);
    });
  }
});
