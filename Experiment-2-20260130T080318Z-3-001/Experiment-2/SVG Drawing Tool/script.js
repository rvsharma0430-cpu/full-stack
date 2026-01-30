const svg = document.getElementById("svgCanvas");
const shapeSelect = document.getElementById("shapeSelect");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

let isDrawing = false;
let startX = 0;
let startY = 0;
let currentShape = null;

const shapesStack = [];

function getMousePosition(evt) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

function createRect(x, y, color) {
  const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  r.setAttribute("x", x);
  r.setAttribute("y", y);
  r.setAttribute("width", 0);
  r.setAttribute("height", 0);
  r.setAttribute("fill", color);
  r.setAttribute("fill-opacity", "0.4");
  r.setAttribute("stroke", color);
  r.setAttribute("stroke-width", "2");
  return r;
}

function createCircle(x, y, color) {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("r", 0);
  c.setAttribute("fill", color);
  c.setAttribute("fill-opacity", "0.35");
  c.setAttribute("stroke", color);
  c.setAttribute("stroke-width", "2");
  return c;
}

svg.addEventListener("mousedown", (evt) => {
  isDrawing = true;

  const pos = getMousePosition(evt);
  startX = pos.x;
  startY = pos.y;

  const color = colorPicker.value;
  const shapeType = shapeSelect.value;

  if (shapeType === "rect") {
    currentShape = createRect(startX, startY, color);
  } else {
    currentShape = createCircle(startX, startY, color);
  }

  svg.appendChild(currentShape);
});

svg.addEventListener("mousemove", (evt) => {
  if (!isDrawing || !currentShape) return;

  const pos = getMousePosition(evt);
  const shapeType = shapeSelect.value;

  if (shapeType === "rect") {
    const x = Math.min(startX, pos.x);
    const y = Math.min(startY, pos.y);
    const w = Math.abs(pos.x - startX);
    const h = Math.abs(pos.y - startY);

    currentShape.setAttribute("x", x);
    currentShape.setAttribute("y", y);
    currentShape.setAttribute("width", w);
    currentShape.setAttribute("height", h);
  } else {
    const dx = pos.x - startX;
    const dy = pos.y - startY;
    const radius = Math.sqrt(dx * dx + dy * dy);

    currentShape.setAttribute("r", radius);
  }
});

svg.addEventListener("mouseup", () => {
  if (!currentShape) return;

  isDrawing = false;
  shapesStack.push(currentShape);
  currentShape = null;
});

svg.addEventListener("mouseleave", () => {
  if (!isDrawing) return;

  isDrawing = false;
  if (currentShape) {
    shapesStack.push(currentShape);
    currentShape = null;
  }
});

undoBtn.addEventListener("click", () => {
  const last = shapesStack.pop();
  if (last) last.remove();
});

clearBtn.addEventListener("click", () => {
  shapesStack.length = 0;
  svg.innerHTML = "";
});
