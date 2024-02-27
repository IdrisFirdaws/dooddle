const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const refreshBtn = document.getElementById("refresh-btn");
const blackBtn = document.getElementById("black-btn");
const redBtn = document.getElementById("red-btn");
const yellowBtn = document.getElementById("yellow-btn");
const blueBtn = document.getElementById("blue-btn");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = "black";

function draw(e) {
  if (!isDrawing) return;
  const { offsetX, offsetY } = getCoordinates(e);
  context.lineWidth = 5;
  context.lineCap = "round";
  context.strokeStyle = currentColor;
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(offsetX, offsetY);
  context.stroke();
  [lastX, lastY] = [offsetX, offsetY];
}

function getCoordinates(e) {
  if (e.touches) {
    return {
      offsetX: e.touches[0].clientX - canvas.offsetLeft,
      offsetY: e.touches[0].clientY - canvas.offsetTop,
    };
  }
  return { offsetX: e.offsetX, offsetY: e.offsetY };
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const { offsetX, offsetY } = getCoordinates(e);
  [lastX, lastY] = [offsetX, offsetY];
});

canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  const { offsetX, offsetY } = getCoordinates(e);
  [lastX, lastY] = [offsetX, offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("touchend", () => (isDrawing = false));

canvas.addEventListener("mouseout", () => (isDrawing = false));

refreshBtn.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

blackBtn.addEventListener("click", () => {
  currentColor = "black";
});

redBtn.addEventListener("click", () => {
  currentColor = "red";
});

yellowBtn.addEventListener("click", () => {
  currentColor = "yellow";
});

blueBtn.addEventListener("click", () => {
  currentColor = "blue";
});
