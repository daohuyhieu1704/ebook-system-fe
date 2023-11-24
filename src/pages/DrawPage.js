import React, { useEffect } from "react";
import CanvasRoot from "../features/draw/CanvasRoot";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "@react-pdf-viewer/core/lib/styles/index.css";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

import {
  selectLoadedSrc,
  selectNumPages,
  selectPdf,
  selectScale,
  selectSrc,
  setLoaded,
  setNumPages,
  setPDF,
} from "../layout/LayoutSlice";
import { selectTypeDraw } from "../features/draw/DrawSlice";
import CanvasControl from "../features/draw/components/CanvasControl";

export default function DrawPage() {
  const srcState = useSelector(selectSrc);
  const src =
    localStorage.getItem("urls") !== null
      ? localStorage.getItem("urls")
      : srcState;
  // ? localStorage.getItem('urls')
  // : srcState

  const pdf = useSelector(selectPdf);
  const scale = useSelector(selectScale);
  const numPages = useSelector(selectNumPages);
  const loadedSrc = useSelector(selectLoadedSrc);
  const typeDraw = useSelector(selectTypeDraw);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(src);
      try {
        const pdfDoc = await loadingTask.promise;
        dispatch(setPDF(pdfDoc));
        dispatch(setNumPages(pdfDoc._pdfInfo.numPages));
        dispatch(setLoaded(true));
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    fetchPdf();
  }, [dispatch, src, srcState]);
  return (
    <div className="container">
      <CanvasControl />
      {!loadedSrc ? <Spin size={20} /> : pdf != null && <CanvasRoot />}
    </div>
  );
}
