const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 50;
ctx.globalCompositeOperation = "multiply"; // this is like photoshop blend mode

let isDrawing = false; //This like a flag
//set when drawing
let lastX = 0,
  lastY = 0; //These are the
//coordinates of start point
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; //stop fuction from running
  // when mouse button is not down

  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue++;
  if (hue > 360) hue = 0;

  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) ctx.lineWidth++;
  else ctx.lineWidth--;
}
//setInterval(()=>hue = Math.round(Math.random()*360),500);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.clientX, e.clientY];
  draw;
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));
