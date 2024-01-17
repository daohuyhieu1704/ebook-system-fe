import { useDispatch, useSelector } from "react-redux";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {
  selectLoadedSrc,
  selectNumPages,
  selectPdf,
  selectScale,
  selectSrc,
  setLoaded,
  setNumPages,
  setPDF,
} from "../../redux/AppSlice";
import React, { useEffect } from "react";
import { Row, Spin } from "antd";
import CanvasRoot from "./components/canvas/canvas-root";
import { selectTypeDraw } from "./components/control/app-controlSlice";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// AppConstant.CANVAS_SCALE
//   localStorage.getItem("canvas-scale") || AppConstant.CANVAS_SCALE;

export default function CanvasGeneral() {
  // const [pdf, setPDF] = useState(null);
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
      const loadingTask = pdfjs.getDocument(src);
      const pdfDoc = await loadingTask.promise;
      dispatch(setPDF(pdfDoc));
      dispatch(setNumPages(pdfDoc._pdfInfo.numPages));
      dispatch(setLoaded(true));
    };

    fetchPdf();
  }, [dispatch, src, srcState]);
  return (
    <Row justify="center">
      {!loadedSrc ? <Spin size="large" /> : pdf != null && <CanvasRoot />}
    </Row>
  );
}
