import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../constants/common";
import { selectUserInfo } from "../features/login/LoginSlice";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const logout = useLogout();
  useEffect(() => {
    if (userInfo && !userInfo?.username) {
      logout();
    }
    navigate(PATH.DRAW);
  }, []);
  return <></>;
};

export default HomePage;
