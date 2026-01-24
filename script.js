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

  // ===== DRAG - Desktop y Mobile =====
  textoCircularEl.style.cursor = 'grab';
  const setupDrag = (el, state) => {
    el.addEventListener('mousedown', e => {
      state.arrastrando = true;
      state.inicioX = e.clientX;
      el.style.cursor = 'grabbing';
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!state.arrastrando) return;
      const delta = e.clientX - state.inicioX;
      state.rot += delta * 0.4;
      const rotFinal = invertido ? state.rot + 180 : state.rot;
      el.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
      state.inicioX = e.clientX;
    });
    document.addEventListener('mouseup', () => {
      state.arrastrando = false;
      el.style.cursor = 'grab';
    });

    el.addEventListener('touchstart', e => {
      state.arrastrando = true;
      state.inicioX = e.touches[0].clientX;
    });
    document.addEventListener('touchmove', e => {
      if (!state.arrastrando) return;
      const delta = e.touches[0].clientX - state.inicioX;
      state.rot += delta * 0.4;
      const rotFinal = invertido ? state.rot + 180 : state.rot;
      el.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
      state.inicioX = e.touches[0].clientX;
    });
    document.addEventListener('touchend', () => { state.arrastrando = false; });
  };

  // Inicial
  setupDrag(textoCircularEl, {arrastrando: false, inicioX: 0, rot: 0});

  // ===== INVERTIR TEXTO (funciona como antes) =====
  invertirBtn.addEventListener('click', () => {
    invertido = !invertido;

    // Aplicar a palabra inicial
    const rotInicial = invertido ? rotacion + 180 : rotacion;
    textoCircularEl.setAttribute('transform', `rotate(${rotInicial} 210 210)`);

    // Aplicar a capas agregadas
    capasAgregadas.forEach(capa => {
      const rotFinal = invertido ? capa.rot + 180 : capa.rot;
      capa.textEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
    });
  });

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
    let capaState = {textEl: nuevoText, rot: 0, arrastrando: false, inicioX: 0};
    setupDrag(nuevoText, capaState);

    capasAgregadas.push(capaState);
  });

  // ===== PAPELERA - Quitar última palabra =====
  papeleraBtn.addEventListener('click', () => {
    if (capasAgregadas.length === 0) return;
    const ultima = capasAgregadas.pop();
    capasSVG.removeChild(ultima.textEl);
  });
});
