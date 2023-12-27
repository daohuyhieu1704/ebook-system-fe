import React from "react";
import AppControl from "../components/control/app-control";
import CanvasRoot from "../components/canvas/canvas-root";
import { useSelector } from "react-redux";
import {
  selectLoadedSrc,
  selectNumPages,
  selectPdf,
  selectScale,
} from "../redux/AppSlice";
import { selectTypeDraw } from "../components/control/app-controlSlice";
import { Row, Spin } from "antd";

export default function CanvasPage() {
  const pdf = useSelector(selectPdf);
  const scale = useSelector(selectScale);
  const numPages = useSelector(selectNumPages);
  const loadedSrc = useSelector(selectLoadedSrc);
  const typeDraw = useSelector(selectTypeDraw);
  return (
    <>
      <Row>
        <AppControl />
      </Row>
      <Row justify="center">
        {!loadedSrc ? <Spin size="large" /> : pdf != null && <CanvasRoot />}
      </Row>
    </>
  );
}
