document.addEventListener('DOMContentLoaded', () => {
  const capasContenedor = document.getElementById('capasTexto');
  const agregarCapaBtn = document.getElementById('agregarCapaBtn');

  let capaID = 0;

  agregarCapaBtn.addEventListener('click', () => {
    agregarCapa(`Palabra ${capaID + 1}`);
  });

  function agregarCapa(textoInicial) {
    capaID++;

    // Crear grupo <g> para cada capa
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

    // ===== CONTROLES =====
    const controlesDiv = document.createElement("div");
    controlesDiv.classList.add("controles");

    // Input de texto
    const input = document.createElement("input");
    input.type = "text";
    input.value = textoInicial;
    input.placeholder = "Escribí tu texto";
    input.addEventListener('input', () => {
      textPath.textContent = input.value;
    });

    // Botón invertir
    const invertirBtn = document.createElement("button");
    invertirBtn.textContent = "Invertir texto";

    // Checkbox borde
    const toggleBorde = document.createElement("input");
    toggleBorde.type = "checkbox";
    toggleBorde.checked = true;
    const toggleLabel = document.createElement("label");
    toggleLabel.textContent = "Borde exterior";
    toggleLabel.prepend(toggleBorde);

    controlesDiv.appendChild(input);
    controlesDiv.appendChild(invertirBtn);
    controlesDiv.appendChild(toggleLabel);

    document.querySelector(".contenedor").appendChild(controlesDiv);

    // ===== ESTADO POR CAPA =====
    let arrastrando = false;
    let inicioX = 0;
    let rotacion = 0;
    let invertido = false;
    let bordeExterior = toggleBorde.checked;

    // Drag desktop
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

    // Drag mobile
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

    // Botón invertir
    invertirBtn.addEventListener('click', () => {
      invertido = !invertido;
      actualizarTransform();
    });

    // Checkbox borde
    toggleBorde.addEventListener('change', () => {
      bordeExterior = toggleBorde.checked;
      actualizarTransform();
    });

    // Función de actualización
    function actualizarTransform() {
      textEl.setAttribute('transform', `rotate(${rotacion} 210 210)`);
      if (bordeExterior) {
        textPath.setAttribute('href', invertido ? '#textoCircularInterior' : '#textoCircularExterior');
      } else {
        textPath.setAttribute('href', invertido ? '#textoCircularExterior' : '#textoCircularInterior');
      }
      textPath.setAttribute('startOffset', '50%');
      textPath.setAttribute('text-anchor', 'middle');
    }

    actualizarTransform(); // inicializar
  }
});

