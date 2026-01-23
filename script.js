document.addEventListener('DOMContentLoaded', () => {
  const textoInput = document.getElementById('textoInput');
  const textoPreview = document.getElementById('textoPreview');
  const textoCircularEl = document.getElementById('textoCircularEl');
  const invertirBtn = document.getElementById('invertirBtn');
  const toggleBorde = document.getElementById('toggleBorde');

  // ===== TEXTO EN TIEMPO REAL =====
  textoInput.addEventListener('input', () => {
    textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
  });

  // ===== ESTADO =====
  let arrastrando = false;
  let inicioX = 0;
  let rotacionDrag = 0;
  let invertido = false;
  let bordeExterior = true; // por defecto exterior

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

  // ===== TOGGLE BORDE =====
  toggleBorde.addEventListener('change', () => {
    bordeExterior = toggleBorde.checked;
    actualizarTransform();
  });

  // ===== FUNCION CENTRAL DE TRANSFORM =====
  function actualizarTransform() {
    // Drag se aplica como rotate normal
    const rotFinal = rotacionDrag;

    textoCircularEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);

    // Cambiamos el path según invertido y borde
    if (bordeExterior) {
      textoPreview.setAttribute('href', invertido ? '#textoCircularInterior' : '#textoCircularExterior');
    } else {
      textoPreview.setAttribute('href', invertido ? '#textoCircularExterior' : '#textoCircularInterior');
    }

    // Siempre centrado
    textoPreview.setAttribute('startOffset', '50%');
    textoPreview.setAttribute('text-anchor', 'middle');
  }
});
