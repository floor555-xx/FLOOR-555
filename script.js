// script.js
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('artistGallery');
  const modal = document.getElementById('artistModal');
  const modalPanel = modal.querySelector('.modal-panel');
  const modalTitle = document.getElementById('modalTitle');
  const modalBio = document.getElementById('modalBio');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.getElementById('closeModal');

  // Helper: abrir modal con datos + animación de entrada
  function openModal({ name, bio, imgSrc, imgAlt }) {
    modalTitle.textContent = name;
    modalBio.textContent = bio;
    modalImg.src = imgSrc || '';
    modalImg.alt = imgAlt || name;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    closeBtn.focus();

    // ✨ Efecto de entrada (fade in + slide up)
    modalPanel.style.opacity = 0;
    modalPanel.style.transform = 'translateY(30px)';
    requestAnimationFrame(() => {
      modalPanel.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      modalPanel.style.opacity = 1;
      modalPanel.style.transform = 'translateY(0)';
    });
  }

  // Helper: cerrar modal + animación de salida
  function closeModal() {
    // ✨ Efecto de salida (fade out + slide down)
    modalPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    modalPanel.style.opacity = 0;
    modalPanel.style.transform = 'translateY(30px)';
    setTimeout(() => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }, 300);
  }

  // click en cualquier tarjeta
  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.artist-card');
    if (!card) return;
    const name = card.dataset.name || 'Artista';
    const bio = card.dataset.bio || 'Biografía no disponible.';
    const img = card.dataset.img || '';
    openModal({ name, bio, imgSrc: img, imgAlt: name });
  });

  // teclado: Enter o Space para activar tarjetas con foco
  gallery.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.artist-card');
      if (!card) return;
      e.preventDefault();
      const name = card.dataset.name || 'Artista';
      const bio = card.dataset.bio || 'Biografía no disponible.';
      const img = card.dataset.img || '';
      openModal({ name, bio, imgSrc: img, imgAlt: name });
    }
  });

  // cerrar al pulsar el botón
  closeBtn.addEventListener('click', closeModal);

  // cerrar al hacer click fuera del panel (en el backdrop)
  modal.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  // cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Evitar que click dentro del panel cierre el modal
  modalPanel.addEventListener('click', (e) => e.stopPropagation());
});
