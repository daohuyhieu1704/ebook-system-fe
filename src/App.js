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
import SpinnerLoading from "./components/SpinnerLoading/SpinnerLoading";
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
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const defaultUrl = "./Eloquent_JavaScript.pdf";
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
  const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Option 3", "3", <ContainerOutlined />),
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 11", "11"),
        getItem("Option 12", "12"),
      ]),
    ]),
  ];

  return (
    <Row>
      <Col span={4}>
        <Menu>
          <Menu.Item>item 1</Menu.Item>
          <Menu.Item>item 2</Menu.Item>
          <Menu.SubMenu title="sub menu">
            <Menu.Item>item 3</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Col>
      <Col span={20}>
        <AppControl />
        {!loadedSrc ? (
          <SpinnerLoading size={20} />
        ) : (
          pdf != null && <CanvasRoot />
        )}
      </Col>
    </Row>
  );
};

export default App;
