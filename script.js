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

  // ===== INVERTIR TEXTO (180° REAL, INSTANTÁNEO) =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;

    // ROTACIÓN REAL SOBRE EL CENTRO DEL CÍRCULO
    const rotacionFinal = invertido ? rotacion + 180 : rotacion;
    textoCircularEl.setAttribute('transform', `rotate(${rotacionFinal} 210 210)`);
  });

  // ===== APLICAR TRANSFORMACIONES =====
  function aplicarTransformaciones() {
    const rotacionFinal = invertido ? rotacion + 180 : rotacion;
    textoCircularEl.setAttribute('transform', `rotate(${rotacionFinal} 210 210)`);
  }
});
