document.addEventListener('DOMContentLoaded', () => {
  const capasContenedor = document.getElementById('capasTexto');
  const agregarCapaBtn = document.getElementById('agregarCapaBtn');
  const papeleraBtn = document.getElementById('papeleraBtn');

  let capaID = 0;
  let capasAgregadas = [];

  // ===== Crear palabra inicial visible =====
  crearCapa("TU TEXTO ACÁ", false);

  // ===== Botón agregar nueva palabra =====
  agregarCapaBtn.addEventListener('click', () => {
    crearCapa(`Palabra ${capaID + 1}`, true);
  });

  // ===== Botón papelera =====
  papeleraBtn.addEventListener('click', () => {
    if (capasAgregadas.length === 0) return;
    const ultimaCapa = capasAgregadas.pop();
    ultimaCapa.grupo.remove();
    ultimaCapa.controlesDiv.remove();
  });

  // ===== Función para crear capa =====
  function crearCapa(textoInicial, removable) {
    capaID++;

    // Crear grupo <g> para la capa
    const grupo = document.createElementNS("http://www.w3.org/2000/svg", "g");
    grupo.setAttribute("id", `capa-${capaID}`);

    // Crear <text> y <textPath>
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("font-size", "26");
    textEl.setAttribute("fill", "#000");
    textEl.setAttribute("dominant-baseline", "middle");
    textEl.style.cursor = 'grab';

    const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
    textPath.setAttribute("href", "#textoCircularExterior");
    textPath.setAttribute("startOffset", "50%");
    textPath.setAttribute("text-anchor", "middle");
    textPath.textContent = textoInicial;

    textEl.appendChild(textPath);
    grupo.appendChild(textEl);
    capasContenedor.appendChild(grupo);

    // ===== Controles de capa =====
    const controlesDiv = document.createElement("div");
    controlesDiv.classList.add("capa-controles");

    const input = document.createElement("input");
    input.type = "text";
    input.value = textoInicial;
    input.placeholder = "Escribí tu texto";
    input.addEventListener('input', () => {
      textPath.textContent = input.value;
    });

    controlesDiv.appendChild(input);
    document.querySelector(".contenedor").appendChild(controlesDiv);

    // ===== Estado por capa =====
    let arrastrando = false;
    let inicioX = 0;
    let rotacion = 0;
    let invertido = false;

    // ===== Drag Desktop =====
    textEl.addEventListener('mousedown', e => {
      arrastrando = true;
      inicioX = e.clientX;
      textEl.style.cursor = 'grabbing';
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
      textEl.style.cursor = 'grab';
    });

    // ===== Drag Mobile =====
    textEl.addEventListener('touchstart', e => {
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

    // ===== Botón invertir =====
    agregarCapaBtn.addEventListener('click', () => {
      // nada aquí, ya se usa solo el drag e input
    });

    textEl.addEventListener('dblclick', () => {
      invertido = !invertido;
      actualizarTransform();
    });

    // ===== Función actualizar transformaciones =====
    function actualizarTransform() {
      const rotFinal = invertido ? rotacion + 180 : rotacion;
      textEl.setAttribute('transform', `rotate(${rotFinal} 210 210)`);
      textPath.setAttribute('startOffset', '50%');
      textPath.setAttribute('text-anchor', 'middle');
    }

    actualizarTransform(); // inicializar

    if (removable) {
      capasAgregadas.push({grupo, controlesDiv});
    }
  }
});

