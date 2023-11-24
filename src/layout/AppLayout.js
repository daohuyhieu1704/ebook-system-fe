import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PATH } from "../constants/common";
import { useLogout } from "../hooks/useLogout";
import {
  selectIsLoggedOut,
  selectUserInfo,
  setIsLoggedOut,
} from "../features/login/LoginSlice";

import { PrivateLayout } from "./PrivateLayout";

import { useDispatch, useSelector } from "react-redux";

const ignoreAppLayout = [PATH.LOGIN];

export default function AppLayout({ children }) {
  const location = useLocation();
  const userInfo = useSelector(selectUserInfo);
  const logout = useLogout();
  const dispatch = useDispatch();
  const isLoggedOut = useSelector(selectIsLoggedOut);
  useEffect(() => {
    if (isLoggedOut) {
      dispatch(setIsLoggedOut(false));
    }
  }, [isLoggedOut]);

  // useEffect(() => {
  //   (async () => {
  //     DashboardAPI.getTotalSVCV(userInfo.accessToken)
  //       .then()
  //       .catch((err) => {
  //         console.log("err", err);
  //         if (err.status === 401) {
  //           logout();
  //         }
  //       });
  //   })();
  // }, []);
  return ignoreAppLayout.includes(location.pathname) ? (
    <div style={{ height: "100vh" }}>{children}</div>
  ) : (
    <PrivateLayout>{children}</PrivateLayout>
  );
}
