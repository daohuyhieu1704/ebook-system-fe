import React, { lazy } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { PATH, ROUTES } from "../constants/common";
import { selectIsLoggedIn, selectRole } from "../features/Login/LoginSlice";
import { useSelector } from "react-redux";

const RequireAuth = ({ permission, children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const role = useSelector(selectRole);
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

export const PublicRoutes = ROUTES.PUBLIC.map((route) => {
  const Component = lazy(() => import(`../pages/${route.element}`));
  return <Route {...route} element={<Component />} key={route.element} />;
});

export const AdminPrivateRoutes = ROUTES.ADMIN_PRIVATE.map((route) => {
  const Component = lazy(() => import(`../pages/${route.element}`));
  return (
    <Route
      {...route}
      element={
        <RequireAuth permission={route.permission}>
          <Component />
        </RequireAuth>
      }
      key={route.element}
    />
  );
});
