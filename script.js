const input = document.getElementById("textoInput");
const texto = document.getElementById("textoPreview");

input.addEventListener("input", () => {
  texto.textContent = input.value || " ";
});
