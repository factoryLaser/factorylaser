const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');
const textoCircularEl = document.getElementById('textoCircularEl');
const invertirBtn = document.getElementById('invertirBtn');

// ===== TEXTO EN TIEMPO REAL =====
textoInput.addEventListener('input', () => {
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});

// ===== ROTACIÓN POR ARRASTRE (DESKTOP + MOBILE) =====
let arrastrando = false;
let inicioX = 0;
let rotacion = 0;
let invertido = false;

textoCircularEl.style.cursor = 'grab';

// Desktop
textoCircularEl.addEventListener('mousedown', e => {
  arrastrando = true;
  inicioX = e.clientX;
  textoCircularEl.style.cursor = 'grabbing';
  e.preventDefault();
});

document.addEventListener('mousemove', e => {
  if (!arrastrando) return;
  rotacion += (e.clientX - inicioX) * 0.4;
  aplicarTransformacion();
  inicioX = e.clientX;
});

document.addEventListener('mouseup', () => {
  arrastrando = false;
  textoCircularEl.style.cursor = 'grab';
});

// Mobile
textoCircularEl.addEventListener('touchstart', e => {
  arrastrando = true;
  inicioX = e.touches[0].clientX;
  e.preventDefault();
});

document.addEventListener('touchmove', e => {
  if (!arrastrando) return;
  rotacion += (e.touches[0].clientX - inicioX) * 0.4;
  aplicarTransformacion();
  inicioX = e.touches[0].clientX;
});

document.addEventListener('touchend', () => {
  arrastrando = false;
});

// ===== INVERTIR 180° =====
invertirBtn.addEventListener('click', () => {
  invertido = !invertido;
  aplicarTransformacion();
});

// ===== APLICAR TRANSFORMACIÓN =====
function aplicarTransformacion() {
  const rotFinal = invertido ? rotacion + 180 : rotacion;
  textoCircularEl.setAttribute(
    'transform',
    `rotate(${rotFinal} 210 210)`
  );
}
