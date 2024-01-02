/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect, useCallback } from "react";
import CanvasPDF from "./canvas-pdf";
import CanvasDraw from "./canvas-draw";
import "./canvas-container.css";
import { useSelector } from "react-redux";
import { selectPdf, selectScale } from "../../../../redux/AppSlice";

const CanvasContainer = ({ pageNum, index }) => {
  const pdfDoc = useSelector(selectPdf);
  const scale = useSelector(selectScale);
  const [page, setPage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const renderPage = useCallback(
    async ({ pdfDoc, pageNum, scale, srcState }) => {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      setWidth(parseInt(viewport.width));
      setHeight(parseInt(viewport.height));
      setPage(page);
    },
    []
  );

  useEffect(() => {
    if (pdfDoc && pageNum && scale)
      renderPage({ pdfDoc: pdfDoc, pageNum: pageNum, scale: scale });
  }, [pdfDoc, pageNum, scale, renderPage]);

  useEffect(() => {
    if (page == null) return;
    const viewport = page.getViewport({ scale });
    setWidth(parseInt(viewport.width));
    setHeight(parseInt(viewport.height));
  }, [page, scale]);

  return (
    <div
      id={"pageSection" + pageNum}
      className="page-section"
      style={{ width: width, height: height }}
    >
      <CanvasPDF pdfDoc={pdfDoc} page={page} pageNum={pageNum} scale={scale} />
      <CanvasDraw
        pdfDoc={pdfDoc}
        page={page}
        pageNum={pageNum}
        scale={scale}
        index={index}
      />
    </div>
  );
};

export default CanvasContainer;
