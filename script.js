document.addEventListener('DOMContentLoaded', () => {
  const textoInput = document.getElementById('textoInput');
  const textoPreview = document.getElementById('textoPreview');
  const textoCircularEl = document.getElementById('textoCircularEl');
  const invertirBtn = document.getElementById('invertirBtn');

  // ===== TEXTO EN TIEMPO REAL =====
  textoInput.addEventListener('input', () => {
    textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
  });

  // ===== ESTADO =====
  let arrastrando = false;
  let inicioX = 0;
  let rotacion = 0;     
  let invertido = false; 

  // cursor
  textoCircularEl.style.cursor = 'grab';

  // ===== DESKTOP DRAG =====
  textoCircularEl.addEventListener('mousedown', (e) => {
    arrastrando = true;
    inicioX = e.clientX;
    textoCircularEl.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!arrastrando) return;
    const delta = e.clientX - inicioX;
    rotacion += delta * 0.4;
    aplicarTransformaciones();
    inicioX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    arrastrando = false;
    textoCircularEl.style.cursor = 'grab';
  });

  // ===== MOBILE DRAG =====
  textoCircularEl.addEventListener('touchstart', (e) => {
    arrastrando = true;
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchmove', (e) => {
    if (!arrastrando) return;
    const delta = e.touches[0].clientX - inicioX;
    rotacion += delta * 0.4;
    aplicarTransformaciones();
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', () => {
    arrastrando = false;
  });

  // ===== INVERTIR TEXTO REAL =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;

    if (invertido) {
      // Centrado y de cabeza
      textoPreview.setAttribute('startOffset', '50%');
      textoPreview.setAttribute('text-anchor', 'middle');
      textoCircularEl.setAttribute('transform', `rotate(${rotacion + 180} 210 210) scale(-1,1)`);
    } else {
      // Normal
      textoPreview.setAttribute('startOffset', '50%');
      textoPreview.setAttribute('text-anchor', 'middle');
      textoCircularEl.setAttribute('transform', `rotate(${rotacion} 210 210) scale(1,1)`);
    }
  });

  // ===== APLICAR TRANSFORMACIONES =====
  function aplicarTransformaciones() {
    // Solo se aplica rotación por drag, invertido se maneja en el click
    if (!invertido) {
      textoCircularEl.setAttribute('transform', `rotate(${rotacion} 210 210) scale(1,1)`);
    } else {
      textoCircularEl.setAttribute('transform', `rotate(${rotacion + 180} 210 210) scale(-1,1)`);
    }
  }
});

