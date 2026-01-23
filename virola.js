let rotation = 0;
let offsetY = 0;
let inverted = false;

const text = document.getElementById("grabado");
const input = document.getElementById("textInput");

input.addEventListener("input", () => {
  text.textContent = input.value || "FACTORY LASER";
});

function applyTransform() {
  const scaleX = inverted ? -1 : 1;

  text.setAttribute(
    "transform",
    `
    translate(300 ${110 + offsetY})
    rotate(${rotation})
    scale(${scaleX} 1)
    translate(-300 -110)
    `
  );
}

function rotateLeft() {
  rotation -= 5;
  applyTransform();
}

function rotateRight() {
  rotation += 5;
  applyTransform();
}

function moveUp() {
  offsetY -= 5;
  applyTransform();
}

function moveDown() {
  offsetY += 5;
  applyTransform();
}

function invertText() {
  inverted = !inverted;
  applyTransform();
}

function exportSVG() {
  const svg = document.getElementById("canvas").cloneNode(true);

  const blob = new Blob(
    ['<?xml version="1.0"?>\n' + svg.outerHTML],
    { type: "image/svg+xml;charset=utf-8" }
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "virola_factory_laser.svg";
  a.click();
}
