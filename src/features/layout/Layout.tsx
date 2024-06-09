import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardAPI } from "../../api/DashboardAPI";
import { PATH } from "../../constants/common";
import { useLogout } from "../../hooks/useLogout";

import { AdminLayout } from "./AdminLayout";

const ignoreAppLayout = [PATH.LOGIN];
export const AppLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  return ignoreAppLayout.includes(location.pathname) ? (
    <div style={{ height: "100vh" }}>{children}</div>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
};
