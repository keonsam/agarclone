const init = () => {
  draw();
};

player.xVector = Math.floor(500 * Math.random() + 10); // horizontal position
player.yVector = Math.floor(500 * Math.random() + 10); // vertical position

// =========================
// =========DRAM============
// =========================

const draw = () => {
  // clears canvas on every frame
  context.clearRect(0, 0, canvas.width, canvas.height);

  // reset translate to default
  context.setTransform(1, 0, 0, 1, 0, 0);

  // clamp screen to player's location
  const camX = player.locX + canvas.width / 2;
  const camY = player.locY + canvas.height / 2;
  context.translate(camX, camY);

  context.beginPath();
  context.fillStyle = "rgb(255, 0, 0)";
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2); // https://www.w3schools.com/jsref/canvas_arc.asp
  context.fill();
  //border around arc
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0, 255, 0)";
  context.stroke();

  // recursively call draw on repaint/ frame
  requestAnimationFrame(draw);
};

canvas.addEventListener("mousemove", (event) => {
  // console.log(event)
  let xVector;
  let yVector;

  const mousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  const angleDeg =
    (Math.atan2(
      mousePosition.y - canvas.height / 2,
      mousePosition.x - canvas.width / 2
    ) *
      180) /
    Math.PI;
  if (angleDeg >= 0 && angleDeg < 90) {
    xVector = 1 - angleDeg / 90;
    yVector = -(angleDeg / 90);
    console.log("Mouse is in the lower right quardrant");
  } else if (angleDeg >= 90 && angleDeg <= 180) {
    xVector = -(angleDeg - 90) / 90;
    yVector = -(1 - (angleDeg - 90) / 90);
    console.log("Mouse is in the lower left quardrant");
  } else if (angleDeg >= -180 && angleDeg < -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 + (angleDeg + 90) / 90;
    console.log("Mouse is in the top left quardrant");
  } else if (angleDeg < 0 && angleDeg >= -90) {
    xVector = (angleDeg + 90) / 90;
    yVector = 1 - (angleDeg + 90) / 90;
    console.log("Mouse is in the top right quardrant");
  }

  player.xVector = xVector ? xVector : 0.1;
  player.yVector = yVector ? yVector : 0.1;
});
