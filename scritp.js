const generateButton = $(".generate-btn");
const colorUI = document.querySelectorAll(".color");
const colorValue = Array.from($(".color-value"));
const copyButton = Array.from($(".copy-btn"));
const paletteContainer = $(".container-palette");

$(document).ready(generatePalette);
generateButton.on("click", generatePalette);

$("#palette-selector").on("change", function (event) {
  generatePalette();
});

paletteContainer.on("click", (e) => {
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => {
        showCopySucces(e);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

function showCopySucces(el) {
  copyButton.forEach((element) => {
    element.classList.remove("fa-solid", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "grey";
  });
  el.target.classList.remove("far", "fa-copy");
  el.target.classList.add("fa-solid", "fa-check");
  el.target.style.color = "green";
}

function udatePalette(selection) {
  colorUI.forEach((el) => el.classList.add("hidden"));

  const visibleCount = {
    analogous: 4,
    complementary: 2,
    triadic: 3,
    tetradic: 4,
    monochromatic: 5,
  };

  colorUI.forEach((el, index) => {
    if (index < visibleCount[selection]) {
      el.classList.remove("hidden");
    }
  });
}

function generatePalette() {
  let optionSelected = $("#palette-selector").val();
  const baseHue = Math.floor(Math.random() * 360);
  const colors = generateHarmonyHex(baseHue, optionSelected);
  udatePalette(optionSelected);
  updateColorUI(colorUI, colors);
}

/* function generateRandomColor() {
  const symbols = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += symbols[Math.floor(Math.random() * 16)];
  }
  return color;
} */

function updateColorUI(colorElements, colorValues) {
  colorElements.forEach((el, index) => {
    el.style.background = colorValues[index];
    const colorHex = el.querySelector(".color-value");
    if (colorHex) colorHex.innerHTML = colorValues[index];
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
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (value) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
