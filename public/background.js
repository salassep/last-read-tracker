chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.url.endsWith('.pdf')) {
    // const isLocalFile = details.url.startsWith('file://');
    const newUrl = chrome.runtime.getURL('src/index.html') + '?url=' + encodeURIComponent(details.url);
    chrome.tabs.update(details.tabId, { url: newUrl });
  }
}, { url: [{ urlMatches: 'https?://.*\\.pdf' }, { urlMatches: 'file://.*\\.pdf' }] });
