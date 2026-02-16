const generateButton = $(".generate-btn");
const color = document.querySelectorAll(".color");
const colorValue = Array.from($(".color-value"));
const copyButton = $(".copy-btn");
const palleteContainer = $(".palette-container");

generateButton.on("click", generatePalette);

function generatePalette() {
  const colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }
  updateColorUI(colors);
}

function generateRandomColor() {
  const symbols = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateColorUI(colors) {
  color.forEach((el, index) => {
    el.style.background = colors[index];
    const colorHex = el.querySelector(".color-value");
    colorHex.innerHTML = colors[index];
  });
}
