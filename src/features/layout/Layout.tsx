import { useLocation } from "react-router-dom";
import { PATH } from "../../constants/common";

import { AdminLayout } from "./AdminLayout";

const ignoreAppLayout: string[] = [PATH.LOGIN];
export const AppLayout = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  return ignoreAppLayout.includes(location.pathname) ? (
    <div style={{ height: "100vh" }}>{children}</div>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
};
