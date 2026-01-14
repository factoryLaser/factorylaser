fetch("virola.svg")
  .then(res => res.text())
  .then(svg => {
    document.getElementById("preview").innerHTML = svg;
  });

const textoInput = document.getElementById("texto");
const fuenteSelect = document.getElementById("fuente");
const tamanoInput = document.getElementById("tamano");

document.addEventListener("input", () => {
  const texto = document.getElementById("grabadoTexto");
  if (!texto) return;

  texto.textContent = textoInput.value || "TU TEXTO";
  texto.style.fontFamily = fuenteSelect.value;
  texto.setAttribute("font-size", tamanoInput.value);
});

function descargarSVG() {
  const svg = document.querySelector("svg");
  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "grabado-factory-laser.svg";
  a.click();

  URL.revokeObjectURL(url);
}
