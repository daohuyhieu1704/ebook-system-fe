import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import AppLayout from "./layout/AppLayout";
import { AdminPrivateRoutes, PublicRoutes } from "./configs/Router";
import { LoadingOutlined } from "@ant-design/icons";
import { PATH } from "./constants/common";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
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
              <LoadingOutlined style={{ fontSize: "4rem", color: "red" }} />
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
  );
}

export default App;
