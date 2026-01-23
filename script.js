document.addEventListener('DOMContentLoaded', () => {
  const textoInput = document.getElementById('textoInput');
  const textoPreview = document.getElementById('textoPreview');
  const textoCircularGroup = document.getElementById('textoCircularGroup');
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
  textoCircularGroup.style.cursor = 'grab';

  // ===== DRAG DESKTOP =====
  textoCircularGroup.addEventListener('mousedown', e => {
    arrastrando = true;
    inicioX = e.clientX;
    textoCircularGroup.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!arrastrando) return;
    const delta = e.clientX - inicioX;
    rotacion += delta * 0.4;
    actualizarTransform();
    inicioX = e.clientX;
  });

  document.addEventListener('mouseup', () => {
    arrastrando = false;
    textoCircularGroup.style.cursor = 'grab';
  });

  // ===== DRAG MOBILE =====
  textoCircularGroup.addEventListener('touchstart', e => {
    arrastrando = true;
    inicioX = e.touches[0].clientX;
  });

  document.addEventListener('touchmove', e => {
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
    const rotFinal = rotacion + (invertido ? 180 : 0);
    textoCircularGroup.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
    // asegura que el textoPath siempre esté centrado
    textoPreview.setAttribute('startOffset', '50%');
    textoPreview.setAttribute('text-anchor', 'middle');
  }
});
