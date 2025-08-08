function hideShorts() {
  const shortLinks = Array.from(document.querySelectorAll('a'))
    .filter(link => link.href.includes('/shorts/'));

  shortLinks.forEach(link => {
    const container = link.closest('ytd-rich-item-renderer') || link.closest('ytd-grid-video-renderer');
    if (container) {
      container.style.display = 'none';
    }
  });
}

// Control desde el papup mish
chrome.storage.sync.get('hideShortsEnabled', (data) => {
  if (data.hideShortsEnabled) {
    hideShorts();
    // También en mutaciones nuevas
    const observer = new MutationObserver(hideShorts);
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

function hideShortsSidebarButton() {
  const sidebarItems = document.querySelectorAll('ytd-guide-entry-renderer');

  sidebarItems.forEach((item) => {
    const text = item.innerText.toLowerCase();
    if (text.includes('shorts')) {
      item.style.display = 'none';
    }
  });
}
