import { LoadingOutlined } from "@ant-design/icons";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPrivateRoutes, PublicRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import { AppLayout } from "./features/layout/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import { theme } from "./theme/theme";

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
}

export default App;
