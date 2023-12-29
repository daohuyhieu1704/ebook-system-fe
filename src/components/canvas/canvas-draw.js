/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppConstant from "../../constants/AppConstant";
import {
  drawCircle,
  drawLine,
  drawTriangle,
  randomColor,
} from "../../Uitls/CanvasFunc";
import { selectNumPageCurrent, selectNumPages } from "../../redux/AppSlice";
import {
  selectColorB,
  selectColorG,
  selectColorR,
  selectFlagDraw,
  selectOpacity,
  selectTypeDraw,
  selectUndoState,
  selectLineWidth,
  setFlagDraw,
  setLineWidth,
  selectClearAllState,
  setClearAllState,
  selectTextContent,
  selectTextSpecify,
  selectTextMode,
  selectTextStart,
  selectTextEnd,
  selectTextSize,
  selectTextColor,
  selectTextBoundary,
  setTextStart,
  setTextEnd,
  setTextMode,
  setTextSpecify,
  setTextContent,
  setTextSize,
  setTextColor,
  setTextBoundary,
  setTextWH,
} from "../control/app-controlSlice";
import { selectIndexHistory, setIndexHistory } from "./canvas-containerSlice";

import "./canvas-draw.css";
const CanvasDraw = ({ pdfDoc, page, pageNum, scale }) => {
  let pageScale = scale;
  const canvasDrawRef = useRef(null);
  const [orgWidth, setOrgWidth] = useState(null);
  const [orgHeight, setOrgHeight] = useState(null);
  const lineWidth = useSelector(selectLineWidth);
  const [lineWidthState, setLineWidthState] = useState(3);
  const flagDraw = useSelector(selectFlagDraw);
  const colorR = useSelector(selectColorR);
  const colorG = useSelector(selectColorG);
  const colorB = useSelector(selectColorB);
  const opacity = useSelector(selectOpacity);
  const typeDraw = useSelector(selectTypeDraw);

  const textContent = useSelector(selectTextContent);
  const textSpecify = useSelector(selectTextSpecify);

  const textStart = useSelector(selectTextStart);
  const textEnd = useSelector(selectTextEnd);
  const textSize = useSelector(selectTextSize);

  const [medTxt, setMedTxt] = useState([""]);
  const spaceBetweenLine = 20;
  const spaceBetweenLetter = 4;
  const heightRectDrawText = 60;
  const widthRectDrawText = 120;
  // const indexHistory = useSelector(selectIndexHistory)
  const numPageCurrent = useSelector(selectNumPageCurrent);
  const ClearAllState = useSelector(selectClearAllState);
  const dispatch = useDispatch();
  const renderPage = useCallback(
    async ({ pdfDoc, page, pageNum, scale, typeDraw, historyArrPage }) => {
      const ctx = canvasDrawRef.current.getContext("2d");
      const cviewport = page.getViewport({ scale });
      setOrgWidth(cviewport.width);
      setOrgHeight(cviewport.height);
      canvasDrawRef.current.width = cviewport.width;
      canvasDrawRef.current.height = cviewport.height;
      // createCanvas(canvasDrawRef.current, ctx)

      setContextProp();
      loadCanvasData();
    },
    []
  );
  useEffect(() => {
    const ctx = canvasDrawRef.current.getContext("2d");
    console.log("chaylaicreate2");
    createCanvas(canvasDrawRef.current, ctx);
  }, [typeDraw, numPageCurrent]);
  useEffect(() => {
    if (numPageCurrent === pageNum) {
      const ctx = canvasDrawRef.current.getContext("2d");
      createCanvas(canvasDrawRef.current, ctx);
    }
  }, [flagDraw, numPageCurrent]);
  useEffect(() => {
    const ctx = canvasDrawRef.current.getContext("2d");
    createCanvas(canvasDrawRef.current, ctx);
  }, [window.pageYOffset, window.pageXOffset]);
  useEffect(() => {
    if (page == null) return;
    renderPage({
      pdfDoc: pdfDoc,
      page: page,
      pageNum: pageNum,
      scale: scale,
      typeDraw: typeDraw,
    });
  }, [page]);
  useEffect(() => {
    if (numPageCurrent === pageNum) {
      const ctx = canvasDrawRef.current.getContext("2d");
      createCanvas(canvasDrawRef.current, ctx);
    }
  }, [typeDraw, numPageCurrent]);

  useEffect(() => {
    if (page == null) return;
    const cviewport = page.getViewport({ scale });
    const ctx = canvasDrawRef.current.getContext("2d");
    canvasDrawRef.current.style.width = cviewport.width + "px";
    canvasDrawRef.current.style.height = cviewport.height + "px";
    ctx.scale(orgWidth / cviewport.width, orgHeight / cviewport.height);

    setOrgWidth(cviewport.width);
    setOrgHeight(cviewport.height);

    // setViewport(viewport);

    setContextProp();
    ctx.lineWidth = scale * lineWidth;
  }, [scale, colorR, colorG, colorB, opacity]);
  useEffect(() => {
    const ctx = canvasDrawRef.current.getContext("2d");
    setLineWidthState(lineWidth);
    ctx.lineWidth = scale * lineWidth;
  }, [lineWidth]);

  useEffect(() => {
    if (numPageCurrent == pageNum)
      if (ClearAllState === true) {
        //eraseAll()
        clearAllFunction();
        dispatch(setClearAllState(!ClearAllState));
      }
  }, [ClearAllState]);

  useEffect(() => {
    setMedTxt(textContent.split("\n"));
  }, [textContent]);

  useEffect(() => {
    let canvas = canvasDrawRef.current;
    var memory = 0;
    const limitX = textEnd[0] - textStart[0];
    var textX = textStart[0] + spaceBetweenLetter;
    var textY = textStart[1] + spaceBetweenLine;
    const ctx = canvasDrawRef.current.getContext("2d");
    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = `rgba(${colorR},${colorG},${colorB},${opacity})`;
    if (textContent == "")
      ctx.clearRect(
        textStart[0],
        textStart[1],
        textEnd[0] - textStart[0],
        textEnd[1] - textStart[1]
      );
    function handle(e) {
      if (textSpecify === true && typeDraw === "drawText") {
        ctx.clearRect(
          textStart[0],
          textStart[1],
          textEnd[0] - textStart[0],
          textEnd[1] - textStart[1]
        );
        for (let i = 0; i < medTxt.length; i++) {
          if (
            e.keyCode !== 16 &&
            e.keyCode !== 17 &&
            e.keyCode !== 18 &&
            e.keyCode !== 20
          )
            for (let j = 0; j < medTxt[i].length; j++) {
              if (textX + ctx.measureText(medTxt[i][j]).width > textEnd[0]) {
                textX = textStart[0] + spaceBetweenLetter;
                textY += spaceBetweenLine;
              } else {
                ctx.fillText(medTxt[i][j], textX, textY);
                textX += ctx.measureText(medTxt[i][j]).width;
              }
              if (j === medTxt[i].length - 1 && i < medTxt.length - 1) {
                textX = textStart[0] + spaceBetweenLetter;
                textY += spaceBetweenLine;
              }
            }
        }

        if (textX + ctx.measureText(e.key).width > textEnd[0]) {
          dispatch(setTextContent(textContent + e.key));
          textX = textStart[0] + spaceBetweenLetter;
          textY += spaceBetweenLine;
        }
        if (textY > textEnd[1])
          dispatch(setTextEnd([textEnd[0], textEnd[1] + spaceBetweenLine]));
        if (e.keyCode == 8) {
          e.preventDefault();
          ctx.clearRect(
            textX - ctx.measureText(textContent[textContent.length - 1]).width,
            textY - ctx.measureText(textContent[textContent.length - 1]).height,
            ctx.measureText(textContent[textContent.length - 1]).width,
            ctx.measureText(textContent[textContent.length - 1]).height
          );
          dispatch(
            setTextContent(textContent.substring(0, textContent.length - 1))
          );
        }
        if (e.keyCode == 13) {
          textX = textStart[0] + spaceBetweenLetter;
          textY += spaceBetweenLine;
          dispatch(setTextContent(textContent + "\n"));
        }
        if (e.keyCode == 20) {
          dispatch(setTextContent(textContent));
        }
        if (e.keyCode == 32) {
          e.preventDefault();
          ctx.fillText(" ", textX, textY);
          textX += ctx.measureText(" ").width;
          dispatch(setTextContent(textContent + " "));
        }
        if (
          (48 <= e.keyCode && e.keyCode <= 90) ||
          (186 <= e.keyCode && e.keyCode <= 222)
        ) {
          ctx.fillText(e.key, textX, textY);
          textX += ctx.measureText(e.key).width;
          dispatch(setTextContent(textContent + e.key));
        }

        console.log("alo", medTxt);
      }
      console.log(e.key, e.keyCode, textX, textY);
    }
    canvas.addEventListener("keydown", handle);
    return () => {
      canvas.removeEventListener("keydown", handle);
    };
  });

  function setContextProp() {
    const ctx = canvasDrawRef.current.getContext("2d");
    const thickness = (3 * pageScale) / AppConstant.CANVAS_SCALE;
    ctx.lineCap = "round";
    ctx.lineWidth = thickness;
    ctx.strokeStyle = `rgba(${colorR},${colorG},${colorB},${opacity})`;
  }
  function loadCanvasData() {
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

  function saveCanvasData() {
    let canvas = canvasDrawRef.current;
    let data = {
      width: canvas.width,
      height: canvas.height,
      canvasData: canvas.toDataURL(),
    };
    localStorage.setItem("canvas-data-" + pageNum, JSON.stringify(data));
  }

  function createCanvas(canvas, ctx) {
    let dragging = false;
    let dragStartPoint = { x: null, y: null };
    let imgData;
    let lastX = 0;
    let lastY = 0;
    let position = { x: null, y: null };
    function drawFree(e) {
      if (!dragging) {
        return;
      }

      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.globalCompositeOperation = "source-over";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    function eraser(e) {
      if (!dragging) {
        return;
      }
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.globalCompositeOperation = "destination-out";
      ctx.arc(lastX, lastY, 8, 0, Math.PI * 2, false);
      ctx.fill();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    function getCanvasCoordinates(event) {
      var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

      return { x: x, y: y };
    }

    function copy() {
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    function paste() {
      // ctx.putImageData(imgData, 0, 0)
      imgData && ctx.putImageData(imgData, 0, 0);
    }

    function drawRect(position) {
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.globalCompositeOperation = "source-over";
      ctx.rect(
        position.x,
        position.y,
        dragStartPoint.x - position.x,
        dragStartPoint.y - position.y
      );
      ctx.stroke();
    }

    function drawTextSpecify() {
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.globalCompositeOperation = "source-over";
      console.log("rectDraw");
      ctx.rect(
        dragStartPoint.x,
        dragStartPoint.y,
        widthRectDrawText,
        heightRectDrawText
      );
      ctx.stroke();
    }

    function draw(position) {
      if (typeDraw === "drawCircle") {
        drawCircle(position, ctx, {
          typeDraw: typeDraw,
          dragStartPoint: dragStartPoint,
        });
      }

      if (typeDraw === "drawRect") {
        drawRect(position);
      }

      if (typeDraw === "drawTri") {
        drawTriangle(position, ctx, {
          dragStartPoint: dragStartPoint,
        });
      }
      if (typeDraw === "drawLine") {
        drawLine(position, ctx, {
          dragStartPoint: dragStartPoint,
        });
      }
    }

    function dragStart(event, typeDraw) {
      document.removeEventListener("keydown", () => {});
      dragging = true;
      dragStartPoint = getCanvasCoordinates(event);
      copy();
      if (typeDraw === "drawText") {
        dispatch(setTextSpecify(true));
        dispatch(setTextStart([dragStartPoint.x, dragStartPoint.y]));
      }
    }

    function drag(event) {
      var position;
      if (dragging === true) {
        paste();
        position = getCanvasCoordinates(event);
        ctx.fillStyle = randomColor();
        draw(position);
      }
    }

    function dragStop(event) {
      dragging = false;
      paste();
      ctx.fillStyle = randomColor();
      var position = getCanvasCoordinates(event);
      draw(position);

      if (typeDraw === "drawText") {
        if (typeDraw === "drawText") {
          drawTextSpecify();
        }
        dispatch(
          setTextEnd([
            dragStartPoint.x + widthRectDrawText,
            dragStartPoint.y + heightRectDrawText,
          ])
        );
        dispatch(setTextSpecify(true));
        dispatch(setTextContent(""));
      }
    }
    const mouseDownFucntion = (e) => {
      [lastX, lastY] = [e.offsetX, e.offsetY];
      dragging = true;
      if (typeDraw !== "drawFree" && typeDraw !== "eraser") {
        //dragStartPoint.x = e.offsetX
        //dragStartPoint.y = e.offsetY
        dragStart(e);
      }
    };
    canvas && canvas.addEventListener("mousedown", mouseDownFucntion);

    const mouseMoveFunction = (e) => {
      if (typeDraw === "drawFree") {
        drawFree(e);
      } else if (typeDraw === "eraser") {
        eraser(e);
      } else {
        //position = { x: e.offsetX, y: e.offsetY }
        drag(e);
      }
    };
    canvas && canvas.addEventListener("mousemove", mouseMoveFunction);

    const mouseUpFunction = (e) => {
      dragging = false;
      dragStop(e);
      if (typeDraw === "drawText")
        dispatch(setTextStart([dragStartPoint.x, dragStartPoint.y]));
    };
    canvas && canvas.addEventListener("mouseup", mouseUpFunction);

    if (canvas) {
      canvas.addEventListener(
        "touchstart",
        function (e) {
          var touch = e.touches[0];
          var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
          canvas.dispatchEvent(mouseEvent);
        },
        false
      );
      canvas.addEventListener(
        "touchend",
        function (e) {
          var mouseEvent = new MouseEvent("mouseup", {});
          canvas.dispatchEvent(mouseEvent);
        },
        false
      );
      canvas.addEventListener(
        "touchmove",
        function (e) {
          var touch = e.touches[0];
          var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY,
          });
          canvas.dispatchEvent(mouseEvent);
        },
        false
      );
    }
    const removeAll = () => {
      canvas && canvas.removeEventListener("mouseup", mouseUpFunction);
      canvas && canvas.removeEventListener("mousedown", mouseDownFucntion);
      canvas && canvas.removeEventListener("mousemove", mouseMoveFunction);
      // canvas && canvas.removeEventListener('mouseout', mouseOutFunction)
    };
    canvas && canvas.addEventListener("mouseenter", removeAll);
  }
  const clearAllFunction = () => {
    const ctx = canvasDrawRef.current.getContext("2d");
    let canvas = canvasDrawRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.width);
  };

  return (
    <canvas
      ref={canvasDrawRef}
      tabIndex="0"
      className="canvas-draw"
      id={"canvas-draw-" + pageNum}
      onMouseEnter={() => dispatch(setFlagDraw(!flagDraw))}
    ></canvas>
  );
};

export default CanvasDraw;
