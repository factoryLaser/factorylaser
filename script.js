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
    actualizarTransform();
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
    actualizarTransform();
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', () => {
    arrastrando = false;
  });

  // ===== INVERTIR TEXTO =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;
    actualizarTransform();
  });

  // ===== FUNCION CENTRAL DE TRANSFORM =====
  function actualizarTransform() {
    // Calculamos la rotación final
    const rotFinal = rotacion + (invertido ? 180 : 0);

    // Siempre forzamos que el textoPath se re-renderice
    // Esto evita que desaparezca en algunos navegadores
    textoCircularEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);

    // Aseguramos que el textoPath siga centrado
    textoPreview.setAttribute('startOffset', '50%');
    textoPreview.setAttribute('text-anchor', 'middle');
  }
});
