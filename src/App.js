import { LoadingOutlined } from "@ant-design/icons";
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPrivateRoutes, PublicRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import { AppLayout } from "./features/Layout/Layout";
import { useLogout } from "./hooks/useLogout";
import NotFoundPage from "./pages/NotFoundPage";
import { theme } from "./theme/theme";

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
  );
};

export default App;
