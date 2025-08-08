const toggleBtn = document.getElementById('toggleBtn');

// Estiliza el botón
Object.assign(toggleBtn.style, {
  padding: '10px 20px',
  backgroundColor: '#ff0000',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
});

// Cargar estado actual desde storage
chrome.storage.sync.get('hideShortsEnabled', (data) => {
  const isEnabled = data.hideShortsEnabled ?? false;
  toggleBtn.textContent = isEnabled ? 'Desactivar' : 'Activar';
});

toggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get('hideShortsEnabled', (data) => {
    const newValue = !data.hideShortsEnabled;
    chrome.storage.sync.set({ hideShortsEnabled: newValue }, () => {
      toggleBtn.textContent = newValue ? 'Desactivar' : 'Activar';

      // Recargar solo si estás en una pestaña válida
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.id && tab.url.includes("youtube.com")) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  });
});
