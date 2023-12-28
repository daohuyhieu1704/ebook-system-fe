import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PATH, ROLE } from "../../constants/common";
import { AdminLayout } from "./AdminLayout.js";

const ignoreAppLayout = [PATH.LOGIN];
export const AppLayout = ({ children }) => {
  const location = useLocation();

  return ignoreAppLayout.includes(location.pathname) ? (
    <div style={{ height: "100vh" }}>{children}</div>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
};
