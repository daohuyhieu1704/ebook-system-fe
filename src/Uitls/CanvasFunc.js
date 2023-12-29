export function drawFree(e, ctx, currentState) {
  if (!currentState.dragging) {
    return;
  }

  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.globalCompositeOperation = "source-over";
  ctx.moveTo(currentState.lastX, currentState.lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [currentState.lastX, currentState.lastY] = [e.offsetX, e.offsetY];

}

export function copy(imgData, canvas, ctx) {
  imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export function paste(imgData, canvas, ctx) {
  // ctx.putImageData(imgData, 0, 0)
  imgData && ctx.putImageData(imgData, 0, 0);
}

export function drawCircle(position, ctx, currentState) {
  if (currentState.typeDraw === "drawCircle") {
    let rrr = Math.sqrt(
      Math.pow(position.x - currentState.dragStartPoint.x, 2) +
        Math.pow(position.y - currentState.dragStartPoint.y, 2)
    );

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.globalCompositeOperation = "source-over";
    ctx.arc(position.x, position.y, rrr, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

export function drawRect(position, ctx, currentState) {
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.globalCompositeOperation = "source-over";
  ctx.rect(
    position.x,
    position.y,
    currentState.dragStartPoint.x - position.x,
    currentState.dragStartPoint.y - position.y
  );
  ctx.stroke();
}

export function drawTriangle(position, ctx, currentState) {
  var coordinates = [],
    angle = 100,
    sides = 3,
    radius = Math.sqrt(
      Math.pow(currentState.dragStartPoint.x - position.x, 2) +
        Math.pow(currentState.dragStartPoint.x - position.x, 2)
    ),
    index = 0;

  for (index = 0; index < sides; index++) {
    coordinates.push({
      x: currentState.dragStartPoint.x + radius * Math.cos(angle),
      y: currentState.dragStartPoint.y - radius * Math.sin(angle),
    });
    angle += (2 * Math.PI) / sides;
  }
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-over";
  ctx.moveTo(coordinates[0].x, coordinates[0].y);
  for (index = 1; index < sides; index++) {
    ctx.lineTo(coordinates[index].x, coordinates[index].y);
  }

  ctx.closePath();
  ctx.stroke();
}

export function drawLine(position, ctx, currentState) {
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-over";
  ctx.moveTo(currentState.dragStartPoint.x, currentState.dragStartPoint.y);
  ctx.lineTo(position.x, position.y);
  ctx.stroke();
}

export function drawTextSpecify(ctx, currentState) {
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-over";
  ctx.rect(
    currentState.dragStartPoint.x,
    currentState.dragStartPoint.y,
    currentState.widthRectDrawText,
    currentState.heightRectDrawText
  );
  ctx.stroke();
}

export function eraser(e, ctx, currentState) {
  if (!currentState.dragging) {
    return;
  }
  ctx.beginPath();
  ctx.setLineDash([]);
  ctx.globalCompositeOperation = "destination-out";
  ctx.arc(currentState.lastX, currentState.lastY, 8, 0, Math.PI * 2, false);
  ctx.fill();
  [currentState.lastX, currentState.lastY] = [e.offsetX, e.offsetY];
}

export function randomColor() {
  var r = Math.round(Math.random() * 256);
  var g = Math.round(Math.random() * 256);
  var b = Math.round(Math.random() * 256);

  return "rgb( " + r + "," + g + "," + b + ")";
}

