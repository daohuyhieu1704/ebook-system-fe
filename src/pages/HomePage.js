import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../constants/common";
import { selectUserInfo } from "../features/Login/LoginSlice";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";
const HomePage = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const logout = useLogout();
  useEffect(() => {
    switch (userInfo?.role) {
      case 0:
        navigate(PATH.FUNC);
        break;
      case 1:
        navigate(PATH.CANVAS);
        break;
      default:
        logout();
        break;
    }
  }, []);
  return <></>;
};

export default HomePage;
