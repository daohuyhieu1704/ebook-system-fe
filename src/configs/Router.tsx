import React, { lazy } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { PATH, ROUTES } from "../constants/common";
import { selectIsLoggedIn, selectRole } from "../features/Login/LoginSlice";

const RequireAuth = ({
  permission,
  children,
}: {
  permission: number[] | undefined;
  children: JSX.Element;
}) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const role = useAppSelector(selectRole);
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} replace />;
  }
  return children;
};

export const PublicRoutes: any = ROUTES.PUBLIC.map((route) => {
  const Component = lazy(() => import(`../pages/${route.element}`));
  return <Route {...route} element={<Component />} key={route.element} />;
});

export const AdminPrivateRoutes: any = ROUTES.ADMIN_PRIVATE.map((route) => {
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
