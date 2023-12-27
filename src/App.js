import { LoadingOutlined } from "@ant-design/icons";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPrivateRoutes, PublicRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import { AppLayout } from "./features/Layout/Layout";
import { useLogout } from "./hooks/useLogout";
import NotFoundPage from "./pages/NotFoundPage";
import { theme } from "./theme/theme";

// import React, { useRef, useState, useEffect, useCallback } from "react";
// import pdfjs from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// import "./App.css";
// import CanvasRoot from "./components/canvas/canvas-root";
// import AppControl from "./components/control/app-control";
// import AppConstant from "./constants/AppConstant";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   selectLoaded,
//   selectLoadedSrc,
//   selectNumPages,
//   selectPdf,
//   selectScale,
//   selectSrc,
//   setLoaded,
//   setNumPages,
//   setPDF,
//   setScale,
// } from "../src/redux/AppSlice";
// import { selectTypeDraw } from "./components/control/app-controlSlice";
// import Sider from "antd/lib/layout/Sider";
// import { Col, Menu, Row } from "antd";
// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
//   MailOutlined,
//   PieChartOutlined,
// } from "@ant-design/icons";
// import CanvasPage from "./page/CanvasPage";
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// // AppConstant.CANVAS_SCALE =
// //   localStorage.getItem("canvas-scale") || AppConstant.CANVAS_SCALE;

const App = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <AppLayout>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingOutlined
                style={{ fontSize: "4rem", color: theme.colors.primary }}
              />
            </div>
          </AppLayout>
        }
      >
        <AppLayout>
          <Routes>
            {PublicRoutes}
            {AdminPrivateRoutes}
            <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </Suspense>
    </BrowserRouter>
    // <Row gutter={[16, 16]}>
    //   {/* Sidebar - để navigate đến những trang web khác */}
    //   <Col span={4}>
    //     <Menu>
    //       <Menu.Item>Canvas</Menu.Item>
    //       <Menu.Item>User</Menu.Item>
    //       <Menu.Item>Function</Menu.Item>
    //     </Menu>
    //   </Col>
    //   <Col span={20}>
    //     <CanvasPage />
    //   </Col>
    // </Row>
  );
};

export default App;
