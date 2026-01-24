document.addEventListener('DOMContentLoaded', () => {
  const textoInput = document.getElementById('textoInput');
  const textoPreview = document.getElementById('textoPreview');
  const textoCircularEl = document.getElementById('textoCircularEl');
  const invertirBtn = document.getElementById('invertirBtn');
  const agregarCapaBtn = document.getElementById('agregarCapaBtn');
  const papeleraBtn = document.getElementById('papeleraBtn');
  const capasSVG = document.getElementById('capasTexto');

  // ===== ESTADO =====
  let arrastrando = false;
  let inicioX = 0;
  let rotacion = 0;
  let invertido = false;

  // Estado capas agregadas
  let capasAgregadas = [];

  // ===== TEXTO INICIAL EN TIEMPO REAL =====
  textoInput.addEventListener('input', () => {
    textoPreview.textContent = textoInput.value || 'TU TEXTO ACÁ';
  });

  // ===== DRAG - Desktop =====
  textoCircularEl.style.cursor = 'grab';
  textoCircularEl.addEventListener('mousedown', e => {
    arrastrando = true;
    inicioX = e.clientX;
    textoCircularEl.style.cursor = 'grabbing';
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
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

  // ===== DRAG - Mobile =====
  textoCircularEl.addEventListener('touchstart', e => {
    arrastrando = true;
    inicioX = e.touches[0].clientX;
  });
  document.addEventListener('touchmove', e => {
    if (!arrastrando) return;
    const delta = e.touches[0].clientX - inicioX;
    rotacion += delta * 0.4;
    aplicarTransformaciones();
    inicioX = e.touches[0].clientX;
  });
  document.addEventListener('touchend', () => { arrastrando = false; });

  // ===== INVERTIR TEXTO =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;
    // Aplicar a inicial
    aplicarTransformaciones();
    // Aplicar a capas agregadas
    capasAgregadas.forEach(capa => {
      const rotFinal = invertido ? capa.rot + 180 : capa.rot;
      capa.textEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
    });
  });

  // ===== FUNCION APLICAR TRANSFORMACIONES INICIAL =====
  function aplicarTransformaciones() {
    const rotFinal = invertido ? rotacion + 180 : rotacion;
    textoCircularEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
  }

  // ===== AGREGAR NUEVA PALABRA =====
  agregarCapaBtn.addEventListener('click', () => {
    const nuevaPalabra = prompt("Escribí la nueva palabra:");
    if (!nuevaPalabra) return;

    const nuevoText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    nuevoText.setAttribute("font-size", "26");
    nuevoText.setAttribute("fill", "#000");
    nuevoText.setAttribute("dominant-baseline", "middle");
    nuevoText.style.cursor = 'grab';

    const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    textPath.setAttribute("href", "#textoCircular");
    textPath.setAttribute("startOffset", "50%");
    textPath.setAttribute("text-anchor", "middle");
    textPath.textContent = nuevaPalabra;

    nuevoText.appendChild(textPath);
    capasSVG.appendChild(nuevoText);

    // Estado por capa
    let rot = 0;
    let arrastrandoCapa = false;
    let inicioXCapa = 0;

    // Drag desktop
    nuevoText.addEventListener('mousedown', e => {
      arrastrandoCapa = true;
      inicioXCapa = e.clientX;
      nuevoText.style.cursor = 'grabbing';
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!arrastrandoCapa) return;
      const delta = e.clientX - inicioXCapa;
      rot += delta * 0.4;
      const rotFinal = invertido ? rot + 180 : rot;
      nuevoText.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
      inicioXCapa = e.clientX;
    });
    document.addEventListener('mouseup', () => {
      arrastrandoCapa = false;
      nuevoText.style.cursor = 'grab';
    });

    // Drag mobile
    nuevoText.addEventListener('touchstart', e => {
      arrastrandoCapa = true;
      inicioXCapa = e.touches[0].clientX;
    });
    document.addEventListener('touchmove', e => {
      if (!arrastrandoCapa) return;
      const delta = e.touches[0].clientX - inicioXCapa;
      rot += delta * 0.4;
      const rotFinal = invertido ? rot + 180 : rot;
      nuevoText.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
      inicioXCapa = e.touches[0].clientX;
    });
    document.addEventListener('touchend', () => { arrastrandoCapa = false; });

    capasAgregadas.push({textEl: nuevoText, rot});
  });

  // ===== PAPELERA - Quitar última palabra =====
  papeleraBtn.addEventListener('click', () => {
    if (capasAgregadas.length === 0) return;
    const ultima = capasAgregadas.pop();
    capasSVG.removeChild(ultima.textEl);
  });
});
