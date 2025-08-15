const toggleBtn = document.getElementById('toggleBtn');

// Estilos mejorados con animación y transición
Object.assign(toggleBtn.style, {
  padding: '12px 28px',
  background: 'linear-gradient(90deg, #ff5858 0%, #ff0000 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontSize: '17px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
  transition: 'background 0.3s, transform 0.2s',
});

// Hover y efecto de pulsación
toggleBtn.addEventListener('mouseover', () => {
  toggleBtn.style.transform = 'scale(1.05)';
  toggleBtn.style.background = 'linear-gradient(90deg, #ff7878 0%, #ff2a2a 100%)';
});
toggleBtn.addEventListener('mouseout', () => {
  toggleBtn.style.transform = 'scale(1)';
  toggleBtn.style.background = 'linear-gradient(90deg, #ff5858 0%, #ff0000 100%)';
});

//Cargar estado actual desde storage y actualizar visual
function updateBtn(isEnabled) {
  // Si está activado (ocultando Shorts), el botón debe ofrecer desactivar (mostrar Shorts)
  toggleBtn.textContent = isEnabled ? 'Mostrar Shorts' : 'Ocultar Shorts';
  toggleBtn.style.opacity = isEnabled ? '1' : '0.85';
  toggleBtn.style.boxShadow = isEnabled
    ? '0 4px 16px rgba(255,0,0,0.25)'
    : '0 2px 8px rgba(0,0,0,0.10)';
}

chrome.storage.sync.get('hideShortsEnabled', (data) => {
  const isEnabled = data.hideShortsEnabled ?? false;
  updateBtn(isEnabled);
});

toggleBtn.addEventListener('click', () => {
  chrome.storage.sync.get('hideShortsEnabled', (data) => {
    const newValue = !data.hideShortsEnabled;
    chrome.storage.sync.set({ hideShortsEnabled: newValue }, () => {
      updateBtn(newValue);

      // Feedback visual breve
      toggleBtn.style.transform = 'scale(0.97)';
      setTimeout(() => {
        toggleBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
          toggleBtn.style.transform = 'scale(1)';
        }, 120);
      }, 120);

      // Recarga solo si está en YouTube
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.id && tab.url.includes("youtube.com")) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  });
});