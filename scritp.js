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

/* HARMONIC PALETTE GENERATOR FROM CHATGPT */

function generateHarmonyHex(baseHue, type = "analogous") {
  const s = 70;
  const l = 50;

  const normalize = (h) => (h + 360) % 360;

  const make = (hue, sat = s, light = l) =>
    hslToHex(normalize(hue), sat, light);

  switch (type) {
    case "analogous":
      return [
        make(baseHue - 30),
        make(baseHue),
        make(baseHue + 30),
        make(baseHue + 60),
        make(baseHue - 60),
      ];

    case "complementary":
      return [make(baseHue), make(baseHue + 180)];

    case "triadic":
      return [make(baseHue), make(baseHue + 120), make(baseHue + 240)];

    case "tetradic":
      return [
        make(baseHue),
        make(baseHue + 90),
        make(baseHue + 180),
        make(baseHue + 270),
      ];

    case "monochromatic":
      return [
        make(baseHue, s, 30),
        make(baseHue, s, 40),
        make(baseHue, s, 50),
        make(baseHue, s, 60),
        make(baseHue, s, 70),
      ];

    default:
      return [];
  }
}
