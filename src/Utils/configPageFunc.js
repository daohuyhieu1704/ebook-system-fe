import AppConstant from "../constants/AppConstant";

export function setContextProp(canvasDrawRef,pageScale, color) {
    const ctx = canvasDrawRef.current.getContext("2d");
    const thickness = (3 * pageScale) / AppConstant.CANVAS_SCALE;
    ctx.lineCap = "round";
    ctx.lineWidth = thickness;
    ctx.strokeStyle = `rgba(${color.colorR},${color.colorG},${color.colorB},${color.opacity})`;
  }

export function loadCanvasData(canvasDrawRef,pageNum) {
    let canvas = canvasDrawRef.current;
    let context = canvasDrawRef.current.getContext("2d");
    var data = localStorage.getItem("canvas-data-" + pageNum);
    if (!data) return;
    data = JSON.parse(data);
    var img = new Image();
    img.src = data.canvasData;

    img.onload = function () {
        context.drawImage(
        img,
        0,
        0,
        data.width,
        data.height,
        0,
        0,
        canvas.width,
        canvas.height
        );
    };
}

export function saveCanvasData(canvasDrawRef, pageNum) {
    let canvas = canvasDrawRef.current;
    let data = {
        width: canvas.width,
        height: canvas.height,
        canvasData: canvas.toDataURL(),
    };
    localStorage.setItem("canvas-data-" + pageNum, JSON.stringify(data));
}