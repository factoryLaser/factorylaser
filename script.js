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
  let rotacionDrag = 0;      // rotación por drag
  let invertido = false;     // estado invertir

  textoCircularEl.style.cursor = 'grab';

  // ===== DRAG DESKTOP =====
  textoCircularEl.addEventListener('mousedown', e => {
    arrastrando = true;
    inicioX = e.clientX;
    textoCircularEl.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!arrastrando) return;
    const delta = e.clientX - inicioX;
    rotacionDrag += delta * 0.4;
    actualizarTransform();
    inicioX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    arrastrando = false;
    textoCircularEl.style.cursor = 'grab';
  });

  // ===== DRAG MOBILE =====
  textoCircularEl.addEventListener('touchstart', e => {
    arrastrando = true;
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchmove', e => {
    if (!arrastrando) return;
    const delta = e.touches[0].clientX - inicioX;
    rotacionDrag += delta * 0.4;
    actualizarTransform();
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', () => {
    arrastrando = false;
  });

  // ===== BOTON INVERTIR =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;
    actualizarTransform();
  });

  // ===== FUNCION CENTRAL DE TRANSFORM =====
  function actualizarTransform() {
    // Rotación final = drag + 180° si invertido
    const rotFinal = rotacionDrag + (invertido ? 180 : 0);

    // Aplicamos rotación sobre el centro de la virola
    textoCircularEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);

    // Aseguramos que el textoPath siga centrado
    textoPreview.setAttribute('startOffset', '50%');
    textoPreview.setAttribute('text-anchor', 'middle');
  }
});
