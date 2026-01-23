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
  let rotacion = 0;     // rotación acumulada por drag
  let invertido = false; // estado del botón invertir

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
    rotacion += delta * 0.4; // sensibilidad del drag

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

  // ===== BOTÓN INVERTIR TEXTO =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;
    aplicarTransformaciones(); // aplicamos 180° sobre la rotación acumulada
  });

  // ===== FUNCION QUE APLICA ROTACIÓN =====
  function aplicarTransformaciones() {
    // Solo sumamos 180° si invertido
    const rotFinal = rotacion + (invertido ? 180 : 0);
    textoCircularEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
  }
});
