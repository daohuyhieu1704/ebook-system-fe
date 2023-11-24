import React, { useCallback, useEffect, useState } from "react";
import CanvasPdf from "./CanvasPdf";
import CanvasDraw from "./CanvasDraw";
import { useSelector } from "react-redux";
import { selectPdf, selectScale } from "../../../layout/LayoutSlice";

export default function CanvasContainer({ pageNum, index }) {
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
      <CanvasPdf pdfDoc={pdfDoc} page={page} pageNum={pageNum} scale={scale} />
      <CanvasDraw
        pdfDoc={pdfDoc}
        page={page}
        pageNum={pageNum}
        scale={scale}
        index={index}
      />
    </div>
  );
}
