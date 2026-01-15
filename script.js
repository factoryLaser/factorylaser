// Capturamos el input y el texto circular
const textoInput = document.getElementById('textoInput');
const textoPreview = document.getElementById('textoPreview');

textoInput.addEventListener('input', () => {
  // Actualizamos el texto en tiempo real
  textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
});
