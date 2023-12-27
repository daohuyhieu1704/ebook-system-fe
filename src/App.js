import React, { useRef, useState, useEffect, useCallback } from "react";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./App.css";
import CanvasRoot from "./components/canvas/canvas-root";
import AppControl from "./components/control/app-control";
import AppConstant from "./constants/AppConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoaded,
  selectLoadedSrc,
  selectNumPages,
  selectPdf,
  selectScale,
  selectSrc,
  setLoaded,
  setNumPages,
  setPDF,
  setScale,
} from "../src/redux/AppSlice";
import { selectTypeDraw } from "./components/control/app-controlSlice";
import Sider from "antd/lib/layout/Sider";
import { Col, Menu, Row } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import CanvasPage from "./page/CanvasPage";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// AppConstant.CANVAS_SCALE =
//   localStorage.getItem("canvas-scale") || AppConstant.CANVAS_SCALE;

const App = () => {
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
  console.log("src", localStorage);
  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjs.getDocument(src);
      console.log("loadingTask", src);
      const pdfDoc = await loadingTask.promise;
      dispatch(setPDF(pdfDoc));
      dispatch(setNumPages(pdfDoc._pdfInfo.numPages));
      dispatch(setLoaded(true));
    };

    fetchPdf();
  }, [dispatch, src, srcState]);

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  return (
    <Row gutter={[16, 16]}>
      {/* Sidebar - để navigate đến những trang web khác */}
      <Col span={4}>
        <Menu>
          <Menu.Item>Canvas</Menu.Item>
          <Menu.Item>User</Menu.Item>
          <Menu.Item>Function</Menu.Item>
        </Menu>
      </Col>
      <Col span={20}>
        <CanvasPage />
      </Col>
    </Row>
  );
};

export default App;
