import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNumPages,
  selectPdf,
  selectScale,
  setNumPageCurrent,
} from "../../layout/LayoutSlice";
import CanvasContainer from "./components/CanvasContainer";

export default function CanvasRoot() {
  const pdfDoc = useSelector(selectPdf);
  const scale = useSelector(selectScale);
  const totalPage = useSelector(selectNumPages);
  const dispatch = useDispatch();
  const restore_array = [];
  useEffect(() => {
    document.addEventListener("scroll", function () {
      const maxYOffSet =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      // const pageNumCurrent = Math.floor(
      //   (window.pageYOffset * totalPage) / maxYOffSet
      const pageNumCurrent = Math.ceil(
        ((window.scrollY - 145) * totalPage) / maxYOffSet
      );
      dispatch(
        setNumPageCurrent(
          pageNumCurrent !== 0 && !isNaN(pageNumCurrent) ? pageNumCurrent : 1
        )
      );
    });
  }, [dispatch, totalPage]);
  function getCanvasContainer(pdfDoc) {
    let canvasContainer = [];
    for (var i = 0; i < pdfDoc.numPages; i++) {
      canvasContainer.push(
        <CanvasContainer
          key={"canvas-container-" + (i + 1)}
          pageNum={i + 1}
          index={-1}
        />
      );
    }
    return (
      <div id="document" className="div-document">
        {canvasContainer}
      </div>
    );
  }
  return (
    <div className="canvas-container" id="canvasroot">
      <div className="pdf-draw-container">{getCanvasContainer(pdfDoc)}</div>
    </div>
  );
}
